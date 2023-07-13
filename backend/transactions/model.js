import admin from "firebase-admin";

export class Transactions {
  findByUser() {
    if (!this.user?.uid) {
      return Promise.reject({
        code: 500,
        message: "Usuário não encontrado",
      });
    }

    return admin
      .firestore()
      .collection("transactions")
      .where("user.uid", "==", this.user.uid)
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
      });
  }
}
