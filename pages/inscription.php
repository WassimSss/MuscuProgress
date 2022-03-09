<?php
require '../config/bddInscription.php';
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <title>MuscuProgress - Inscription</title>
</head>
<body>
    <nav class="nav_signup nav_form">
        <ul>
            <div class="nav_left">
                <li><a href="../index.php"><img class="img_logo" src="../image/dumbbell.png"></a></li>
                <li><a href="../index.php">MuscuProgress</a></li>
            </div>

            <div class="nav_right">
                <li><a class="link_signin" href="connexion.php">Connexion</a></li>   
                <li><a class="link_signup" href="inscription.php">Inscription</a></li>
            </div>
        </ul>
    </nav>

    <section class="section_before_form signup_form">
        <div class="section_before_form_title">
            <h2>Créer un compte<span class="red">.</span></h2>      
            <p>Vous avez un compte ? <a href="connexion.php">Connexion</a></p>
        </div>

        <form class="form_test" method="post">
            <div class="duo_label">
                <div class="input_and_label">
                    <input type="text" name="username" id="username">
                    <label for="username" id="label_username">Pseudo</label>
                </div>

                <div class="input_and_label">
                    <input type="email" name="email" id="email">
                    <label for="email" id="label_email">Email</label>
                </div>
            </div>

            <div class="input_and_label signup_div">
                <input type="password" name="password" id="password">
                <label for="password" id="label_password">Mot de passe</label>
            </div>

            <ul class="password_conditions">
                <div>
                    <li class="verify_between">Entre 6 et 20 caractères</li>
                    <li class="verify_uppercase">Minimum une majuscule</li>
                </div>
                <div>
                    <li class="verify_lowercase">Minimum une minuscule</li>
                    <li class="verify_number">Minimum un chiffre</li>
                </div>
            </ul>
            
            <div class="input_and_label signup_div">
                <input type="password" name="confirm_password" id="confirm_password">
                <label for="confirm_password" id="label_confirm_password">Confirmation mot de passe</label>
            </div>

            <div class="submit_div">
                <input type="submit" name="submit_signup" id="submit_signup" class="submit_style" value="Inscription">
            </div>
            
        </form>
    </section>

    <?php if(isset($erreur)){echo $erreur;} ?>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/form_js.js"></script>
</body>
</html>