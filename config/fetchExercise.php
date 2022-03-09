<?php 
session_start();
require_once('../model/Exercise.php');

//Recuperer toute les sessions du jours

$exercice = new Exercise;
// créer variable date
// Rajouter un input avec name=id 
date_default_timezone_set('Europe/Amsterdam');
$date = date('d.m.Y'); 
$fetchExercice = $exercice->recupDaySession($_GET['id'], $date);  

echo json_encode($fetchExercice);