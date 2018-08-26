<?php
$dbHost = "localhost:3306";
$dbUserName = "root";
$dbPassword = "Lovemelissa1!";
$dbName = "pets";

$conn = @mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName)
or die('Could not connect to MySQL '.
    mysqli_connect_error());

$name = $_GET['name'];
$breed = $_GET['breed'];
$sex = $_GET['sex'];
$shots = $_GET['shots'];
$licensed = $_GET['licensed'];
$neutered = $_GET['neutered'];
$date = $_GET['date'];
$weight = $_GET['weight'];

echo $name .  " " . $breed .  " " . $sex . " " . $shots . " " . $licensed . " " . $neutered . " " . $date . " " . $weight;

$sql = "INSERT INTO dogs VALUES(NULL, '$name', '$breed', '$sex', $shots, $licensed, $neutered, '$date', $weight);";

if ($conn->query($sql) == TRUE) {
    echo "New Record created successfully";
} else {
    echo "<br> Error: " .$sql ."<br>" . $conn->error;
}
$conn->close();