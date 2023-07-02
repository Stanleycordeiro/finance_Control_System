//elementos
const form = {
  email: () => document.getElementById("inputEmail"),
  password: () => document.getElementById("inputPassword"),
  confirmPassworrd: () => document.getElementById("inputConfirmPassword"),
  btnRegister: () => document.getElementById("btnRegister"),
  //mensagens de erro
  messageErrorRequireEmail: () => document.getElementById("errorEmailRequire"),
  messageErrorInvalidEmail: () => document.getElementById("errorEmailInvalid"),
  messageErrorRequirePassword: () =>
    document.getElementById("errorPasswordRequire"),
  messageErrorInvalidPassword: () =>
    document.getElementById("errorPasswordInvalid"),
  messageErrorConfirmPassword: () =>
    document.getElementById("errorConfirmPassword"),
};

//validação ao digitar
form.email().addEventListener("input", onChangeEmail);
form.password().addEventListener("input", onChangePassword);
form.confirmPassworrd().addEventListener("input", onChangeConfirmPassword);

//função validação input email chamando error message
function onChangeEmail() {
  let email = form.email().value;
  form.messageErrorRequireEmail().style.display = email ? "none" : "block";
  form.messageErrorInvalidEmail().style.display = validateEmail(email)
    ? "none"
    : "block";
  toogleBtnRegister();
}

function loginPg() {
    window.location.href = "../../index.html";
  }
  

//função validação input password chamando error message
function onChangePassword() {
  let password = form.password().value;
  form.messageErrorRequirePassword().style.display = password
    ? "none"
    : "block";
  form.messageErrorInvalidPassword().style.display =
    password.length >= 6 ? "none" : "block";
  validatePasswordMatch();
  toogleBtnRegister();
}

//função validação input confirm password chamando error message
function onChangeConfirmPassword() {
  validatePasswordMatch();
  toogleBtnRegister();
}

//função de validação de senha iguais
function validatePasswordMatch() {
  let confirmPassworrd = form.confirmPassworrd().value;
  let password = form.password().value;
  form.messageErrorConfirmPassword().style.display =
    confirmPassworrd == password ? "none" : "block";
}

//função para validar e habilitar e desabilitar o button registraar
function toogleBtnRegister() {
  form.btnRegister().disabled = !isFormValid();
}

//função de validação do formulario
function isFormValid() {
  let email = form.email().value;
  if (!email || !validateEmail(email)) {
    return false;
  }
  let password = form.password().value;
  if (!password || password.length < 6) {
    return false;
  }

  let confirmPassworrd = form.confirmPassworrd().value;
  if (password != confirmPassworrd) {
    return false;
  }
  return true;
}

//função para registrar novo usuario ao clicar no button
function registerFn() {
  showLoading();

  let email = form.email().value;
  let password = form.password().value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html";
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    switch (error.code) {
        case "auth/email-already-in-use":
          return "O email já está em uso. Por favor, tente outro email.";
          break;
        case "auth/invalid-email":
          return "O email inserido é inválido. Por favor, insira um email válido.";
          break;
        case "auth/weak-password":
          return "A senha deve ter pelo menos 6 caracteres.";
          break;
        default:
          return "Ocorreu um erro ao criar o usuário. Por favor, tente novamente.";
          break;
      }
    
  return error.code;
}

//quando atulaizar a pagina btn login desativado
window.addEventListener("load", function () {
  form.btnRegister().disabled = true;
});
