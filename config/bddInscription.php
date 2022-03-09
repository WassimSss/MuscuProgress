<?php
require '../config/Bdd.php';
$BddLocalHost = new Bdd;
$bdd = $BddLocalHost->importBdd();

// var_dump($_POST);

if(isset($_POST['submit_signup'])) 
{
    if(!empty($_POST['username']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['confirm_password']))
    {
        $username = htmlspecialchars($_POST['username']);
        $email = htmlspecialchars($_POST['email']);
        $password = sha1($_POST['password']);
        $confirm_password = sha1($_POST['confirm_password']);


        if(preg_match("/^[a-zA-Z]{4,20}+$/", $username) === 1) //only letters, between 4 and 20
        {

            if(filter_var($email, FILTER_VALIDATE_EMAIL))
            {

                if (preg_match("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.).{6,20}$/", $_POST['password'])) //Entre 6 & 20 minuscule maj chiffre obligation [a-zA-Z0-9]
                {

                    if($password === $confirm_password)
                    {
                        $erreur = "OK";

                        $addMember = $bdd->prepare("INSERT INTO membres (username, email, password) VALUES (?, ?, ?)");
                        $addMember->execute(array($username, $email, $password));

                        $erreur = "Compte créer !";
                    }
                    else
                    {
                        $erreur = "Mot de passe pas pareil";
                    }
                }
                else
                {
                    $erreur = "Votre mot de passe doit .." ;
                }


            }
            else
            {
                $erreur = "Votre email n'est pas bon";    
            }
        }
        else
        {
            $erreur = "Votre pseudo doit contenir entre 4 et 20 lettres";
        }
    }
    else
    {
        $erreur = "Veuillez remplir tout les champs";
    }

}
?>
