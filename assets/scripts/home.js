// ELEMENTOS HOME
form = {
  mainScreen: () => document.getElementById("main"),
  homeScreen: () => document.getElementById("mainHome"),
  enterAndBackScreen: () =>
    document.getElementById("mainHomeEnterAndBackMoney"),
};

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
  form.homeScreen().style.display = "block";
  form.enterAndBackScreen().style.display = "none";
}
monitorScreenInit();

//chamada ao banco
findTransations();

function findTransations() {
  setTimeout(() => {
    addTransactionsScreen(fakeTransactions);
  }, 1000);
}

//Printar elemento na tela vindo do banco
function addTransactionsScreen(transactions) {
  const orderedList = document.getElementById('transactions');

  transactions.forEach(transactions => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const b = document.createElement('b');
    const pValue = document.createElement('p');
    const pTransctionType = document.createElement('p');

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
  });
}

//função para formatação dos campos do li
function formatDate (date) {
  return new Date(date).toLocaleDateString('pt-br');
}
function formatMoney (money) {
  return `${"R$ "} ${money.toFixed(2)}`;
}

//banco fake
const fakeTransactions = [
  {
    type: "expense",
    date: "2023-07-02",
    money: 20,
    transctionType: "Supermercado",
  },
  {
    type: "income",
    date: "2023-06-22",
    money: 1200,
    transctionType: "Salario",
  },
  {
    type: "expense",
    date: "2023-06-20",
    money: 200,
    transctionType: "mecanica",
  },
  {
    type: "income",
    date: "2023-06-15",
    money: 300,
    transctionType: "Remuneração variavel",
  },
  {
    type: "income",
    date: "2023-06-02",
    money: 210,
    transctionType: "Remuneração variavel",
  },
];
