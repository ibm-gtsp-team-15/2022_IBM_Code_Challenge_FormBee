const db = require("../services/firestore_db");
const firebase = require("firebase-admin");
const { jsPDF } = require("jspdf");

const getInventory = async (req, res) => {
	const templateDocs = await db.firestore
		.collection("form-templates")
		.listDocuments();
	const templates = [];

	for (const doc of templateDocs) {
		const data = (await doc.get()).data();
		data["templateId"] = doc.id;
		templates.push(data);
	}

	res.send(templates);
};

const postAddForm = async (req, res) => {
	const usersRef = db.firestore.collection("users").doc(req.body.email);

	console.log(req.body.form.name);
	for (let slot of req.body.form.slots) {
		console.log(slot);
	}
	const docSnapshot = await usersRef.get();

	if (docSnapshot.exists) {
		usersRef.update({
			forms: firebase.firestore.FieldValue.arrayUnion(req.body.form),
		});
	} else {
		usersRef.set({
			forms: [req.body.form],
		});
	}

	genPdf(req.body.form);
};

const genPdf = async (selectedForm) => {
	const doc = new jsPDF();

	doc.text(selectedForm.name, 10, 10);
	let px = 10,
		py = 25;
	for (let slot of selectedForm.slots) {
		doc.text(`${slot.name}: `, px, py);
		doc.text(slot.value, px + slot.name.length * 4, py);
		py += 10;
	}

	doc.save("a4.pdf");
};

const getGeneratePdf = async (req, res) => {
	const usersRef = db.firestore.collection("users").doc(req.body.email);
	const docSnapshot = await usersRef.get();

	if (docSnapshot.exists) {
		const formsDoc = docSnapshot.data();
		selectedForms = formsDoc.forms.filter((form) => {
			return form.templateId == req.body.templateId;
		});

		selectedForm = selectedForms[0];
		genPdf(selectedForm);
	}
};

module.exports = {
	getInventory: getInventory,
	postAddForm: postAddForm,
	getGeneratePdf: getGeneratePdf,
};
