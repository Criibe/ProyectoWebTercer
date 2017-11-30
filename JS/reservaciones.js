
var id;
var idUsuario;
var idEvento;

var DB = null;


$(document).ready(function cargarBase() {

        idUsuario = window.location.hash.substring(1);

        DB = openDatabase("proyectoWeb", '0.1', 'proyectoWeb', 20000);

        if(!DB){
            alert("No fue posible realizar la conexion");
        }


        $('#reservar').click(function (event){
            var tipoEvento = $( "#evento option:selected" ).text();
            var platillo = $( "#platillo option:selected" ).text();

            var fecha = new Date($('#fecha').val());
            var dia = fecha.getDate();
            var mes = fecha.getMonth()+1;
            var año = fecha.getFullYear();

            //ELEMENTOS DE LA MATRIZ

            /*Verificar que la tabla tenga un elemento dentro*/

            var e11 = $('#m11').children().attr('id'); 
            var e12 = $('#m12').children().attr('id');; var e13 = $('#m13').children().attr('id');;
            var e21 = $('#m21').children().attr('id');; var e22 = $('#m22').children().attr('id');; var e23 = $('#m23').children().attr('id');;
            var e31 = $('#m31').children().attr('id');; var e32 = $('#m32').children().attr('id');; var e33 = $('#m33').children().attr('id');;


              if( isNaN(fecha)){
                alert("Debes seleccionar una fecha");
              }
              else{
                  alert("Opcion seleccionada: " + tipoEvento + " platillo: " + platillo + " Fecha: " + dia + "/" + mes + "/" + año );   
                  fechaFormada = dia + "/" + mes + "/" + año;

                  DB.transaction(function(tran){
                      tran.executeSql('INSERT INTO EVENTOS (ID_USUARIO, NOMBRE_EVENTO, FECHA) VALUES ( "' + idUsuario +'", "' + tipoEvento + '", "' + fechaFormada + '");');
                      
                      /*for(i=0; i<3; i++){
                          for(j=0; j<3; j++)
                            tran.executeSql('INSERT INTO DISTRIBUCION (ID_EVENTO, ELEMENTO, POSICION, PLATILLO) VALUES ( "' + idEvento +'", "' + 'm' + (i+1) + '' + (j+1)+ '", "' + fechaFormada + '");');
                      }*/

                      alert("EVENTO GUARDADO ");
                    });
              }

        });


        });
    
function permitirDrop(event){
	event.preventDefault();
}

function dragStart(event){

	id = event.target.id;
	document.getElementById(id).classList.add("gelatina");

    /*event.dataTransfer.setData("text", event.target.id);*/
}


function drop(event){

	document.getElementById(id).classList.remove("gelatina");

    /*console.log("event.target " + event.dataTransfer.getData("text"));
    console.log("event.target2 " + event.target.id);*/

    //if(event.target.id == "dropSpace")
    event.target.append(document.getElementById(id));

	var offset = event.dataTransfer.getData("text/plain").split(",");

    return false;
}

