function hideAddTransactionModify() {
  const hideTransaction = document.getElementsByClassName(
    "loadingAddTransaction"
  );
  if (hideTransaction.length) {
    hideTransaction[0].remove();
    window.location.reload();
  }
}

let currentTransaction = null;
let currentUid = null;

function showAddTransactionModify(uid, transaction) {
  currentTransaction = transaction;
  currentUid = uid;
  let divMain = document.getElementById("main");
  let screenAddTransaction = document.createElement("div");
  screenAddTransaction.classList.add(
    "loadingAddTransaction",
    "justify-content-center",
    "d-flex"
  );

  screenAddTransaction.innerHTML = ` <div class="card shadow" id="addTransaction">
    <div class="card-body">
      <div class="">
        <h5 class="text-center">Editar transação</h5>
        <form>
          <div class="mb-2 d-flex justify-content-center pt-1">
            <label  class="form-label" for="income">Receita</label>
            <input type="radio" name="type" class="ms-2 mb-1" id="income">
            <label  class="form-label ps-4" for="expense" >Despesa</label>
            <input type="radio" name="type" class="ms-2 mb-1" id="expense" checked>
          </div>
          <div class="mb-2">
            <label  class="form-label">Data da transação *</label>
            <input type="date" class="form-control" id="dateInput" >
          </div>
          <div
                  class="alert alert-danger mt-3 text-center p-1"
                  id="errorDateRequire"
                  role="alert"
                >
                  Data origatória/invalida
                </div>
               
          <div class="mb-2">
            <label class="form-label">Valor *</label>
            <input type="number" class="form-control" id="value">
          </div>
          <div
                  class="alert alert-danger mt-3 text-center p-1"
                  id="errorValueRequire"
                  role="alert"
                >
                  Valor obrigatório
                </div>
                <div
                  class="alert alert-danger mt-3 text-center p-1"
                  id="errorValueNegative"
                  role="alert"
                >
                  Valor não pode ser negativo
                </div>
          <div class="mb-2">
            <label class="form-label">Tipo da transação *</label>
            <select id="typeTransactions" class="form-control">
              <option value="">-- Selecione o tipo de transação--</option>
              <option>Alimentação</option>
              <option>Despesas pessoais</option>
              <option>Gastos com casa</option>
              <option>Diversão</option>
              <option>Entreterimento</option>
              <option>Salario</option>
              <option>Renda variavel</option>
              <option>Renda extra</option>
              <option>Outros</option>
            </select>
          </div>
          <div
                  class="alert alert-danger mt-3 text-center p-1"
                  id="errorTransactionTypeRequire"
                  role="alert"
                >
                  Tipo de transação é obrigatória
                </div>
          <div class="mb-4 ">
            <label  class="form-label">Descrição da transação</label>
            <input type="text" class="form-control" id="description">
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success" id="saveButton"  disabled>Salvar</button>
            <button type="button" class="btn btn-danger ms-3" onclick="hideAddTransactionModify();">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  divMain.appendChild(screenAddTransaction);
  //resgatrando Elementos
  const form = {
    saveButton: () => document.getElementById("saveButton"),
    typeExpense: () => document.getElementById("expense"),
    typeIncome: () => document.getElementById("income"),

    date: () => document.getElementById("dateInput"),
    errorDateRequired: () => document.getElementById("errorDateRequire"),
    errorDateValid: () => document.getElementById("errorDateInvalid"),

    value: () => document.getElementById("value"),
    errorValueRequired: () => document.getElementById("errorValueRequire"),
    errorValueNegative: () => document.getElementById("errorValueNegative"),

    typeTransactions: () => document.getElementById("typeTransactions"),
    errorTransactionTypeRequire: () =>
      document.getElementById("errorTransactionTypeRequire"),

    descriptionTransaction: () => document.getElementById("description"),
  };

  //verificação do campo date
  form.errorDateRequired().style.display = "none";
  form.date().addEventListener("input", onChangeDate);
  function onChangeDate() {
    var date = form.date().value;
    form.errorDateRequired().style.display = !date ? "block" : "none";
    onChangeButtonSave();
  }

  //verificação do campo value
  form.errorValueRequired().style.display = "none";
  form.errorValueNegative().style.display = "none";
  form.value().addEventListener("input", onChangeValue);
  function onChangeValue() {
    var value = form.value().value;
    form.errorValueRequired().style.display = !value ? "block" : "none";
    form.errorValueNegative().style.display = value <= 0 ? "block" : "none";
    onChangeButtonSave();
  }

  //verificação do TIPO DE TRANSAçÂO
  form.errorTransactionTypeRequire().style.display = "none";
  form.typeTransactions().addEventListener("input", onChangeType);
  function onChangeType() {
    var typeTransactions = form.typeTransactions().value;
    form.errorTransactionTypeRequire().style.display = !typeTransactions
      ? "block"
      : "none";
    onChangeButtonSave();
  }

  function onChangeButtonSave() {
    form.saveButton().disabled = !isFormValid();
  }

  function isFormValid() {
    var date = form.date().value;
    if (!date) {
      return false;
    }

    var value = form.value().value;
    if (!value || value <= 0) {
      return false;
    }

    var transctionType = form.typeTransactions().value;
    if (!transctionType) {
      return false;
    }

    return true;
  }

  function createTransaction() {
    return {
      type: form.typeExpense().checked ? "expense" : "income",
      date: form.date().value,
      money: parseFloat(form.value().value),
      transactionType: form.typeTransactions().value,
      description: form.descriptionTransaction().value,
      user: {
        uid: firebase.auth().currentUser.uid,
      },
    };
  }

  //salvando informações no banco
  form.saveButton().addEventListener("click", saveTransaction);
  function saveTransaction() {
    if (currentTransaction && currentUid) {
      var transaction = createTransaction();
      firebase
        .firestore()
        .collection("transactions")
        .doc(currentUid) 
        .update(transaction)
        .then(() => {
          hideLoading();
          hideAddTransactionModify();
          window.location.reload();
        })
        .catch(() => {
          hideLoading();
          alert("Erro ao atualizar a transação, tente novamente.");
        });
    } else {
      alert("Transação não encontrada");
    }
  }
}
