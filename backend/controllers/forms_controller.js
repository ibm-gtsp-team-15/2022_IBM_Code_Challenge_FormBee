const db = require("../services/firestore_db");
const firebase = require("firebase-admin");

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
};

module.exports = {
	getInventory: getInventory,
	postAddForm: postAddForm,
};
