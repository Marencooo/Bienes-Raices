

function EnviarMensaje(){
    var sucursal   = document.getElementById("Sucursal");
    var nombre     = document.getElementById("Nombre");
    var mail       = document.getElementById("Mail");
    var asunto     = document.getElementById("Asunto");
    var mensaje    = document.getElementById("Mensaje");
    
    var cargaraction = "mailto:santimarenco@hotmail.com&subject="+asunto.value+"&body=Sucursal: "+sucursal.value+" Mi nombre: "+nombre.value+" Mi E-Mail: "+mail.value+" Mensaje: "+mensaje.value;
   document.getElementById("FormContacto").action=cargaraction;
}