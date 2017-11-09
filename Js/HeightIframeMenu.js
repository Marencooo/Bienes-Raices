function AgregarHeight(){   
    var Iframe = document.getElementById("IframeMenu");
    if(window.innerWidth < 618){
        Iframe.classList.add("MenuDesplegado");
        Iframe.classList.remove("MenuNoDesplegado");
    } else {
         Iframe.classList.remove("MenuDesplegado");
         Iframe.classList.add("MenuNoDesplegado");
    }
}

function AchicarHeight(){
    var Iframe = document.getElementById("IframeMenu");
    if(window.innerWidth < 618){
        Iframe.classList.remove("MenuDesplegado");
         Iframe.classList.add("MenuNoDesplegado");
    }
}