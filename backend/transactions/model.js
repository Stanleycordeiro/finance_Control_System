import { TransactionRepository } from "./repository.js";

export class Transactions {
  #repository;

  constructor() {
    this.#repository = new TransactionRepository();
  }

  findByUser() {
    if (!this.user?.uid) {
      return Promise.reject({
        code: 500,
        message: "Usuário não encontrado",
      });
    }
    return this.#repository.findByUserUid(this.user.uid);
  }
}
