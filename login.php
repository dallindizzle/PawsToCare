<?php

session_start();

if (isset($_POST['submit'])) {
    require_once('connectDB.php');

    $uid = mysqli_real_escape_string($conn, $_POST['uid']);
    $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);

    //Error handlers
    //Check if inputs are empty
    if (empty($uid) || empty($pwd)) {
        header("Location: /PawstoCare/index.php?login=empty");
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE name = '$uid'";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            header("Location: /PawstoCare/index.php?login=empty");
            exit();
        }
        $resultCheck = mysqli_num_rows($result);
        if ($resultCheck < 1) {
            header("Location: /PawstoCare/index.php?login=error");
            exit();
        } else {
            if ($row = mysqli_fetch_assoc($result)) {
                if ($pwd != $row['pass']) {
                    header("Location: /PawstoCare/index.php?login=error");
                    exit();
                } elseif ($pwd == $row['pass']) {
                    //Log in the user
                    $_SESSION['name'] = $row['name'];
                    $_SESSION['pass'] = $row['pass'];
                    $_SESSION['ownersFk'] = $row['ownersFk'];
                    header("Location: /PawstoCare/index.php?login=success");
                    exit();
                }
            }
        }
    }

} else {
    header("Location: /PawstoCare/index.php?login=error");
    exit();
}