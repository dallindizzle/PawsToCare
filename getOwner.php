<?php

require_once('connectDB.php');

$name = $_GET['name'];
$table = $_GET['table'];

if ($table == 'cats') {
    $query = "SELECT owners.fname, owners.lname FROM cats inner join catsowners on catsowners.catsFk = cats.id inner join owners on owners.id = catsowners.ownersFk WHERE cats.name = '$name';";
} else if ($table == 'dogs') {
    $query = "SELECT owners.fname, owners.lname FROM dogs inner join dogsowners on dogsowners.dogsFk = dogs.id inner join owners on owners.id = dogsowners.ownersFk WHERE dogs.name = '$name';";
} else if ($table == 'exotics') {
    $query = "SELECT owners.fname, owners.lname FROM exotics inner join exoticsowners on exoticsowners.exoticsFk = exotics.id inner join owners on owners.id = exoticsowners.ownersFk WHERE exotics.name = '$name';";
}
$response = @mysqli_query($conn, $query);

if ($response){

    $cats = array();

    while($row = mysqli_fetch_array($response)) {
        $obj = new stdClass();
        $obj->fname = $row['fname'];
        $obj->lname = $row['lname'];

        array_push($cats, $obj);
    }
    $myJson = json_encode($cats);
    echo $myJson;

}