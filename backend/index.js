import express from "express";
import admin from "firebase-admin";
import { transactionsRouter } from "./transactions/routes.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAcountKey.json"),
});

app.use("/transactions", transactionsRouter);

app.listen(3000, () => console.log("API iniciada no localhost:3000"));
