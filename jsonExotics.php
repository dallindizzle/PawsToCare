<?php

require_once('connectDB.php');

$query = "SELECT * FROM exotics ORDER BY name";

$response = @mysqli_query($conn, $query);

if ($response){

    $exotics = array();

    while($row = mysqli_fetch_array($response)) {
        $obj = new stdClass();
        $obj->name = $row['name'];
        $obj->species = $row['species'];
        $obj->sex = $row['sex'];
        $obj->neutered = $row['neutered'];
        $obj->date = $row['birthdate'];

        array_push($exotics, $obj);
    }
    $myJson = json_encode($exotics);
    echo $myJson;

}