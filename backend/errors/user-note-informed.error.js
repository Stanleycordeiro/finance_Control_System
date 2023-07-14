export class UserNotInformedError extends Error {
    constructor() {
        super("Usuario não informado");
        this.name = "user-not-informed";
        this.code = 500;
    }
}