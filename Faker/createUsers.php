<?php

$dbHost = "localhost:3306";
$dbUserName = "root";
$dbPassword = "Lovemelissa1!";
$dbName = "pets";

$conn = @mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName)
or die('Could not connect to MySQL '.
    mysqli_connect_error());

$sql = 'SELECT * FROM owners;';

$result = mysqli_query($conn, $sql);

if ($result) {
    while ($row = mysqli_fetch_array($result)) {
        $name = $row['fname'];
        $pass = $row['lname'];
        $ownersFk = $row['id'];
        $sql = "INSERT INTO users VALUES('$name', '$pass', $ownersFk);";
        if ($conn->query($sql) == TRUE) {
            echo "New Record created successfully";
        } else {
            echo "<br> Error: " .$sql ."<br>" . $conn->error;
        }
    }
}
