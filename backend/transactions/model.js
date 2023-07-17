import { TransactionNotFoundError } from "../errors/transaction-not-not-found.error.js";
import { TransactionUidNotInformedError } from "../errors/transaction-uid-not-informed.error.js";

import { UserNotInformedError } from "../errors/user-note-informed.error.js";
import { TransactionRepository } from "./repository.js";
import { UserDoenstOwnTransaction } from "../errors/user-doenst-own-transaction.error.js";

export class Transaction {
  date;
  transactionType;
  money;
  description;
  type;
  user;

  #repository;

  constructor(transactionRepository) {
    this.#repository = transactionRepository || new TransactionRepository();
  }

  findByUser() {
    if (!this.user?.uid) {
      return Promise.reject(new UserNotInformedError());
    }
    return this.#repository.findByUserUid(this.user.uid);
  }

  findByUid() {
    if (!this.uid) {
      return Promise.reject(new TransactionUidNotInformedError());
    }
    return this.#repository.findByUid(this.uid).then((transactionDb) => {
      if (!transactionDb) {
        return Promise.reject(new TransactionNotFoundError());
      }
      if (this.user.uid != transactionDb.user.uid) {
        return Promise.reject(new UserDoenstOwnTransaction());
      }
      this.date = transactionDb.date;
      this.description = transactionDb.description;
      this.transactionType = transactionDb.transactionType;
      this.money = transactionDb.money;
      this.type = transactionDb.type;
      this.user = transactionDb.user;
    });
  }

  create(params){
    this.date = params.date;
      this.description = params.description;
      this.transactionType = params.transactionType;
      this.money = params.money;
      this.type = params.type;
      this.user = params.user;

      return this.#repository.save(this).then(response => {
        this.uid = response.uid;

      })
      
  }

}
