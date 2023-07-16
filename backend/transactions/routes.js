import express, { request, response } from "express";
import admin from "firebase-admin";
import { TransactionController } from "./controller.js";
import { authenticateToken } from "../middlewares/authenticate-jwt.js";

const app = express();

const transactionController = new TransactionController();

app.get(
  "/",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  (request, response) => transactionController.findByUser(request, response)
);

app.get(
  "/:uid",
  (request, response, next) =>
    authenticateToken(request, response, next, admin.auth()),
  (request, response) => transactionController.findByUid(request, response)
);

export const transactionsRouter = app;
