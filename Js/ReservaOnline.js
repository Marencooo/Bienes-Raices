
var Contador = 6;
var ContadorImagen = 6;
var ContadorVentas = 1;
var ContadorAlquiler = 1;
var VerificarCita = "";
var filtroDesplegado = false;

$( document ).ready(function() {
    CargarReservaOnline();
    OcultarReservaPropiedad();

});
function CargarReservaOnline(){

                axios.get('http://localhost:3000/Inmueble')
                    .then(function (response){
                        for(var i=0; i<response.data.length; i++){
                            var Div ='<div id="1" class="col-sm-4 InmuebleInfo '+response.data[i].TipoComercializacion+' '+response.data[i].Barrio+' '+response.data[i].Departamento+' D'+response.data[i].Dormitorios+' '+response.data[i].TipoInmueble+'">';
                                Div +='<h2>'+response.data[i].Nombre+'</h2>';
                                Div +='<img id="Img'+response.data[i].id+'" class="img-thumbnail ImagenTableInmuebles" onclick="CargarPropiedadParticular('+response.data[i].id+')" src="'+response.data[i].Url1+'" alt="Imagen Imueble">';
                                Div +='<button class="BtnProxima" id="h'+response.data[i].id+'" type="button" onclick="RotarImagenes(&#39;Img'+response.data[i].id+'&#39;,&#39;Anterior&#39;,&#39;'+response.data[i].Url1+'&#39;,&#39;'+response.data[i].Url2+'&#39;,&#39;'+response.data[i].Url3+'&#39;)" >&#60;</button>';
                                Div +='<button class="BtnAnterior" id="i'+response.data[i].id+'" type="button" onclick="RotarImagenes(&#39;Img'+response.data[i].id+'&#39;,&#39;Proxima&#39;,&#39;'+response.data[i].Url1+'&#39;,&#39;'+response.data[i].Url2+'&#39;,&#39;'+response.data[i].Url3+'&#39;)" >></button>';
                                Div +='<div class="ContenedorDatosInmueble">';
                                Div +='<p>'+response.data[i].Departamento+' - '+response.data[i].Barrio+'</p>';
                                Div +='<h3>'+response.data[i].TipoInmueble+'</h3>';
                                Div +='<p class="DatosInmueble">Dormitorios '+response.data[i].Dormitorios+' | Baños '+response.data[i].Baños+' | Garaje '+response.data[i].Garaje+' | '+response.data[i].Cualidad+'</p>';
                                Div +='<p class="Descripcion">'+response.data[i].Descripcion+'</p>';
                                Div +='<p class="Precio"> '+response.data[i].TipoComercializacion+': '+response.data[i].Moneda+' '+response.data[i].Precio+'</p>';
                                Div +='<button class="ReservaOnlineButton" onclick="CargarPropiedadParticular('+response.data[i].id+')" type="button">Ver Más</button><br>';
                                Div +='</div>';
                                Div +='</div>';
                           
                            var DivRow = document.getElementById("DivInmuebles");
                            DivRow.innerHTML += Div;
                        }
                        
                    })
                    .catch(function (errorResponse){
                        console.log(errorResponse);
                    });     
}                           

function OcultarReservaPropiedad(){
    var reservaonlinepropiedad = document.getElementById("ReservaOnlinePropiedad");
    reservaonlinepropiedad.style.display= "none";
}

function DesplegarFiltro(){

	if(filtroDesplegado){
        filtroDesplegado = false;

        document.getElementById("Desplegarfiltro").classList.add("glyphicon-chevron-down");
        document.getElementById("Desplegarfiltro").classList.remove("glyphicon-chevron-up");
        document.getElementById("Filtros").style.height= "40px";
        document.getElementById("FiltrosBusqueda").style.display= "none";
        document.getElementById("Desplegarfiltro").innerHTML= "   Desplegar filtro";
	} else{
        filtroDesplegado = true;

        document.getElementById("Desplegarfiltro").classList.remove("glyphicon-chevron-down");
        document.getElementById("Desplegarfiltro").classList.add("glyphicon-chevron-up");
        document.getElementById("Filtros").style.height= "520px";
        document.getElementById("FiltrosBusqueda").style.display= "block";
        document.getElementById("Desplegarfiltro").innerHTML= "       Ocultar filtro";
	}

}

function VerificarHora(){
    var Form = document.getElementById("FormCita");

    var Hora       = Form.Hora.value; 
    var Fecha      = Form.Fecha.value;
    var IdInmueble = Form.IdInmueble.value;
    var ContadorFechayHora = 0;

    axios.get('http://localhost:3000/Reserva')
    .then(function (response){

        if(response.data.length == 0){
            
                EnviarReserva();
        }
            
        for(var i=0; i<response.data.length; i++){

            if(response.data[i].IdInmueble == IdInmueble){

                if(response.data[i].Fecha == Fecha ){

                    if(response.data[i].Hora == Hora){
                        VerificarCita = "Reservada";
                         
                        break; 
                    }
                }

            } else if(response.data[i].Fecha == Fecha ){

                if(response.data[i].Hora == Hora){
                    ContadorFechayHora++  
                    if(ContadorFechayHora == 3){
                        VerificarCita= "FaltaPersonal";
                        
                        break;
                    }
                }
            } else{
                VerificarCita = "Disponible";
            }

        }

        if(VerificarCita == "Reservada"){
            AvisoReservaNoDisponible();
        } else if(VerificarCita == "FaltaPersonal"){
            AvisoFaltaPersonal();
        } else {
            EnviarReserva();
        }
    })
    .catch(function (errorResponse){
        console.log(errorResponse);
    }); 
    

}

function EnviarReserva(){
    var Form = document.getElementById("FormCita");

        var Reserva ={  IdInmueble : Form.IdInmueble.value,
                        Nombre     :  Form.Nombre.value,
                        Fecha      : Form.Fecha.value,
                        Hora       : Form.Hora.value,
                        Mail       : Form.Mail.value
        }

        axios.post('http://localhost:3000/Reserva', Reserva)
            .then(function (response){
                   AvisoReservaCorrecta() 

            })
            .catch(function (errorResponse){
                console.log(errorResponse);
                AvisoReservaError();
            }); 
}

function  AvisoReservaNoDisponible(){
	document.getElementById("FormCita").style.display="none";
    document.getElementById("TituloForm").style.display="none";

	var divFormu  = "<div class='respuesta'><h3 >El inmueble ya fue reservado para la fecha y hora seleccionada</h3>";
	document.getElementById("ReservaFormulario").innerHTML += divFormu;
	OcultarRespuesta();
}

function  AvisoFaltaPersonal(){
	document.getElementById("FormCita").style.display="none";
    document.getElementById("TituloForm").style.display="none";

	var divFormu  = "<div class='respuesta'><h3 >Lamentablemente no disponemos de personal para cubrir la fecha y hora seleccionada</h3>";
	document.getElementById("ReservaFormulario").innerHTML += divFormu;
	OcultarRespuesta();
}

function  AvisoReservaCorrecta(){
	document.getElementById("FormCita").style.display="none";
    document.getElementById("TituloForm").style.display="none";

	var divFormu  = "<div class='respuesta'><h3 style=''>Su reserva se realizo con éxito</h3>";
        divFormu += "<p style=''>A la brevedad nos estaremos comunicando <br> Muchas gracias por confiar en nosotros</p></div>";
	document.getElementById("ReservaFormulario").innerHTML += divFormu;
	OcultarRespuesta();
}

function OcultarRespuesta(){
	setTimeout(function(){
		$(".respuesta").remove();
        document.getElementById("FormCita").style.display="block";
        document.getElementById("TituloForm").style.display="block";
		
		},4000);
}

function AvisoReservaError(){
    document.getElementById("FormCita").style.display= "none";
    document.getElementById("TituloForm").style.display="none";
    var divFormu = "<p class='respuesta' style=''>Se produjo un error inesperado, contactese via email MARENCO@BIENRESRAICES.com.uy.</p>";
    document.getElementById("ReservaFormulario").innerHTML += divFormu;
    OcultarRespuesta();
}
   
function LimpiarFiltros(){
    var Form = document.getElementById("FormFiltros");
   
    Form.TipoComercializacion.value="";
    Form.Departamento.value="";
    Form.Barrio.value="";
    
    for (var s=0; s < Form.TipoInmueble.length; s++){
            Form.TipoInmueble[s].checked=false;
    }

    for (var r=0; r < Form.Dormitorios.length; r++){
            Form.Dormitorios[r].checked=false;
    }

    Filtros();
    DesplegarFiltro();
}

function Filtros(){
    
    var Table        = document.getElementById("TableInmuebles");
    var Rows         = document.getElementsByClassName("InmuebleInfo");
    var TipoInmueble = document.getElementsByName("TipoInmueble");
    var TipoComercializacion = document.getElementById("VentaAlquiler").value;
    var Departamento = document.getElementById("Departamento2").value;
    var Barrio = document.getElementById("Barrio2").value;
    var Dormitorios = document.getElementsByName("Dormitorios");
    //muestro todas las filas de la tabla
    for(var i=0; i< Rows.length; i++){
        Rows[i].style.display= "block";
    }

     if (TipoComercializacion === "Alquiler"){
         var RowsAlquiler = document.getElementsByClassName("Alquiler");
          for(var i=0; i< Rows.length; i++){
            Rows[i].style.display= "none";
         }
         var RowsNuevasAlquiler=[] ;
         var Contador =0 ;
         for(var s=0; s< Rows.length; s++){
            for(var y=0; y< RowsAlquiler.length; y++){
                if(RowsAlquiler[y] == Rows[s]){
                    RowsAlquiler[y].style.display = "block";
                    RowsNuevasAlquiler[Contador] = Rows[s];
                    Contador ++;
                }
            }
            
        }
        Rows = RowsNuevasAlquiler;

     } else if (TipoComercializacion === "Venta"){
         var RowsVenta = document.getElementsByClassName("Venta");
         for(var i=0; i< Rows.length; i++){
            Rows[i].style.display= "none";
         }
         var RowsNuevasVentas=[] ;
         var Contador =0 ;
        for(var s=0; s< Rows.length; s++){
            for(var y=0; y< RowsVenta.length; y++){
                if(RowsVenta[y] == Rows[s]){
                    RowsVenta[y].style.display = "block";
                    RowsNuevasVentas[Contador] = Rows[s];
                    Contador ++;
                }
            } 
        }
        Rows = RowsNuevasVentas;
     }

            //Obtengo el valor del radio button
        for (var r=0; r < TipoInmueble.length; r++){
            if (TipoInmueble[r].checked){
                var TipoChecked = TipoInmueble[r].value;
            }
        }

        if (TipoChecked == "" || TipoChecked == undefined){} 
        else {
            var Tipo = document.getElementsByClassName(TipoChecked);
            //Oculto todas las filas de la tabla
            for(var i=0; i< Rows.length; i++){
                Rows[i].style.display= "none";
            }
            var RowsTipo=[] ;
            var Contador =0 ;
            //Muestro filas que tienen la clase seleccionada en el radio button
            for(var i=0; i< Rows.length; i++){
                for(var y=0; y< Tipo.length; y++){
                    if(Tipo[y] == Rows[i]){
                        Tipo[y].style.display= "block";
                        RowsTipo[Contador] = Rows[i];
                        Contador ++;
                    }
                }
            }
            Rows = RowsTipo;

        }

    if (Departamento == undefined || Departamento == ""){}
    else{
            var RowsDepa = document.getElementsByClassName(Departamento);
            for(var i=0; i< Rows.length; i++){
                Rows[i].style.display= "none";
            }
            var RowsValidasDepa =[];
            var Contador = 0;
            for(var t=0; t< Rows.length; t++){
                for(var s=0; s< RowsDepa.length; s++){
                    if (RowsDepa[s] == Rows[t]){
                        RowsDepa[s].style.display = "Block";
                        RowsValidasDepa[Contador] = Rows[t]; 
                    }
                }

            }
            Rows = RowsValidasDepa;
    }

    if (Barrio == undefined || Barrio == ""){}
    else{
            var RowsBarrio = document.getElementsByClassName(Barrio);
            var RowsValidasBarrio = "";
            for(var i=0; i< Rows.length; i++){
                Rows[i].style.display= "none";
            }
            var RowsValidasBarrio =[];
            var Contador = 0;
            for(var t=0; t< Rows.length; t++){
                for(var s=0; s< RowsBarrio.length; s++){
                    if (RowsBarrio[s] == Rows[t]){
                        RowsBarrio[s].style.display = "Block";
                        RowsValidasBarrio[Contador] = Rows[t];
                    }
                }
            }Rows = RowsValidasBarrio;
        }

    for (var r=0; r < Dormitorios.length; r++){
            if (Dormitorios[r].checked){
                var ValorDormitorios = Dormitorios[r].value;
            }
    }
    if (ValorDormitorios == undefined || ValorDormitorios == ""){
    }
    else {
        var RowsDormitorios = document.getElementsByClassName("D"+ValorDormitorios);
        for(var i=0; i< Rows.length; i++){
                Rows[i].style.display= "none";
            }
            var RowsValidasDormi =[];
            var Contador = 0;
         for(var t=0; t< Rows.length; t++){
                for(var s=0; s< RowsDormitorios.length; s++){
                    if (RowsDormitorios[s] == Rows[t]){
                        RowsDormitorios[s].style.display = "Block";
                        RowsValidasDormi[Contador] = Rows[t];
                    }
                }
         }Rows = RowsValidasDormi;
    }
    




}

function CargarPropiedadParticular(Id, Inicio){
    var inicio        = document.getElementById('Inicio');
    var reservaonline = document.getElementById("ReservaOnline");
    var reservaonlinepropiedad = document.getElementById("ReservaOnlinePropiedad");


    window.scrollTo(0, 0);
    if(Inicio === "Inicio"){
        inicio.style.display = 'none';
        reservaonlinepropiedad.style.display= "block"
    } else {
        reservaonline.style.display = 'none';
        reservaonlinepropiedad.style.display= "block"
    }

                axios.get('http://localhost:3000/Inmueble')
                    .then(function (response){
                        
                        for(var i=0; i<response.data.length; i++){
                            
                            if(response.data[i].id == Id){
                                var Div =  '<h2 class="titulo panel-body" Id="NameInmuebleParticular">'+response.data[i].Nombre+'</h2>';
                                    Div += '<img id="ImagenInmuebleParticular" src="'+response.data[i].Url1+'" alt="Imagen Inmueble">';
                                    Div +='<button class="ParticularBtnProxima" id="h'+response.data[i].id+'" type="button" onclick="RotarImagenes(&#39;Img'+response.data[i].id+'&#39;,&#39;Anterior&#39;,&#39;'+response.data[i].Url1+'&#39;,&#39;'+response.data[i].Url2+'&#39;,&#39;'+response.data[i].Url3+'&#39;)" >&#60;</button>';
                                    Div +='<button class="ParticularBtnAnterior" id="i'+response.data[i].id+'" type="button" onclick="RotarImagenes(&#39;Img'+response.data[i].id+'&#39;,&#39;Proxima&#39;,&#39;'+response.data[i].Url1+'&#39;,&#39;'+response.data[i].Url2+'&#39;,&#39;'+response.data[i].Url3+'&#39;)" >></button>';
                                    Div +='<div class="DatosInmuebleParticular">';
                                    Div += '<p class="panel-body" id="UbicacionInmuebleParticular">'+response.data[i].Departamento +' '+response.data[i].Barrio+'</p>';
                                    Div += '<h3 class="panel-body" id="TipoInmuebleParticular">'+response.data[i].TipoInmueble+'</h3>';
                                    Div += '<p class="panel-body" id="InfoInmuebleParticular">'+response.data[i].Dormitorios+' | Baños '+response.data[i].Baños+' | Garaje '+response.data[i].Garaje+' | '+response.data[i].Cualidad+'</p>';
                                    Div += '<p class="panel-body" id="DescripcionInmuebleParticular">'+response.data[i].Descripcion+'</p>';
                                    Div += '<p class="panel-body Precio" id="PrecioInmuebleParticular">'+response.data[i].TipoComercializacion+': '+ response.data[i].Moneda+' '+ response.data[i].Precio+'</p>';
                                    Div +='</div>';
                                    Div +='<div id="ReservaFormulario">';
                                    Div +='<h3 id="TituloForm">Reserve dia y hora para su cita </h3>';
                                    Div +='<div class="container-fluid">';
                                    Div +='<div class="row">';
                                    Div +='    <div class="col-sm-9">';
                                    Div +='            <form id="FormCita" method =“get”>';
                                    Div +='                    <input id="'+response.data[i].id+'" type="number" style="display: none;" name="IdInmueble" value="'+response.data[i].id+'" required>';
                                    Div +='                <div class="input-group">';
                                    Div +='                    <label class="input-group-addon" for="Fecha">Fecha para cita:</label>';
                                    Div +='                    <input id="Fecha" type="date" name="Fecha" min="2017-03-25" required>';
                                    Div +='                </div><br>';
                                    Div +='                <div class="input-group">';
                                    Div +='                    <label class="input-group-addon" for="Hora">Hora para cita:</label>';
                                    Div +='                    <input id="Hora" type="time" name="Hora" min="09:00" max="17:00" step="3600" required>';
                                    Div +='                </div><br>';
                                    Div +='                <div class="form-group">';
                                    Div +='                    <input class="form-control" id="Nombre" type="text" name="Nombre" maxlength=25 title="Nombre" placeholder="Nombre*" required><br>';
                                    Div +='                </div>';
                                    Div +='                <div class="form-group">';
                                    Div +='                    <input class="form-control" id="Mail" type="email" name="Mail" placeholder="Mail*" required><br>';
                                    Div +='                </div><br><br>';
                                    Div +='                <button type="button" onclick="VerificarHora()" class="btn btn-success">Reservar</button>';
                                    Div +='                <button class="btn btn-warning" type="reset" value="Reset">Reset</button>';
                                    Div +='            </form>';
                                    Div +='    </div>';
                                    Div +='    </div>';
                                    Div +='</div>';
                                    Div +='</div>';
                            }
                        }
                        var DivPannel       = document.getElementById("DivPannel");
                        DivPannel.innerHTML = Div;
                        
                        
                    })
                    .catch(function (errorResponse){
                        console.log(errorResponse);
                    });            
}

function RotarImagenes(Id,Boton,Url1,Url2,Url3){
    var Imagen = document.getElementById("ImagenInmuebleParticular");
    var Imagen2 = document.getElementById(Id);
    
    if(Boton === "Proxima"){
        
        if(Imagen2.src.match(Url1)){
            Imagen2.src = Url2;
        } else if(Imagen2.src.match(Url2)){
            Imagen2.src = Url3;
        } else if(Imagen2.src.match(Url3)){
            Imagen2.src = Url1;
        }

        if(Imagen.src.match(Url1)){
            Imagen.src = Url2;
        } else if(Imagen.src.match(Url2)){
            Imagen.src = Url3;
        } else if(Imagen.src.match(Url3)){
            Imagen.src = Url1;
        }
    } else if(Boton == "Anterior"){
        if(Imagen2.src.match(Url1)){
            Imagen2.src = Url3;
        } else if(Imagen2.src.match(Url2)){
            Imagen2.src = Url1;
        } else if(Imagen2.src.match(Url3)){
            Imagen2.src = Url2;
        }

        if(Imagen.src.match(Url1)){
            Imagen.src = Url3;
        } else if(Imagen.src.match(Url2)){
            Imagen.src = Url1;
        } else if(Imagen.src.match(Url3)){
            Imagen.src = Url2;
        }
    }
}


