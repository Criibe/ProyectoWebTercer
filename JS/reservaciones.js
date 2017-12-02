
var id;
var idUsuario;
var idEvento = 0;

var DB = null;


$(document).ready(function cargarBase() {

        idUsuario = window.location.hash.substring(1);

        DB = openDatabase("proyectoWeb", '0.1', 'proyectoWeb', 20000);

        if(!DB){
            alert("No fue posible realizar la conexion");
        }




        if(idEvento != 0){

          DB.transaction(function(tran){
            tran.executeSql('SELECT rowid, * FROM EVENTOS ORDER BY rowid DESC LIMIT 1', [], function(tran, data){
                idEvento = data.rows[0].rowid;
                idEvento = idEvento+1;
          });
          });
        } else idEvento = 1;



        $('#reservar').click(function (event){



            var fecha = new Date($('#fecha').val());
            var dia = fecha.getDate();
            var mes = fecha.getMonth()+1;
            var año = fecha.getFullYear();

            var tipoEvento = $( "#evento option:selected" ).text();

            alert("ID EVENTO " + idEvento);

            //ELEMENTOS DE LA MATRIZ

            /*Verificar que la tabla tenga un elemento dentro*/
            var e11 = $('#m11').children().attr('id'); var e12 = $('#m12').children().attr('id');; var e13 = $('#m13').children().attr('id');;
            var e21 = $('#m21').children().attr('id');; var e22 = $('#m22').children().attr('id');; var e23 = $('#m23').children().attr('id');;
            var e31 = $('#m31').children().attr('id');; var e32 = $('#m32').children().attr('id');; var e33 = $('#m33').children().attr('id');;

            //Recolección de los nombres de los invitados de las mesas
            // y platillos

            var nombresMesa1 = [];
            var nombresMesa2 = [];
            var nombresMesa3 = [];

            var platilloMesa1 = $( "#platilloM1 option:selected" ).text();
            var platilloMesa2 = $( "#platilloM2 option:selected" ).text();
            var platilloMesa3 = $( "#platilloM3 option:selected" ).text();

            for(i=0; i<3; i++){
              for(j=0; j<8; j++){
                if(i==0){
                  var elemento = "#m" + (i+1) + "i" + (j+1);
                  nombresMesa1.push($(elemento).val());
                }
                else if(i==1){
                  var elemento = "#m" + (i+1) + "i" + (j+1);
                  nombresMesa2.push($(elemento).val());
                }
                else if(i==2){
                  var elemento = "#m" + (i+1) + "i" + (j+1);
                  nombresMesa3.push($(elemento).val());
                }
              }
            }


            //Validar fecha

              if( isNaN(fecha)){
                alert("Debes seleccionar una fecha");
              }
              else{
                  alert("Opcion seleccionada: " + tipoEvento  + " Fecha: " + dia + "/" + mes + "/" + año );   
                  fechaFormada = dia + "/" + mes + "/" + año;

                  DB.transaction(function(tran){
                      tran.executeSql('INSERT INTO EVENTOS (ID_USUARIO, NOMBRE_EVENTO, FECHA) VALUES ( "' + idUsuario +'", "' + tipoEvento + '", "' + fechaFormada + '");');
                      
                      //Insertar la distribucion del salon
//******************************************
                      for(i=0; i<3; i++){
                        for(j=0; j<3; j++){

                          posicion = "#m" + (i+1) + "" + (j+1);

                          e = $(posicion).children().attr('id')

                          if(e.includes("mesa")){

                            dish = "";

                            if(e=="mesa1")
                              dish = platilloMesa1;

                            else if(e=="mesa2")
                              dish = platilloMesa2;

                            else
                              dish = platilloMesa3;


                            tran.executeSql('INSERT INTO DISTRIBUCION (ID_EVENTO,ELEMENTO, POSICION, PLATILLO) VALUES ("'+ idEvento +'", "'+ e +'", "'+ posicion +'", "'+ dish + '");');
                          }

                          else
                            tran.executeSql('INSERT INTO DISTRIBUCION (ID_EVENTO,ELEMENTO, POSICION, PLATILLO) VALUES ("'+ idEvento +'", "'+ e +'", "'+ posicion +'", "'+ "--" +'");');

                        }
                      }

                      //Insertar el nombre de los invitados
                      for(i=0; i<3; i++){

                        for(j=0; j<8; j++){

                            if(i==0){ //Invitados Mesa 1
                              tran.executeSql('INSERT INTO INVITADOS (ID_EVENTO, MESA, NOMBRE_INVITADO) VALUES ("'+ idEvento +'", "'+ "mesa1" +'", "'+ nombresMesa1[j] +'") ;');
                            }
                            else if(i==1){
                              tran.executeSql('INSERT INTO INVITADOS (ID_EVENTO, MESA, NOMBRE_INVITADO) VALUES ("'+ idEvento +'", "'+ "mesa2" +'", "'+ nombresMesa2[j] +'") ;');
                            }
                            else if(i==2){
                              tran.executeSql('INSERT INTO INVITADOS (ID_EVENTO, MESA, NOMBRE_INVITADO) VALUES ("'+ idEvento +'", "'+ "mesa3" +'", "'+ nombresMesa3[j] +'");');
                            }
                        }

                      }

                      alert("EVENTO GUARDADO ");
                    });
              }
        });

        $('#mesa1').click(function(event){
            $("#modal1").modal()
        });

        $('#mesa2').click(function(event){
            $("#modal2").modal()
        });

        $('#mesa3').click(function(event){
            $("#modal3").modal()
        });


        });
    
function permitirDrop(event){
	event.preventDefault();
}

function dragStart(event){

	id = event.target.id;
	document.getElementById(id).classList.add("gelatina");
}


function drop(event){

	document.getElementById(id).classList.remove("gelatina");
    event.target.append(document.getElementById(id));

	var offset = event.dataTransfer.getData("text/plain").split(",");

    return false;
}


