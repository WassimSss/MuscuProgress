<?php 
session_start();
require_once('../model/Exercise.php');

$exercice = new Exercise;

$fetchAllMuscle = $exercice->recupAllChoiseMuscle();  

echo json_encode($fetchAllMuscle);
?>