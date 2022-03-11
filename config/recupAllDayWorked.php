
<?php
session_start();
require_once('../model/Exercise.php');

$exercice = new Exercise;

$fetchAllDayWorked = $exercice->recupAllDayWorkForUser();  

echo json_encode($fetchAllDayWorked);
?>