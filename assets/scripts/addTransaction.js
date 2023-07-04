function hideAddTransaction() {
    const hideTransaction = document.getElementsByClassName('loadingAddTransaction');
    if (hideTransaction.length){
      hideTransaction[0].remove();
    }
}

function showAddTransaction() {  
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
        <h5 class="text-center">Nova transação</h5>
        <form>
          <div class="mb-2 d-flex justify-content-center pt-1">
            <label  class="form-label" for="income">Receita</label>
            <input type="radio" name="type" class="ms-2 mb-1" id="income">
            <label  class="form-label ps-4" for="expense" >Despesa</label>
            <input type="radio" name="type" class="ms-2 mb-1" id="expense" checked>
          </div>
          <div class="mb-2">
            <label for="date" class="form-label">Data da transação</label>
            <input type="date" class="form-control" id="date">
          </div>
          <div class="mb-2">
            <label for="value" class="form-label">Valor</label>
            <input type="number" class="form-control" id="value">
          </div>
          <div class="mb-2">
            <label for="typeTransactions" class="form-label">Tipo da transação</label>
            <select name="typeTransactions" class="form-control">
              <option value="">-- Selecione o tipo de transação--</option>
              <option value="">Alimentação</option>
              <option value="">Despesas pessoais</option>
              <option value="">Gastos com casa</option>
              <option value="">Diversão</option>
              <option value="">Entreterimento</option>
              <option value="">Salario</option>
              <option value="">Renda variavel</option>
              <option value="">Renda extra</option>
              <option value="">Outros</option>
            </select>
          </div>
          <div class="mb-4 ">
            <label for="description" class="form-label">Descrição da transação</label>
            <input type="text" class="form-control" id="description">
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success">Adicionar</button>
            <button type="button" class="btn btn-danger ms-3" onclick="hideAddTransaction();">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
  
    divMain.appendChild(screenAddTransaction);

    }
  
  
