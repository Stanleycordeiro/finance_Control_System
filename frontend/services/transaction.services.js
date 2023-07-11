const transactionService = {
  findByUser: (user) => {
    return firebase
      .firestore()
      .collection("transactions")
      .where("user.uid", "==", user.uid)
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
      });
  },

  remove: (transaction) => {
    return firebase
      .firestore()
      .collection("transactions")
      .doc(transaction.uid)
      .delete();
  },

  getTransaction: (uid) => {
    return firebase.firestore().collection("transactions").doc(uid).get();
  },

  getContentUser: () => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        findTransations(user);
      }
    });
  },

  logout: () => {
    return firebase.auth().signOut();
  },

  saveTransaction: (transactions) => {
    return firebase.firestore().collection("transactions").add(transactions);
  },

  saveTransactionModify: (transaction, currentUid) => {
    return firebase
    .firestore()
    .collection("transactions")
    .doc(currentUid)
    .update(transaction)
  }
};
