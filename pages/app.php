<?php
session_start();
if (isset($_SESSION['username']) && isset($_SESSION['email'])) {
    require '../model/Exercise.php'

?>

    <!DOCTYPE html>
    <html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../style.css">
        <title>App</title>
    </head>

    <body>

        <nav class="nav_app">
            <ul>
                <div class="nav_left">
                    <li><a href="../index.php"><img class="img_logo" src="../image/dumbbell.png"></a></li>
                    <li><a href="../index.php">MuscuProgress</a></li>
                </div>

                <div class="nav_mid">
                    <li><a class="link_signin" href="connexion.php">Exercice</a></li>
                    <li><a class="link_signup" href="inscription.php">Statistique</a></li>
                </div>

                <div class="nav_right">
                    <li><a href="deconnexion.php">Deconnexion</a></li>
                </div>
            </ul>
        </nav>

        <div class="all_app">

            <section class="day_session_and_recap">
                <section class="day_session">
                    <!-- <p><span class="red">Séance</span> du jour</p> -->

                    <div>
                        <form class="form_day_session" method="POST">

                            <div class="label_center">
                                <h2><span class="red">Séance</span> du jour</h2>

                                <div class="label_and_select">
                                    <label for="choise_muscle">Muscle</label>
                                    <?php
                                    $exercise = new Exercise;
                                    $allMuscle = $exercise->recupAllChoiseMuscle();
                                    ?>
                                    <select name="muscles" id="choise_muscle">
                                        <option value="" selected="selected">--Choisissez un muscle--</option>
                                        <?php
                                        foreach ($allMuscle as $key => $value) {
                                            $value = $allMuscle[$key]["muscle"];
                                            $nameUnbreakable = preg_replace('/\s+/', '_', $value);/* /\s+/ pour trouver les espaces*/
                                        ?>
                                            <option value=<?= $nameUnbreakable ?>><?= $value ?></option>
                                        <?php } ?>
                                    </select>
                                </div>



                                <!-- <div class="input_and_label">
                                <input type="text" name="choise_exercise" id="choise_exercise">
                                <label for="choise_exercise" id="choise_exercise">Exercice *</label>
                                <ion-icon name="add-outline" class="more_logo" id="add_exercise_button"></ion-icon>
                            </div> -->
                                <div class="label_and_select">
                                    <label for="choise_exercise">Exercice</label>
                                    <select name="exercises" id="choise_exercise">
                                        <option value="">--Choisissez un exercice--</option>

                                    </select>
                                </div>

                                <div class="input_and_label">
                                    <input type="text" name="choise_weight" id="choise_weight">
                                    <label for="choise_weight" id="choise_weight">Poids</label>
                                    <!-- <ion-icon name="add-outline" class="more_logo" id="add_weight_button"></ion-icon> -->
                                </div>

                                <div class="input_and_label">
                                    <input type="text" name="choise_repetition" id="choise_repetition">
                                    <input type="hidden" name="id" value="<?= $_SESSION['id'] ?>" id="id_user"> <!-- SECURISER SESSION ID IL PEUT ETRE MODIFIER PAR INSPECTER -->
                                    <label for="choise_repetition" id="choise_repetition">Répétitions</label>
                                    <!-- <ion-icon name="add-outline" class="more_logo" id="add__repetition_button"></ion-icon> -->
                                </div>

                                <button id="submit_day_session" class="submit_style" value="Ajouter">Ajouter</button>

                            </div>
                        </form>
                    </div>

                </section>

                <section class="day_recap">
                    <div class="all_contain">
                        <h2><span class="red">Programme</span> du jour</h2>

                        <div class="all_for_muscle">

                        </div>
                    </div>
                </section>

            </section>

            <section class="session_calendar">
                <div class="calendar">
                    <?php
                    for ($i = 0; $i < 7 * 6; $i++) { ?>
                        <div class="calendar_child">
                            <p><?= $i ?></p>
                        </div>
                    <?php } ?>
                </div>
            </section>

            <div class="weight">
                <section class="weight_last_week">
                    <p>Semaine <span class="red">derniere</span></p>
                    <div class="box_weight">
                        <p>57,8 <span class="red">kg</span></p>
                    </div>
                </section>

                <!-- <section class="weight_this_week">
            <p>Cette <span class="red">semaine</span></p>
            <div class="box_weight">
                <p>59,2 <span class="red">kg</span></p>
            </div>
        </section> -->
            </div>
        </div>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        <script src="../js/app.js"></script>

    </body>

    </html>



<?php } else {
    echo "Veuillez vous connectez";
}


?>