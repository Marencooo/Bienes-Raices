var check = false;
var contador = 0;
function CerrarSecion(){
    
    axios.get('http://localhost:3000/Login').then(function (response){
        
        if(response.data[0].Check == true){
            check = false;
            LeerCheckAnterior(check);
        }

    })
    .catch(function (errorResponse){
        console.log(errorResponse);
    });

}

function AbrirCmanager(){

    var a = document.createElement("a");
        a.href = "IndexCmanager.html";
        a.target = "_top";
        a.click();


}

function LogAdmin(){
    var DivSalir     = document.getElementById("Salir");
    var Form       = document.getElementById("FormNuevo");
    var FormLog = document.getElementById("FormLog");
    var DivFormAdministrador = document.getElementById("DivFormAdministrador");
    var Img = document.getElementsByClassName("ImgBoton");
    var Usuario    = FormLog.Usuario.value;
    var Contraseña = FormLog.Contraseña.value;
     
    if (Usuario == ""){
        alert("Debe ingresar un usuario");
     } else if (Contraseña == ""){
        alert("Debe ingresar una contraseña");
     } else if (Usuario === "Marenco" && Contraseña === "Marenco"){
            check = true;
            LeerCheckAnterior(check);        
        
    } else { alert("Usuario y/o contraseña incorrectos");
            FormLog.Contraseña.value="";
            }
}

function LeerCheckAnterior(check){
     
    axios.get('http://localhost:3000/Login').then(function (response){
               var id = response.data[0].id;
               EliminarCheckAnterior(id,check);

            })
            .catch(function (errorResponse){
                console.log(errorResponse);
            });
}

function EliminarCheckAnterior(id,check){
    axios.delete('http://localhost:3000/Login/' + id).then(function (response){
 
        CrearCheck(check); 
                 

    })
    .catch(function (errorResponse){
        console.log(errorResponse);
    });
}

function CrearCheck(check){
    Login = {Check  : check };

    axios.post('http://localhost:3000/Login', Login).then(function (response){

            ValidarLogin(check);
            

    })
    .catch(function (errorResponse){
        console.log(errorResponse);
    });
}

function ValidarLogin(check){

            if(check == false){
            var a = document.createElement("a");
            a.target = "_top";
            a.href = "Login.html";
            a.click();
        } else if(check == true){
            AbrirCmanager();
        }
}