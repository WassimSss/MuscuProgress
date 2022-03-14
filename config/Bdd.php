<?php
class Bdd {
    private static $instance = null;

    public static function importBdd() : PDO{
        if(self::$instance === null){
                self::$instance = new PDO("mysql:host=127.1.0.0;dbname=muscuprogress", "root", "", [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]); 
        }
        
        return  self::$instance;
    }
}

//self::$instance = new PDO("mysql:host=127.1.0.0;dbname=muscuprogress", "root", "", [
//self::$instance = new PDO("mysql:host=mysql-wassilmi.alwaysdata.net;dbname=wassilmi_muscuprogress", "wassilmi", "rVxXMSWzpk7d8Xp", [
?>