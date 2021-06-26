/*------------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor
Descrição: Script para ocultar e mostrar a senha das páginas de cadastro / login.

Autores:

Turma: 2TID
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                             Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10                                                                                   
                                                                                                                              
Altores externos:                                                                                                            
(Ocultar/Exibir) -> Bruno P. Campos:                                                                                         
https://www.youtube.com/watch?v=DR-jyJTIB2E                                                                                                                                                                                                             '
--------------------------------------------------------------------------------------------------------*/
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
}
