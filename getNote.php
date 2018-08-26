<?php

require_once('connectDB.php');

$name = $_GET['name'];
$table = $_GET['table'];

if ($table == 'cats') {
    $query = "SELECT catnotes.vetName, catnotes.date, catnotes.note FROM cats INNER JOIN catnotes ON catnotes.catsFk = cats.id WHERE cats.name = '$name';";
} else if ($table == 'dogs') {
    $query = "SELECT dognotes.vetName, dognotes.date, dognotes.note FROM dogs INNER JOIN dognotes ON dognotes.dogsFk = dogs.id WHERE dogs.name = '$name';";
} else if ($table == 'exotics') {
    $query = "SELECT exoticnotes.vetName, exoticnotes.date, exoticnotes.note FROM exotics INNER JOIN exoticnotes ON exoticnotes.exoticsFk = exotics.id WHERE exotics.name = '$name';";
}
$response = @mysqli_query($conn, $query);

if ($response){

    $cats = array();

    while($row = mysqli_fetch_array($response)) {
        $obj = new stdClass();
        $obj->vetName = $row['vetName'];
        //$obj->date = $row['date'];
        $obj->date = substr($row['date'], 0, 10);
        $obj->note = $row['note'];

        array_push($cats, $obj);
    }
    $myJson = json_encode($cats);
    echo $myJson;

}