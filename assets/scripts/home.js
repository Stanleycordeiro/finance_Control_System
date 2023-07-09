// ELEMENTOS HOME
form = {
  mainScreen: () => document.getElementById("main"),
  homeScreen: () => document.getElementById("mainHome"),
  enterAndBackScreen: () =>
    document.getElementById("mainHomeEnterAndBackMoney"),
};

//Função para deslogar
function logout() {
  showLoading();
  firebase
    .auth()
    .signOut()
    .then(() => {
      hideLoading();
      window.location.href = "../../index.html";
    })
    .catch(() => {
      alert("Erro ao fazer logout");
    });
}

// FUNÇÕES TROCAR TELA
function toggleScreenHome() {
  form.homeScreen().style.display = "block";
  form.enterAndBackScreen().style.display = "none";
}

function toggleScreenCash() {
  form.homeScreen().style.display = "none";
  form.enterAndBackScreen().style.display = "block";
}

function monitorScreenInit() {
  form.homeScreen().style.display = "none";
  form.enterAndBackScreen().style.display = "block";
}
monitorScreenInit();

//verificando id user para trazer o conteudo do DB
document.addEventListener("DOMContentLoaded", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      findTransations(user);
    }
  });
});

function findTransations(user) {
  showLoading();
  firebase
    .firestore()
    .collection("transactions")
    .where("user.uid", "==", user.uid)
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      hideLoading();
      const transactions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      addTransactionsScreen(transactions);
    })
    .catch((error) => {
      hideLoading();
      console.log(error);
      alert("Erro ao recuperar transações, tente novamente");
    });
}

//Printar elemento na tela vindo do banco
function addTransactionsScreen(transactions) {
  const orderedList = document.getElementById("transactions");

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const b = document.createElement("b");
    const pValue = document.createElement("p");
    const pTransactionType = document.createElement("p");
    const pDescription = document.createElement("p");
    const buttonRemove = document.createElement("button");

    li.addEventListener("click", () => {
      showAddTransactionModify(transaction.uid, transaction);
      getTransactionUid(transaction.uid);
    });

    buttonRemove.addEventListener("click", (event) => {
      event.stopPropagation();

      buttonRemoveTransaction(transaction);
    });

    div.setAttribute("id", "divLi");
    div.classList.add(
      "card",
      "list-group-item",
      "shadow-sm",
      "expense",
      "d-flex",
      "justify-content-between"
    );
    li.id = transaction.uid;
    buttonRemove.classList.add("btn", "btn-danger", "ms-auto");
    buttonRemove.setAttribute("id", "buttonRemoveTransaction");
    buttonRemove.innerHTML = "Remover";
    div.classList.add(transaction.type);
    b.innerHTML = formatDate(transaction.date);
    pValue.innerHTML = formatMoney(transaction.money);
    pTransactionType.innerHTML = transaction.transctionType;

    orderedList.appendChild(li);
    li.appendChild(div);
    div.appendChild(b);
    div.appendChild(pValue);
    div.appendChild(pTransactionType);
    if (transaction.description) {
      pDescription.innerHTML = transaction.description;
      div.appendChild(pDescription);
    }
    div.appendChild(buttonRemove);
  });
}

//função para remover transação
function buttonRemoveTransaction(transaction) {
  showLoading();
  firebase
    .firestore()
    .collection("transactions")
    .doc(transaction.uid)
    .delete()
    .then(() => {
      hideLoading();
      document.getElementById(transaction.uid).remove();
    })
    .catch((error) => {
      hideLoading();
      console.log(error);
      alert("Erro ao excluir transação");
    });
}

//função para formatação dos campos do li
function formatDate(date) {
  const formattedDate = new Date(date);
  formattedDate.setDate(formattedDate.getDate() + 1);
  return formattedDate.toLocaleDateString("pt-br");
}
function formatMoney(money) {
  return `${"R$ "} ${money.toFixed(2)}`;
}

//resgatando transação clicada
function getTransactionUid(uid) {
  showLoading();

  firebase
    .firestore()
    .collection("transactions")
    .doc(uid)
    .get()
    .then((doc) => {
      hideLoading();
      fillTransactionScreen(doc.data());
    })
    .catch(() => {
      hideLoading();
      alert("Erro ao carregar sua transação, tente novamente");
    });
  return uid;
}

let uid;

function fillTransactionScreen(transaction) {
  modifyForm = {
    typeExpense: () => document.getElementById("expense"),
    typeIncome: () => document.getElementById("income"),
    date: () => document.getElementById("dateInput"),
    value: () => document.getElementById("value"),
    typeTransactions: () => document.getElementById("typeTransactions"),
    descriptionTransaction: () => document.getElementById("description"),
    saveButton: () => document.getElementById("saveButton"),
  };

  modifyForm.typeExpense().checked = transaction.type === "expense";
  modifyForm.typeIncome().checked = transaction.type === "income";
  modifyForm.date().value = transaction.date;
  modifyForm.value().value = transaction.money;
  modifyForm.typeTransactions().value = transaction.transctionType;
  modifyForm.descriptionTransaction().value = transaction.description;
}
// //banco fake
// const fakeTransactions = [
//   {
//     type: "expense",
//     date: "2023-07-02",
//     money: 20,
//     transctionType: "Supermercado",
//   },
//   {
//     type: "income",
//     date: "2023-06-22",
//     money: 1200,
//     transctionType: "Salario",
//     description: "Salario trabalho principal",
//   },
//   {
//     type: "expense",
//     date: "2023-06-20",
//     money: 200,
//     transctionType: "mecanica",
//   },
//   {
//     type: "income",
//     date: "2023-06-15",
//     money: 300,
//     transctionType: "Remuneração variavel",
//   },
//   {
//     type: "income",
//     date: "2023-06-02",
//     money: 210,
//     transctionType: "Remuneração variavel",
//   },
// ];
