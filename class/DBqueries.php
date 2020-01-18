<?php 
require_once "./class/DBconnect.php";

class DBqueries{

    public static function getData(){
        $db = DBconnect::getInstance(); 
        $statement = $db->prepare("SELECT title, content FROM collection");
        $statement->execute();
       
        return $statement->fetchAll();
    }
}


?>