
$(document).ready(function(){
    sucursal("Centro");
});


function sucursal(sucursal){

    if(sucursal == "Centro"){
        document.getElementById("BtnCentro").style.display= "none";
        document.getElementById("BtnMalvin").style.display= "block";
    } else if(sucursal == "Malvin"){
        document.getElementById("BtnMalvin").style.display= "none";
        document.getElementById("BtnCentro").style.display= "block";
        
    }

    axios.get('http://localhost:3000/Equipo').then(function (response){
        var persona = "";
        for(var i=0; response.data.length>i; i++){

                if(response.data[i].Sucursal == sucursal){
                        persona +=  '<div class="Persona col-sm-3">';
                        persona += '        <img src="'+response.data[i].Foto+'" alt="Imagen Agente">';
                        persona += '        <h4 class="nombre">'+response.data[i].Nombre.toUpperCase()+'</h4>';
                        persona += '        <p class="puesto">'+response.data[i].Puesto+'</p>';
                        persona += '        <p class="mail">'+response.data[i].Mail+'</p>';
                        persona += '        <p class="telefono">'+response.data[i].Numero+'</p> ';
                        persona += '</div>';
                }
            
        } 
        document.getElementById("titulo").innerHTML    = "Sucursal "+sucursal;
        document.getElementById("empleados").innerHTML = (persona);

    })

    .catch(function (errorResponse){
        console.log(errorResponse);
    });
}
