<?php
$dbHost = "localhost:3306";
$dbUserName = "root";
$dbPassword = "Lovemelissa1!";
$dbName = "pets";

$conn = @mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName)
or die('Could not connect to MySQL '.
    mysqli_connect_error());

$fname = $_GET['first'];
$lname = $_GET['last'];
$add1 = $_GET['add1'];
$add2 = $_GET['add2'];
$city = $_GET['city'];
$st = $_GET['state'];
$zip = $_GET['zip'];

$sql = "INSERT INTO owners VALUES(NULL, '$fname', '$lname', '$add1', '$add2', '$city', '$st', '$zip', TRUE);";

if ($conn->query($sql) == TRUE) {
    echo "New Record created successfully";
} else {
    echo "<br> Error: " .$sql ."<br>" . $conn->error;
}
$conn->close();