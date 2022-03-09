<?php
class Bdd {
    private static $instance = null;

    public static function importBdd() : PDO{
        if(self::$instance === null){
            self::$instance = new PDO("mysql:host=127.0.0.1;dbname=muscuprogress", "root", "", [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        }
        
        return  self::$instance;

    }
}
?>