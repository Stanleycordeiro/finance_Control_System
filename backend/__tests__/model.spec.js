import { Transaction } from "../transactions/model";
import { UserNotInformedError } from "../errors/user-note-informed.error.js";

describe("transaction model", () => {

    const transactionRepositoryMock = {
        findByUserUid: () => Promise.resolve([
            {uid: "transactions1"}, {uid: "transactions2"}
        ])
    }

  test(
    "find user by uid, when not user Uid, then error 500",
   async () => {
        const model = new Transaction();
        const response = model.findByUser();

        await expect(response).rejects.toBeInstanceOf(UserNotInformedError); 
    }
  )
  test("when user uid is not informed, then return error 500", async () => {
    const model = new Transaction();
    model.user = {};

    const response = model.findByUser();

    await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
})

  test(
    "find user by uid, when not user Uid, then return transactions",
   async () => {
        const model = new Transaction(transactionRepositoryMock);
        model.user = {uid: "anyUserUid"};

        const response = model.findByUser();

        await expect(response).resolves.toEqual([
            {uid: "transactions1"}, {uid: "transactions2"}
        ]); 
    }
  );
});
