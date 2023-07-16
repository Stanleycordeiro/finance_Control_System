export class UserDoenstOwnTransaction extends Error {
  constructor() {
    super("Usuário não autorizado");
    this.name = "user-doenst-own-transaction";
    this.code = 403;
  }
}
