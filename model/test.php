<?php
session_start();
require('Exercise.php');

$test = new Exercise;
$test2 = $test->recupDaySession();

echo json_encode($test2);
?>