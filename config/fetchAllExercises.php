<?php
session_start();
require_once('../model/Exercise.php');

$exercice = new Exercise;

$fetchAllExercises = $exercice->recupAllChoiseExercise();  

echo json_encode($fetchAllExercises);
?>