function showLoading() {  
  let divMain = document.getElementById("main");  
  let screenLoading = document.createElement("div");
  screenLoading.classList.add(
    "loadingMain",
    "justify-content-center",
    "d-flex"
  );
  screenLoading.innerHTML = ` <div class="load-wrapp">
 <div class="load-5">
   <h6 class="text-white">Carregando...</h6>
   <div class="ring-2">
     <div class="ball-holder">
       <div class="ball"></div>
     </div>
   </div>
 </div>
</div>`;

  divMain.appendChild(screenLoading);

//   setTimeout(() => hideLoading(), 2000);
  }


function hideLoading() {
    const loadings = document.getElementsByClassName('loadingMain');
    if (loadings.length){
        loadings[0].remove();
    }
}
