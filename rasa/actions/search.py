from bs4 import BeautifulSoup
import requests
import re

headers = {
     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'
}
def search(searchstring):
    try:
        page = requests.get(searchstring, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        result = soup.find("div", class_='LGOjhe').get_text()
        return '\n'.join(re.sub('[:$&^/}{+_#@!)(~]+', '', result).strip().capitalize().split('.')[:2])
    except:
        page = requests.get(searchstring, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        result = soup.find("div", class_='kno-rdesc').get_text()
        return '.\n'.join(re.sub('[:$&^/}{+_#@!)(~]+', '',result.replace('Description','')).strip().capitalize().split('.')[:2])

def Googlesearch(searchstring):
    try:
        return search(f"https://www.google.co.in/search?q=what is {searchstring}")
    except:
        try:
            return search(f"https://www.google.co.in/search?q={searchstring}")
        except:
            return "Sorry i don't know the information'"

