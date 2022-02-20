<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <title>MuscuProgress - Connexion</title>
</head>
<body>
    <nav class="nav_signin nav_form">
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

    <section class="section_before_form signin_form">
        <div class="section_before_form_title">
            <h2>Se connecter<span class="red">.</span></h2>      
            <p>Vous n'avez pas de compte ? <a href="connexion.php">Inscription</a></p>
        </div>

        <form class="form_test signin_form" method="post">
                <div class="input_and_label signin_div">
                    <input type="email" name="email" id="email">
                    <label for="email" id="label_email">Email</label>
                </div>
            
            <div class="input_and_label signin_div">
                <input type="password" name="password" id="password">
                <label for="password" id="label_confirm_password">Mot de passe</label>
            </div>

            <div class="submit_div">
                <input type="submit" name="submit_signin" id="submit_signin" class="submit_style" value="Connexion">
            </div>
            
        </form>
    </section>

</body>
</html>