<?php
$dbHost = "localhost:3306";
$dbUserName = "root";
$dbPassword = "Lovemelissa1!";
$dbName = "pets";

$conn = @mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName)
or die('Could not connect to MySQL '.
    mysqli_connect_error());

$catsFk = $_GET['catsFk'];
$ownersFk = $_GET['ownersFk'];

$sql = "INSERT INTO exoticsowners VALUES(NULL, $catsFk, $ownersFk);";

if ($conn->query($sql) == TRUE) {
    echo "New Record created successfully";
} else {
    echo "<br> Error: " .$sql ."<br>" . $conn->error;
}
$conn->close();