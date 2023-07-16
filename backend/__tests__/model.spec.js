import { Transaction } from "../transactions/model";
import { UserNotInformedError } from "../errors/user-note-informed.error.js";
import { TransactionUidNotInformedError } from "../errors/transaction-uid-not-informed.error.js";
import { TransactionNotFoundError } from "../errors/transaction-not-not-found.error.js";
import { UserDoenstOwnTransaction } from "../errors/user-doenst-own-transaction.error.js";

describe("transaction model", () => {
  const transactionRepositoryMock = {
    findByUserUid: () =>
      Promise.resolve([{ uid: "transactions1" }, { uid: "transactions2" }]),
  };

  test("find user by uid, when not user Uid, then error 500", async () => {
    const model = new Transaction();
    const response = model.findByUser();

    await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
  });
  test("when user uid is not informed, then return error 500", async () => {
    const model = new Transaction();
    model.user = {};

    const response = model.findByUser();

    await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
  });

  test("find user by uid, when not user Uid, then return transactions", async () => {
    const model = new Transaction(transactionRepositoryMock);
    model.user = { uid: "anyUserUid" };

    const response = model.findByUser();

    await expect(response).resolves.toEqual([
      { uid: "transactions1" },
      { uid: "transactions2" },
    ]);
  });

  describe("Given find transaction by uid", () => {
    test("then return transaction", async () => {
      const model = new Transaction({
        findByUid: () => Promise.resolve(createTransaction()),
      });
      model.uid = 1;
      model.user = { uid: "anyUserUid" };

      await model.findByUid();

      expect(model).toEqual(createTransaction());
    });

    test("When user doenst own transaction, then return 403 error", async () => {
      const transactionDb = createTransaction();
      transactionDb.user = { uid: "anyOtherUserUid" };

      const model = new Transaction({
        findByUid: () => Promise.resolve(transactionDb),
      });
      model.uid = 9;
      model.user = { uid: "anyUserUid" };

      await expect(model.findByUid()).rejects.toBeInstanceOf(
        UserDoenstOwnTransaction
      );
    });

    test("When uid not present, then return error 500", async () => {
      const model = new Transaction();

      await expect(model.findByUid()).rejects.toBeInstanceOf(
        TransactionUidNotInformedError
      );
    });

    test("when transaction not found, the return error 404", async () => {
      const model = new Transaction({
        findByUid: () => Promise.resolve(null),
      });
      model.uid = 9;

      await expect(model.findByUid()).rejects.toBeInstanceOf(
        TransactionNotFoundError
      );
    });

    function createTransaction() {
      const transaction = new Transaction();
      transaction.uid = 1;
      transaction.date = "anyDate";
      transaction.transactionType = "Renda extra";
      transaction.money = 10;
      transaction.description = "anyDescription";
      transaction.type = "income";
      transaction.user = {
        uid: "anyUserUid",
      };
      return transaction;
    }
  });
});
