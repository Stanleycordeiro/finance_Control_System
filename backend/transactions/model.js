import { UserNotInformedError } from "../errors/user-note-informed.error.js";
import { TransactionRepository } from "./repository.js";

export class Transaction {

  date;
  transctionType;
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

  
}
