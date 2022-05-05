from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, FollowupAction

import requests
import json

class MyFormSlot:

    def __init__(self, name: str, type: str, regex: str, value) -> None:
        self.name = name
        self.type = type
        self.regex = regex
        self.value = value

    @staticmethod
    def fromMap(obj) -> 'MyFormSlot':
        return MyFormSlot(
            obj.get('name'),
            obj.get('type'),
            obj.get('regex'),
            obj.get('value')
        )


    @staticmethod
    def toMap(myFormSlot: 'MyFormSlot') -> Dict[Text, Any]:
        fsMap = {}
        fsMap['name'] = myFormSlot.name
        fsMap['type'] = myFormSlot.type
        fsMap['regex'] = myFormSlot.regex
        fsMap['value'] = myFormSlot.value
        return fsMap


class MyForm:

    def __init__(self, templateId: str, name: str, slots: List[MyFormSlot]) -> None:
        self.templateId = templateId
        self.name = name
        self.slots = slots
        self.currentSlotIndex = 0

    @staticmethod
    def fromTemplateMap(obj) -> 'MyForm':
        print(obj)
        return MyForm(
            obj.get('templateId'),
            obj.get('name'),
            [MyFormSlot.fromMap(slot) for slot in obj.get('slots')]
        )

    @staticmethod
    def toMap(myForm: 'MyForm') -> Dict[Text, Any]:
        fMap = {}
        fMap['templateId'] = myForm.templateId
        fMap['name'] = myForm.name
        fMap['slots'] = [MyFormSlot.toMap(slot) for slot in myForm.slots]
        return fMap

    @staticmethod
    def fromBotSlot(dc) -> 'MyForm':
        form = MyForm.fromTemplateMap(dc)
        form.currentSlotIndex = dc.get('currentSlotIndex')
        return form

    def getCurrentSlot(self) -> MyFormSlot:
        return self.slots[self.currentSlotIndex]

    def answer(self, value):
        self.slots[self.currentSlotIndex].value = value
        self.currentSlotIndex += 1

    def isFilled(self):
        return self.currentSlotIndex == len(self.slots)

    def save(self, email):
        response = requests.post(
            'http://localhost:3000/forms/add-form',
            json = {
                'email': email,
                'form': MyForm.toMap(self)
            }
        )

        return response.ok
