$(document).ready(function cargarBase() {

        DB = openDatabase("proyectoWeb", '0.1', 'proyectoWeb', 20000);

        if(!DB){
            alert("No fue posible realizar la conexion");
        }
        else{
            DB.transaction(function(tran){

              
                tran.executeSql('CREATE TABLE IF NOT EXISTS  "USUARIO" (`NOMBRE`    TEXT,`CORREO`   TEXT, `CONTRASENIA` TEXT );');
                tran.executeSql('CREATE TABLE IF NOT EXISTS  `INVITADOS` (`ID_EVENTO`   INTEGER,`MESA`  TEXT,`NOMBRE_INVITADO`  TEXT);');
                tran.executeSql('CREATE TABLE IF NOT EXISTS  "EVENTOS" (`ID_USUARIO`    INTEGER, `NOMBRE_EVENTO` TEXT,`FECHA`    TEXT);');
                tran.executeSql('CREATE TABLE IF NOT EXISTS  `DISTRIBUCION` (`ID_EVENTO`    INTEGER,`ELEMENTO`  TEXT,`POSICION` TEXT,`PLATILLO` TEXT);');
                

                /*
                tran.executeSql("DROP TABLE USUARIO;");
                tran.executeSql("DROP TABLE INVITADOS;");
                tran.executeSql("DROP TABLE EVENTOS;");
                tran.executeSql("DROP TABLE DISTRIBUCION;");
                */
                


            });
        }


        $('#botonLogin').click(function(event){

            var correo = $('#correo').val().toLowerCase() ;
            var contraseña = $('#contrasenia').val().toLowerCase();
            var psw = null;
            var idUsuario;

            if(correo != "" && contraseña != ""){


                DB.transaction(function(tran){
                               
                    tran.executeSql('SELECT rowid, * FROM USUARIO WHERE CORREO = "' + correo + '";', [], function(tran, data){

                        for( i=0; i<data.rows.length; i++){
                            psw = data.rows[i].CONTRASENIA.substring(1,data.rows[i].CONTRASENIA.length);
                            idUsuario = data.rows[i].rowid;
                        }



                          if(psw != null){
                                    if(contraseña == psw){

                                        /*var campos = $(":input" ).serializeArray();
                                        jQuery.each( campos, function( i, field ) {
                                          alert("Fiedl: " + field.value);
                                        });

                                        $.post('reservaciones.html', campos, function (){
                                            
                                        });*/


                                        window.location.href = "reservaciones.html" + '#' + idUsuario;
                                    }
                           }else alert("Usuario o contraseña incorrectos");
                    


                      
                    });
            
                });
            }else{
                alert("Debes llenar todos los campos");
            }


            

        });

});
