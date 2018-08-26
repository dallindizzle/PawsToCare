<?php
    session_start();
?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
    <link rel="stylesheet" href="css/clickable.css">

    <title>Paws to Care</title>
  </head>
  <body>
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a href="index.php" class="navbar-brand">Paws to Care</a>

        <?php
            if (isset($_SESSION['name'])) {
                if ($_SESSION['name'] == 'Admin') {
                    echo    ' <ul class="navbar-nav">
                            <li class="nav-item mx-2"><span class="navbar-text text-success">' . $_SESSION['name'] .'</span></li>
                            <form class="form-inline" action="logout.php" method="POST">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" name="submit">Logout</button>
                            </form>
                            <li class="nav-item">
                            <a href="about.php" class="nav-link">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.php" class="nav-link">Contact Us</a>
                        </li>           
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Animals
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="cats-info.php">Cats</a>
                            <a class="dropdown-item" href="dogs-info.php">Dogs</a>
                            <a class="dropdown-item" href="exotics-info.php">Exotics</a>
                            </div>
                        </li>
                        <li class="nav-item">
                          <a href="owners-info.php" class="nav-link">Owners</a>
                        </li>  
                        </ul>';
                } else {
                    echo ' <ul class="navbar-nav">
                            <li class="nav-item mx-2"><span class="navbar-text text-success">' . $_SESSION['name'] .'</span></li>
                            <form class="form-inline" action="logout.php" method="POST">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" name="submit">Logout</button>
                            </form>
                            <li class="nav-item">
                            <a href="about.php" class="nav-link">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.php" class="nav-link">Contact Us</a>
                        </li>
                        <li class="nav-item">
                        <a href="pets.php" class="nav-link">My Pets</a>
                      </li>' ;

                }
            } else {
                echo '      <ul class="navbar-nav">
                            <form class="form-inline" action="login.php" method="POST">
                            <input class="form-control mr-sm-2" type="text" name="uid" placeholder="Username" aria-label="Username">
                            <input class="form-control mr-sm-2" type="password" name="pwd" placeholder="Password" aria-label="Password">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" name="submit">Login</button>
                            </form>
                            <li class="nav-item">
                            <a href="about.php" class="nav-link">About</a>
                            </li>
                            <li class="nav-item">
                            <a href="contact.php" class="nav-link">Contact Us</a>
                            </li>';
            }
        ?>

        <!-- <ul class="navbar-nav">
          <form class="form-inline" action="login.php" method="POST">
            <input class="form-control mr-sm-2" type="text" name="uid" placeholder="Username" aria-label="Username">
            <input class="form-control mr-sm-2" type="password" name="pwd" placeholder="Password" aria-label="Password">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" name="submit">Login</button>
          </form>
          <li class="nav-item">
            <a href="about.html" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="contact.html" class="nav-link">Contact Us</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Animals
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="cats-info.html">Cats</a>
              <a class="dropdown-item" href="dogs-info.html">Dogs</a>
              <a class="dropdown-item" href="exotics-info.html">Exotics</a>
            </div>
          </li>
        </ul> -->
      </div>
    </nav>