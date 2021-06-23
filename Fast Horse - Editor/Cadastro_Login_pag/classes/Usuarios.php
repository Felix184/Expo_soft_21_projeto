<!------------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor
Descrição: .

Autores:

Turma: 2TID
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                             Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10

Altores externos: 
(Processamento do Cadastro e login e parte do CSS) -> Miriam TechCod: 
https://www.youtube.com/watch?v=et-j0z-tbk4&list=PLYGFJHWj9BYq5zosbRaY7XM5vM0ISLkWS
--------------------------------------------------------------------------------------------------------->

<?php
    Class Usuario{
        //para conectar com a base de dados precisamos de ao menos quatro paremetros exigidos para conectar o "pdo"
        public $pdo; 
        public $msgErro = "";//tudo ok
        public function conectar($nome, $host, $usuario, $senha){ //parametros exigidos
            global $pdo;
            global $msgErro;
            try{
                $pdo = new PDO("mysql:dbname=".$nome.";host=".$host,$usuario,$senha);

            } catch (PDOException $e){
                $msgErro = $e->getMessage();
            }
            
        }
        public function cadastrar($nome, $email, $senha){
            global $pdo;
            
            $sql = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE email = :e"); //Verificar se há cadastro, buscando pelo id no bd
            
            $sql->bindValue(":e",$email);
            $sql->execute();
            
            if($sql->rowCount() > 0){   //se o numero de linhas for maior que zero, então esse pessoa já está cadastrada
                
                return false; //já está cadastrada

            } else {    //Caso não,cadastra
                $sql = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUE (:n, :e, :s)");

                $sql->bindValue(":n",$nome);
                $sql->bindValue(":e",$email);
                $sql->bindValue(":s",md5($senha)); //"md5" Criptografa a senha
                $sql->execute();
                return true;
            } 
        }
        public function logar($email, $senha){
            global $pdo;

            //verificar se o email e senha estao cadastrados, se sim:
            $sql = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE email = :e AND senha = :s");
            $sql->bindValue(":e",$email);
            $sql->bindValue(":s",md5($senha));
            $sql->execute();

            if($sql->rowCount() > 0){
                //entrar no sistema (sessao):
                $dado = $sql->fetch(); //"fetch" transforma as informações do BD em um array
                session_start();
                $_SESSION['id_usuario'] = $dado['id_usuario'];
                return true; //logado com sucesso
            }else{
                return false; //erro no login
            }
        }
    }

?>