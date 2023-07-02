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