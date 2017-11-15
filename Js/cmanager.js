
function soloNumero(idCampo){

	var valor = ($("#"+idCampo).val() + '').replace(/[^0-9]/g, '');
	$("#"+idCampo).val(valor);
}

function MostrarEmpleado(){

    axios.get('http://localhost:3000/Login').then(function (response){

        if(response.data[0].Check == false){
            var a = document.createElement("a");
            a.target = "_top";
            a.href = "Login.html";
            a.click();
        } else if(response.data[0].Check == true){

        var tableBody = document.getElementById('TablaEquipo');
        tableBody.innerHTML = "";
        var DivEquipo = document.getElementById("Equipo");
        DivEquipo.classList.remove("Oculto");
        
            axios.get('http://localhost:3000/Equipo').then(function (response){

                var nuevaRow  = tableBody.insertRow();

                var AccionCell          = nuevaRow.insertCell(0);
                AccionCell.innerHTML    = "Accion";

                var NombreTitle         = nuevaRow.insertCell(1);
                NombreTitle.innerHTML   = "Nombre";

                var SucursalTitle       = nuevaRow.insertCell(2);
                SucursalTitle.innerHTML = "Sucursal";

                var NumeroTitle         = nuevaRow.insertCell(3);
                NumeroTitle.innerHTML   =  "Numero";

                var MailTitle           = nuevaRow.insertCell(4);
                MailTitle.innerHTML     = "Mail";

                var PuestoTitle         = nuevaRow.insertCell(5);
                PuestoTitle.innerHTML   = "Puesto";

                var ImagenTitle         = nuevaRow.insertCell(6);
                ImagenTitle.innerHTML   = "Imagen";




                for(var i=0; i<response.data.length; i++){

                        nuevaRow  = tableBody.insertRow();

                        var AccionCell = nuevaRow.insertCell(0);
                        AccionCell.innerHTML ='<img class="ImgBoton" src="../Images/del.png" onclick="EliminarEmpleado('+response.data[i].id+')" alt="Eliminar">';
                        AccionCell.innerHTML +='<img class="ImgBoton" src="../Images/edi.png" onclick="ModificarEmpleado('+response.data[i].id+')" alt="Modificar">';

                        var NombreCell             = nuevaRow.insertCell(1);
                        NombreCell.innerHTML       = response.data[i].Nombre;

                        var SucursalCell           = nuevaRow.insertCell(2);
                        SucursalCell.innerHTML     = response.data[i].Sucursal;

                        var NumeroCell             = nuevaRow.insertCell(3);
                        NumeroCell.innerHTML       =  response.data[i].Numero

                        var MailCell               = nuevaRow.insertCell(4);
                        MailCell.innerHTML         = response.data[i].Mail;

                        var PuestoCell             = nuevaRow.insertCell(4);
                        PuestoCell.innerHTML       = response.data[i].Puesto;

                        var FotoCell               = nuevaRow.insertCell(6);
                        FotoCell.innerHTML         = "<img class='ImagenEmpleado' src='../"+response.data[i].Foto+"' alt='Imagen Inmueble'>";

                }
                
            })
            .catch(function (errorResponse){
                console.log(errorResponse);
            });
    }

    })
    .catch(function (errorResponse){
        console.log(errorResponse);
    });

}

function FormAlata(Tipo){
   
    if(Tipo == "Inmueble"){
        var Form            = document.getElementById("FormInmueble");
        var ButtonModificar = document.getElementById("ButtonModificar");
        var ButtonNuevo     = document.getElementById("ButtonNuevo");
        var Titulo          = document.getElementById("Titulo");
        var MostrarFormAlta = document.getElementById("MostrarFormAlta");

        MostrarFormAlta.classList.add("Oculto");
        ButtonModificar.classList.add("Oculto");
        ButtonNuevo.classList.remove("Oculto");
        Titulo.innerHTML="Ingresar Inmueble";

        window.scrollTo(0, 60);

        Form.id.value = "";
        Form.name.value = "";
        Form.imagen1.value= "";
        Form.imagen2.value= "";
        Form.imagen3.value= "";
        Form.departamento.value= "";
        Form.barrio.value= "";
        Form.dormitorios.value= "";
        Form.baños.value= "";
        Form.garaje.value= "";
        Form.cualidad.value= "";
        Form.descripcion.value= "";
        Form.tipo.value= "";
        Form.moneda.value= "";
        Form.precio.value= "";
        Form.TipoInmuebleNuevo.value= "";

    } else if(Tipo == "Empleado"){

        var Form            = document.getElementById("FormEquipo");
        var BtnModificar = document.getElementById("BtnModificarEmpleado");
        var BtnNuevo     = document.getElementById("BtnNuevoEmpleado");
        var Titulo          = document.getElementById("TituloEquipo");
        var MostrarFormAlta = document.getElementById("MostrarFormAlta");

        MostrarFormAlta.classList.add("Oculto");
        BtnModificar.classList.add("Oculto");
        BtnNuevo.classList.remove("Oculto");
        Titulo.innerHTML="Ingresar Empleado";

        window.scrollTo(0, 140);

        Form.name.value     = "";
        Form.sucursal.value = "";
        Form.numero.value   = "";
        Form.mail.value     = "";
        Form.puesto.value   = "";
        Form.imagen.value   = "";
    }
}

function NuevoEmpleado(Accion){
    var Table               = document.getElementById("TableEquipo");
    var Form                = document.getElementById("FormEquipo");

    if(Accion === "Modificar"){
        var ButtonModificar     = document.getElementById("BtnModificarEmpleado");
        var ButtonNuevo         = document.getElementById("BtnNuevoEmpleado");
        var Titulo              = document.getElementById("TituloEquipo");

        EliminarEmpleado(Form.id.value, "Modificar");
    }
        
        var Nombre         = Form.name.value;
        var Sucursal       = Form.sucursal.value;
        var Numero         = Form.numero.value;
        var Mail           = Form.mail.value;
        var Puesto         = Form.puesto.value;
        var Foto           = Form.imagen.value;


        if(Nombre === ""  || Sucursal === "" || Numero === "" || Mail === "" || Puesto === "" || Foto === ""){
                alert("Asegurese de que todos los campos esten completos");
            } else {


                    var Empleado = {
                    Nombre      : Nombre,
                    Sucursal    : Sucursal, 
                    Numero      : Numero,
                    Mail        : Mail, 
                    Puesto      : Puesto,
                    Foto        : Foto };
                    

                    axios.post('http://localhost:3000/Equipo', Empleado)
                        .then(function (response){

                                if(Accion === "Modificar"){
                                    alert("El empleado "+Nombre+" ah sido modificado");
                                    window.scrollTo(0,0);
                                    ButtonModificar.classList.add("Oculto");
                                    ButtonNuevo.classList.remove("Oculto");
                                    Titulo.innerHTML = "Ingresar Empleado";
                                    var MostrarFormAlta = document.getElementById("MostrarFormAlta");
                                        MostrarFormAlta.classList.add("Oculto");
                                }
                                if(Accion === "Nuevo"){
                                    alert("El empleado "+Nombre+" ah sido creado");
                                    window.scrollTo(0,0);
                                    MostrarEmpleado();
                                }

                                Form.id.value="";
                                Form.name.value="";
                                Form.sucursal.value="";
                                Form.numero.value="";
                                Form.mail.value="";
                                Form.puesto.value="";
                                Form.imagen.value="";

                        })
                        .catch(function (errorResponse){
                            console.log(errorResponse);
                        });
                   

            }
            
            
            
            
}

function ModificarEmpleado(Id){

    var Form            = document.getElementById("FormEquipo");
    var BtnModificar    = document.getElementById("BtnModificarEmpleado");
    var BtnNuevo        = document.getElementById("BtnNuevoEmpleado");
    var Titulo          = document.getElementById("TituloEquipo");
    var MostrarFormAlta = document.getElementById("MostrarFormAlta");

    BtnModificar.classList.remove("Oculto");
    BtnNuevo.classList.add("Oculto");
    Titulo.innerHTML="Modificar Empleado";
    MostrarFormAlta.classList.remove("Oculto");

    window.scrollTo(0, 140);


    axios.get('http://localhost:3000/Equipo')
            .then(function (response){
               
                for(var i=0; i<response.data.length; i++){
                    
                    if(response.data[i].id == Id){

                            Form.id.value       = response.data[i].id;
                            Form.name.value     = response.data[i].Nombre;
                            Form.sucursal.value = response.data[i].Sucursal;
                            Form.numero.value   = response.data[i].Numero;
                            Form.mail.value     = response.data[i].Mail;
                            Form.puesto.value   = response.data[i].Puesto;
                            Form.imagen.value   = response.data[i].Foto;
                    }
                }
            })
            .catch(function (errorResponse){
                console.log(errorResponse);
            });      

}

function EliminarEmpleado(Id, Accion){

    axios.delete("http://localhost:3000/Equipo/" + Id)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (errorResponse) {
        console.log(errorResponse);
    });

    if (Accion != "Modificar"){
      alert("El empleado ah sido eliminado");
    }
    MostrarEmpleado();
}

function MostrarInmueble() {
    $("#TablaInmueble").empty();

    axios.get('http://localhost:3000/Login').then(function (response){

        if(response.data[0].Check == false){
            var a = document.createElement("a");
            a.target = "_top";
            a.href = "Login.html";
            a.click();
        } else if(response.data[0].Check == true){

            var tableBody = document.getElementById('TablaInmueble');
            var DivInmueble = document.getElementById("Inmueble");
            DivInmueble.classList.remove("Oculto");
            
            axios.get('http://localhost:3000/Inmueble').then(function (response){
               
                nuevaRow  = tableBody.insertRow();

                var AccionCell = nuevaRow.insertCell(0);
                AccionCell.innerHTML = "Accion";

                var NombreTitle = nuevaRow.insertCell(1);
                NombreTitle.innerHTML = "Nombre";

                var DepartamentoTitle = nuevaRow.insertCell(2);
                DepartamentoTitle.innerHTML = "Departamento";

                var BarrioTitle = nuevaRow.insertCell(3);
                BarrioTitle.innerHTML =  "Barrio";

                var TipoInmuebleTitle = nuevaRow.insertCell(4);
                TipoInmuebleTitle.innerHTML = "Tipo Inmueble";

                var BañosTitle = nuevaRow.insertCell(5);
                BañosTitle.innerHTML = "Baños";

                var DormitoriosTitle = nuevaRow.insertCell(6);
                DormitoriosTitle.innerHTML = "Dormitorios";

                var GarajeTitle = nuevaRow.insertCell(7);
                GarajeTitle.innerHTML = "Garaje";

                var CualidadTitle = nuevaRow.insertCell(8);
                CualidadTitle.innerHTML = "Cualidad";

                var DescripcionTitle = nuevaRow.insertCell(9);
                DescripcionTitle.innerHTML = "Descripcion";
                DescripcionTitle.classList.add("Descripcion");

                var MonedaTitle = nuevaRow.insertCell(10);
                MonedaTitle.innerHTML = "Moneda";

                var PrecioTitle = nuevaRow.insertCell(11);
                PrecioTitle.innerHTML = "Precio";

                var Url1Title = nuevaRow.insertCell(12);
                Url1Title.innerHTML = "Primer Url";

                var Url2Title = nuevaRow.insertCell(13);
                Url2Title.innerHTML = "Segundo Url";

                var Url3Title = nuevaRow.insertCell(14);
                Url3Title.innerHTML = "Tercer Url";



                for(var i=0; i<response.data.length; i++){

                    nuevaRow  = tableBody.insertRow();

                    var AccionCell = nuevaRow.insertCell(0);
                    AccionCell.innerHTML ='<img class="ImgBoton" src="../Images/del.png" onclick="EliminarInmueble('+response.data[i].id+')" alt="Eliminar">';
                    AccionCell.innerHTML +='<img class="ImgBoton" src="../Images/edi.png" onclick="ModificarInmueble('+response.data[i].id+')" alt="Modificar">';

                    var NombreCell = nuevaRow.insertCell(1);
                    NombreCell.innerHTML = response.data[i].Nombre;

                    var DepartamentoCell = nuevaRow.insertCell(2);
                    DepartamentoCell.innerHTML = response.data[i].Departamento;

                    var BarrioCell = nuevaRow.insertCell(3);
                    BarrioCell.innerHTML =  response.data[i].Barrio

                    var TipoInmuebleCell = nuevaRow.insertCell(4);
                    TipoInmuebleCell.innerHTML = response.data[i].TipoInmueble;

                    var BañosCell = nuevaRow.insertCell(5);
                    BañosCell.innerHTML = response.data[i].Baños;

                    var DormitoriosCell = nuevaRow.insertCell(6);
                    DormitoriosCell.innerHTML = response.data[i].Dormitorios;

                    var GarajeCell = nuevaRow.insertCell(7);
                    GarajeCell.innerHTML = response.data[i].Garaje;

                    var CualidadCell = nuevaRow.insertCell(8);
                    CualidadCell.innerHTML = response.data[i].Cualidad;

                    var DescripcionCell = nuevaRow.insertCell(9);
                    DescripcionCell.innerHTML = response.data[i].Descripcion;
                    DescripcionCell.classList.add("Descripcion");

                    var MonedaCell = nuevaRow.insertCell(10);
                    MonedaCell.innerHTML = response.data[i].Moneda;

                    var PrecioCell = nuevaRow.insertCell(11);
                    PrecioCell.innerHTML = response.data[i].Precio;

                    var Url1Cell = nuevaRow.insertCell(12);
                    Url1Cell.innerHTML = "<img class='ImagenInmueble' src='../"+response.data[i].Url1+"' alt='Imagen Inmueble'>";

                    var Url2Cell = nuevaRow.insertCell(13);
                    Url2Cell.innerHTML = "<img class='ImagenInmueble' src='../"+response.data[i].Url2+"' alt='Imagen Inmueble'>";

                    var Url3Cell = nuevaRow.insertCell(14);
                    Url3Cell.innerHTML = "<img class='ImagenInmueble' src='../"+response.data[i].Url3+"' alt='Imagen Inmueble'>";

                }
                
            })
            .catch(function (errorResponse){
                console.log(errorResponse);
            });
            }
            
        })
        .catch(function (errorResponse){
            console.log(errorResponse);
        });

}

function ActivarSelectBarrio(){
    var SelectDepartamento = document.getElementById("Departamento").value;
    var SelectBarrio  = document.getElementById("Barrio");
    if(SelectDepartamento === "Montevideo"){
        SelectBarrio.disabled = false;
    } else SelectBarrio.disabled = true;
        SelectBarrio.value= "";
}

function ModificarInmueble(Id){

    var Form            = document.getElementById("FormInmueble");
    var ButtonModificar = document.getElementById("ButtonModificar");
    var ButtonNuevo     = document.getElementById("ButtonNuevo");
    var Titulo          = document.getElementById("Titulo");
    var MostrarFormAlta = document.getElementById("MostrarFormAlta");

    MostrarFormAlta.classList.remove("Oculto");
    ButtonModificar.classList.remove("Oculto");
    ButtonNuevo.classList.add("Oculto");
    Titulo.innerHTML="Modificar Inmueble";

    window.scrollTo(0, 60);

   /* Form.id.value = "";
    Form.name.value = "";
    Form.imagen1.value= "";
    Form.imagen2.value= "";
    Form.imagen3.value= "";
    Form.departamento.value= "";
    Form.barrio.value= "";
    Form.dormitorios.value= "";
    Form.baños.value= "";
    Form.garaje.value= "";
    Form.cualidad.value= "";
    Form.descripcion.value= "";
    Form.tipo.value= "";
    Form.moneda.value= "";
    Form.precio.value= "";
    Form.TipoInmuebleNuevo.value= "";*/




    axios.get('http://localhost:3000/Inmueble')
            .then(function (response){
               
                for(var i=0; i<response.data.length; i++){
                    
                    if(response.data[i].id == Id){

                            Form.id.value                 = response.data[i].id;
                            Form.name.value               = response.data[i].Nombre;
                            Form.imagen1.value            = response.data[i].Url1;
                            Form.imagen2.value            = response.data[i].Url2;
                            Form.imagen3.value            = response.data[i].Url3;
                            Form.departamento.value       = response.data[i].Departamento;
                            Form.barrio.value             = response.data[i].Barrio;
                            Form.dormitorios.value        = response.data[i].Dormitorios;
                            Form.baños.value              = response.data[i].Baños;
                            Form.garaje.value             = response.data[i].Garaje;
                            Form.cualidad.value           = response.data[i].Cualidad;
                            Form.descripcion.value        = response.data[i].Descripcion;
                            Form.tipo.value               = response.data[i].TipoComercializacion;
                            Form.moneda.value             = response.data[i].Moneda;
                            Form.precio.value             = response.data[i].Precio;
                            Form.TipoInmuebleNuevo.value  = response.data[i].TipoInmueble;
                    }
                }
            })
            .catch(function (errorResponse){
                console.log(errorResponse);
            });      

}

function EliminarInmueble(Id, Accion){

    axios.delete("http://localhost:3000/Inmueble/" + Id)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (errorResponse) {
        console.log(errorResponse);
    });

    if (Accion != "Modificar"){
      alert("El inmueble ah sido eliminado");
    }
    MostrarInmueble();
}

function NuevoInmueble(Accion){
    var Table               = document.getElementById("TableInmuebles");
    var Form                = document.getElementById("FormInmueble");

    if(Accion === "Modificar"){
        var ButtonModificar     = document.getElementById("ButtonModificar");
        var ButtonNuevo         = document.getElementById("ButtonNuevo");
        var Titulo              = document.getElementById("Titulo");

        EliminarInmueble(Form.id.value, "Modificar"); 
    }
        var id                   = Form.id.value;
        var Nombre               = Form.name.value;
        var Url1                 = Form.imagen1.value;
        var Url2                 = Form.imagen2.value;
        var Url3                 = Form.imagen3.value;
        var Departamento         = Form.departamento.value;
        var Barrio               = Form.barrio.value;
        var Dormitorios          = Form.dormitorios.value;
        var Baños                = Form.baños.value;
        var Garaje               = Form.garaje.value;
        var Cualidad             = Form.cualidad.value;
        var Descripcion          = Form.descripcion.value;
        var TipoComercializacion = Form.tipo.value;
        var Moneda               = Form.moneda.value;
        var Precio               = Form.precio.value;
        var TipoInmueble         = Form.TipoInmuebleNuevo.value;

        if(Nombre === ""  || Url1 === "" || Url3 === "" || Url2 === "" || Dormitorios === "" || Baños === "" || Garaje === ""
            || Cualidad === "" || Descripcion === "" || Precio === "" || TipoInmueble === "" ){
                alert("Asegurese de que todos los campos esten completos");
            } else {


                    if(Barrio === ""){Barrio = Departamento;}
                    var Inmueble = {
                    Nombre               : Nombre,
                    Url1                 : Url1, 
                    Url2                 : Url2,
                    Url3                 : Url3, 
                    Departamento         : Departamento,
                    Barrio               : Barrio,
                    Dormitorios          : Dormitorios, 
                    Baños                : Baños, 
                    Garaje               : Garaje,
                    Cualidad             : Cualidad, 
                    Descripcion          : Descripcion,
                    TipoComercializacion : TipoComercializacion,
                    Moneda               : Moneda,
                    Precio               : Precio, 
                    TipoInmueble         : TipoInmueble };
                    

                    axios.post('http://localhost:3000/Inmueble', Inmueble)
                        .then(function (response){
               
                        })
                        .catch(function (errorResponse){
                            console.log(errorResponse);
                        });
                   
                    
                            Form.id.value= "";
                            Form.name.value = "";
                            Form.imagen1.value= "";
                            Form.imagen2.value= "";
                            Form.imagen3.value= "";
                            Form.departamento.value= "";
                            Form.barrio.value= "";
                            Form.dormitorios.value= "";
                            Form.baños.value= "";
                            Form.garaje.value= "";
                            Form.cualidad.value= "";
                            Form.descripcion.value= "";
                            Form.tipo.value= "";
                            Form.moneda.value= "";
                            Form.precio.value= "";
                            Form.TipoInmuebleNuevo.value= "";

                            if(Accion === "Nuevo"){
                                alert("El inmueble "+Nombre+" ah sido creado");
                                window.scrollTo(0,0);
                                MostrarInmueble();
                             }

                             if(Accion === "Modificar"){
                                alert("El inmueble "+Nombre+" ah sido modificado");
                                window.scrollTo(0,0);
                                ButtonModificar.classList.add("Oculto");
                                ButtonNuevo.classList.remove("Oculto");
                                Titulo.innerHTML = "Ingresar Inmueble";
                                var MostrarFormAlta = document.getElementById("MostrarFormAlta");
                                    MostrarFormAlta.classList.add("Oculto");
                             }
            }
                    
            
}

