function AgregarClase() {
    var x = document.getElementById("Menu");
    if (x.className === "TopNav") {
        x.className += " Responsive";
        window.parent.document.getElementById("IframeMenu").style.height="150px";

    } else {
        x.className = "TopNav";
        window.parent.document.getElementById("IframeMenu").style.height="50px";

    }
}

