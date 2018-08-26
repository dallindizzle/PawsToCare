<?php

require_once('connectDB.php');

$query = "SELECT * FROM cats ORDER BY cats.name;";

$response = @mysqli_query($conn, $query);

if ($response){

    $cats = array();

    while($row = mysqli_fetch_array($response)) {
        $obj = new stdClass();
        $obj->name = $row['name'];
        $obj->breed = $row['breed'];
        $obj->sex = $row['sex'];
        $obj->shots = $row['shots'];
        $obj->declawed = $row['declawed'];
        $obj->neutered = $row['neutered'];
        $obj->birthdate = $row['birthdate'];

        array_push($cats, $obj);
    }
    $myJson = json_encode($cats);
    echo $myJson;

}