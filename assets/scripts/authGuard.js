firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      showLoading();
      window.location.href = "../../index.html";
    } 
  });