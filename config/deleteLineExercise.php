<?php 
session_start();
require_once('../model/Exercise.php');

//Recuperer toute les sessions du jours

$exercice = new Exercise;
$deleteExercise = $exercice->deleteDayExercice();  
