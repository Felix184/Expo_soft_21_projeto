function mostrarOcultarSenha(){
    var senha = document.getElementById("pwd");
    
    if(senha.type == "password"){
        senha.type = "text";
       
    }else{
        senha.type = "password";
    }

    var senha2 = document.getElementById("pwd2");
    if(senha2.type == "password"){
        senha2.type = "text";
    }else{
        senha2.type = "password";
    }

   // var senha3 = document.getElementById("pw3");
    
   // if(senha3.type == "password"){
   //     senha3.type = "text";
   //    
   // }else{
   //     senha3.type = "password";
   // }
  

    
}
//a senha do Login esta sendo revelada as nao ocultada

