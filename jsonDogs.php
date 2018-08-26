<?php

require_once('connectDB.php');

$query = "SELECT * FROM dogs ORDER BY name";

$response = @mysqli_query($conn, $query);

if ($response){

    $dogs = array();

    while($row = mysqli_fetch_array($response)) {
        $obj = new stdClass();
        $obj->name = $row['name'];
        $obj->breed = $row['breed'];
        $obj->sex = $row['sex'];
        $obj->shots = $row['shots'];
        $obj->licensed = $row['licensed'];
        $obj->neutered = $row['neutered'];
        $obj->date = $row['birthdate'];
        $obj->weight = $row['weight'];

        array_push($dogs, $obj);
    }
    $myJson = json_encode($dogs);
    echo $myJson;

}