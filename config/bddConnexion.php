<?php 
session_start();
require '../config/Bdd.php';
$BddLocalHost = new Bdd;
$bdd = $BddLocalHost->importBdd();

if(!empty($_POST))
{
    $email = htmlspecialchars($_POST['email']);
    $password = sha1($_POST['password']);

    $recupInfos = $bdd->prepare("SELECT id, username, email FROM membres WHERE email=? and password=?");
    $recupInfos->execute(array($email, $password));
    $verifyRecupInfos = $recupInfos->rowCount();
    
    if($verifyRecupInfos === 1)
    {
        $fetchRecupInfos = $recupInfos->fetch();
        $_SESSION['id'] = $fetchRecupInfos["id"];
        $_SESSION['email'] = $fetchRecupInfos["email"];
        $_SESSION['username'] = $fetchRecupInfos["username"];
        var_dump($fetchRecupInfos);
        
        header('Location: ../pages/app.php');
        

    }
    else
    {
        $erreur = "Email ou mot de passe incorect";
    }
}

?>