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
  transactionService
    .logout()
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
  transactionService.getContentUser();
});

function findTransations(user) {
  showLoading();
  transactionService
    .findByUser(user)
    .then((transactions) => {
      hideLoading();
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
    const li = createTransactionListItem(transaction);
    const div = createDivTransactionListItem(transaction);
    const b = createBTransactionListItem(transaction);
    const pValue = createPValueTransactionListItem(transaction);
    const pTransactionType = createPTransactionTypeListItem(transaction);
    const pDescription = createPDescriptionListItem(transaction);
    const buttonRemove = createButtonRemoveListItem(transaction);

    orderedList.appendChild(li);
    li.appendChild(div);
    div.appendChild(b);
    div.appendChild(pValue);
    div.appendChild(pTransactionType);
    if (transaction.description) {
      div.appendChild(pDescription);
    }
    div.appendChild(buttonRemove);
  });
};

//elementos tela ListItens
function createTransactionListItem(transaction) {
  const li = document.createElement("li");
  li.addEventListener("click", () => {
    showAddTransactionModify(transaction.uid, transaction);
    getTransactionUid(transaction.uid);
  });
  li.id = transaction.uid;
  return li;
}
function createDivTransactionListItem(transaction) {
  const div = document.createElement("div");
  div.setAttribute("id", "divLi");
  div.classList.add(
    "card",
    "list-group-item",
    "shadow-sm",
    "expense",
    "d-flex",
    "justify-content-between"
  );
  div.classList.add(transaction.type);
  return div;
}
function createBTransactionListItem(transaction) {
  const b = document.createElement("b");
  b.innerHTML = formatDate(transaction.date);
  return b;
}
function createPValueTransactionListItem(transaction) {
  const pValue = document.createElement("p");
  pValue.innerHTML = formatMoney(transaction.money);
  return pValue;
}
function createPTransactionTypeListItem(transaction) {
  const pTransactionType = document.createElement("p");
  pTransactionType.innerHTML = transaction.transactionType;
  return pTransactionType;
}
function createPDescriptionListItem(transaction) {
  const pDescription = document.createElement("p");
  pDescription.innerHTML = transaction.description;
  return pDescription;
}
function createButtonRemoveListItem(transaction) {
  const buttonRemove = document.createElement("button");
  buttonRemove.addEventListener("click", (event) => {
    event.stopPropagation();
    buttonRemoveTransaction(transaction);
  });
  buttonRemove.classList.add("btn", "btn-danger", "ms-auto");
  buttonRemove.setAttribute("id", "buttonRemoveTransaction");
  buttonRemove.innerHTML = "Remover";
  return buttonRemove;
}

//função para remover transação
function buttonRemoveTransaction(transaction) {
  showLoading();
  transactionService
    .remove(transaction)
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

  transactionService
    .getTransaction(uid)
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
  modifyForm.typeTransactions().value = transaction.transactionType;
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
