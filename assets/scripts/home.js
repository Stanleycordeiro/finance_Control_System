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

//chamada ao banco
findTransations();

//Printar elemento na tela vindo do banco
function addTransactionsScreen(transactions) {
  const orderedList = document.getElementById("transactions");

  transactions.forEach((transactions) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const b = document.createElement("b");
    const pValue = document.createElement("p");
    const pTransctionType = document.createElement("p");
    const pDescription = document.createElement("p");

    li.addEventListener("click", () => {
      showLoading();
      showAddTransaction();
      getTransactionUid();
    });

    //resgatando transação clicada
    function getTransactionUid() {
      var uid = transactions.uid;

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
    }

    function fillTransactionScreen(transactions) {
      form = {
        typeExpense: () => document.getElementById("expense"),
        typeIncome: () => document.getElementById("income"),
        date: () => document.getElementById("dateInput"),
        value: () => document.getElementById("value"),
        typeTransactions: () => document.getElementById("typeTransactions"),
        descriptionTransaction: () => document.getElementById("description"),
        saveButton: () => document.getElementById("saveButton"),
      };

      if (transactions.type == "expense") {
        form.typeExpense().checked = true;
      } else {
        form.typeIncome().checked = true;
      }

      form.date().value = transactions.date;
      form.value().value = transactions.money;
      form.typeTransactions().value = transactions.transctionType;

      if (transactions.description) {
        form.descriptionTransaction().value = transactions.description;
      }
    }

    div.setAttribute("id", "divLi");
    div.classList.add("card", "list-group-item", "shadow-sm", "expense");
    div.classList.add(transactions.type);
    b.innerHTML = formatDate(transactions.date);
    pValue.innerHTML = formatMoney(transactions.money);
    pTransctionType.innerHTML = transactions.transctionType;

    orderedList.appendChild(li);
    li.appendChild(div);
    div.appendChild(b);
    div.appendChild(pValue);
    div.appendChild(pTransctionType);
    if (transactions.description) {
      pDescription.innerHTML = transactions.description;
      div.appendChild(pDescription);
    }
  });
}

//função para formatação dos campos do li
function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-br");
}
function formatMoney(money) {
  return `${"R$ "} ${money.toFixed(2)}`;
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
