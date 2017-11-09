function AgregarClase() {
    var Menu = document.getElementById("Menu");
    if (Menu.className === "TopNav") {
        Menu.className += " Responsive";
    } else {
        Menu.className = "TopNav";
    }
}

/*function MouseFueraMenu(){
    var Menu = document.getElementById("Menu");
    if (Menu.classList.contains("Responsive")) {
        Menu.className = "TopNav";
    }
}*/

