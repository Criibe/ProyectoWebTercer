
var DB = null;


$(document).ready(function (){

        DB = openDatabase("proyectoWeb", '0.1', 'proyectoWeb', 20000);

        if(!DB){
            alert("No fue posible realizar la conexion");
        }

	    $('#botonRegistrarse').click(function registrar(event){

			var nombre = $('#nombre').val().toLowerCase();
			var correo = $('#correo').val().toLowerCase();
			var contraseña = $('#contrasenia').val().toLowerCase();
					
            if(nombre != "" && correo != "" && contraseña != "" && !nombre.includes(";") && !contraseña.includes(";") && !correo.includes(";") && !nombre.includes("OR") && !correo.includes("OR") && !contraseña.includes("OR")){

    			DB.transaction(function(tran){

                    //Verificar que el usuario no este registrado anteriormente
                    tran.executeSql('SELECT * FROM USUARIO WHERE CORREO = "' + correo + '";', [], function(tran, data){
                    
                    //Si no existe el correo
                    if (data.rows.length == 0){
                        tran.executeSql('INSERT INTO USUARIO (NOMBRE, CORREO, CONTRASENIA) VALUES ("' + nombre + '", "' + correo + '", " ' + contraseña +'")');
                        window.location.href = "login.html";
                    }

                    else alert("Este correo ya está siendo usado");
                

                });
            	});

                
                }
		
		});

	}
);





