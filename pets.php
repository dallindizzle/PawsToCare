<?php
    include_once 'nav.php';
?>

<div class="container">
<?php
    $name = $_SESSION['name'];
    require_once('connectDB.php');

    $query = "SELECT cats.name, cats.breed, cats.sex, cats.shots, cats.declawed, cats.neutered, cats.birthdate FROM cats INNER JOIN catsowners on catsowners.catsFk = cats.id INNER JOIN owners ON owners.id = catsowners.ownersFk WHERE owners.fname = '$name';";

    $response = @mysqli_query($conn, $query);

    if ($response && mysqli_num_rows($response) != 0) {
        echo '<h3 class="my-4 text-center">Cats</h3>';
        echo '<table class="table table-bordered">';
        echo '<thead><tr><th>Name</th><th>Breed</th><th>Sex</th><th>Shots</th><th>Declawed</th><th>Neutered</th><th title="In months">Age</th></tr></thead>';

        while ($row = mysqli_fetch_array($response)) {

            $today = new DateTime();
            $birthdate = new DateTime($row['birthdate']);
            $interval = $today->diff($birthdate);
            $age = $interval->format('%m');

            echo '<tr><td>' . $row['name'] . '</td><td>' . $row['breed'] . '</td><td>' . $row['sex'] . '</td><td>' . ($row['shots'] ? '&#10004' : '&#10060') . '</td><td>' . ($row['declawed'] ? '&#10004' : '&#10060') . '</td><td>' . ($row['neutered'] ? '&#10004' : '&#10060') . '</td><td>' . $age . '</td></tr>';
        }
        echo '</table>';
    }

    $query = "SELECT dogs.name, dogs.breed, dogs.sex, dogs.shots, dogs.licensed, dogs.neutered, dogs.birthdate, dogs.weight FROM dogs INNER JOIN dogsowners on dogsowners.dogsFk = dogs.id INNER JOIN owners ON owners.id = dogsowners.ownersFk WHERE owners.fname = '$name';";

    $response = @mysqli_query($conn, $query);

    if ($response && mysqli_num_rows($response) != 0) {
        echo '<h3 class=" my-4 text-center">Dogs</h3>';
        echo '<table class="table table-bordered">';
        echo '<thead><tr><th>Name</th><th>Breed</th><th>Sex</th><th>Shots</th><th>Licensed</th><th>Neutered</th><th title="In months">Age</th><th>Weight</th></tr></thead>';
        while ($row = mysqli_fetch_array($response)) {

            $weight;
            if ($row['weight'] < 20) $weight = 'S';
            else if ($row['weight'] < 50) $weight = 'M';
            else if ($row['weight'] < 100) $weight = 'L';
            else if ($row['weight'] >= 100) $weight = 'G';

            $today = new DateTime();
            $birthdate = new DateTime($row['birthdate']);
            $interval = $today->diff($birthdate);
            $age = $interval->format('%m');

            echo '<tr><td>' . $row['name'] . '</td><td>' . $row['breed'] . '</td><td>' . $row['sex'] . '</td><td>' . ($row['shots'] ? '&#10004' : '&#10060') . '</td><td>' . ($row['licensed'] ? '&#10004' : '&#10060') . '</td><td>' . ($row['neutered'] ? '&#10004' : '&#10060') . '</td><td>' . $age . '</td><td>' . $weight . '</td></tr>';
        }
        echo '</table>';
    }

    $query = "SELECT exotics.name, exotics.species, exotics.sex, exotics.neutered, exotics.birthdate FROM exotics INNER JOIN exoticsowners on exoticsowners.exoticsFk = exotics.id INNER JOIN owners ON owners.id = exoticsowners.ownersFk WHERE owners.fname = '$name';";

    $response = @mysqli_query($conn, $query);

    if ($response && mysqli_num_rows($response) != 0) {
        echo '<h3 class="my-4 text-center">Exotics</h3>';
        echo '<table class="table table-bordered">';
        echo '<thead><tr><th>Name</th><th>Species</th><th>Sex</th><th>Neutered</th><th title="In months">Age</th></tr></thead>';
        while ($row = mysqli_fetch_array($response)) {

            $today = new DateTime();
            $birthdate = new DateTime($row['birthdate']);
            $interval = $today->diff($birthdate);
            $age = $interval->format('%m');

            echo '<tr><td>' . $row['name'] . '</td><td>' . $row['species'] . '</td><td>' . $row['sex'] . '</td><td>' . ($row['neutered'] ? '&#10004' : '&#10060') . '</td><td>' . $age . '</td></tr>';
        }
        echo '</table>';
    }
?>
</div>