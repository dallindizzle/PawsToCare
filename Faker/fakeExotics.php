<?php
$dbHost = "localhost:3306";
$dbUserName = "root";
$dbPassword = "Lovemelissa1!";
$dbName = "pets";

$conn = @mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName)
or die('Could not connect to MySQL '.
    mysqli_connect_error());

$name = $_GET['name'];
$species = $_GET['species'];
$sex = $_GET['sex'];
$neutered = $_GET['neutered'];
$date = $_GET['date'];

echo $name .  " " . $species .  " " . $sex . " " . $neutered . " " . $date;

$sql = "INSERT INTO exotics VALUES(NULL, '$name', '$species', '$sex', $neutered, '$date');";

if ($conn->query($sql) == TRUE) {
    echo "New Record created successfully";
} else {
    echo "<br> Error: " .$sql ."<br>" . $conn->error;
}
$conn->close();