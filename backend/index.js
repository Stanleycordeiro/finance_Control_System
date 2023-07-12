import express, { response } from "express";
import admin from "firebase-admin";
import { authenticateToken } from "./middlewares/authenticate-jwt.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAcountKey.json"),
});

app.get("/transactions", authenticateToken, (request, response) => {
  console.log("Chamando Api");

  admin
    .firestore()
    .collection("transactions")
    .where("user.uid", "==", request.user.uid)
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      response.json(transactions);
    });
});

app.listen(3000, () => console.log("API iniciada no localhost:3000"));
