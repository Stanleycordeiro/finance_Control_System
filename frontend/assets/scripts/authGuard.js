firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      showLoading();
      window.location.href = "../../index.html";
    } 
    if(user){
      user.getIdToken().then(token => console.log(token));
    }
  });