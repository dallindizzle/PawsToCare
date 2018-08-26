<?php

require_once('connectDB.php');


if(isset($_GET['order'])) {
    $order = $_GET['order'];
} else {
    $order = 'fname';
}

if(isset($_GET['sort'])) {
    $sort = $_GET['sort'];
} else {
    $sort = 'DESC';
}

if (!isset($_GET['page'])) {
    $page = 1;
} else {
    $page = $_GET['page'];
}


$results_per_page = 10;

$sql = 'SELECT * FROM owners ORDER BY fname;';

$result = mysqli_query($conn, $sql);

$number_of_results = mysqli_num_rows($result);

$number_of_pages = ceil($number_of_results/$results_per_page);

$this_page_first_result = ($page - 1)*$results_per_page;

$sql = "SELECT * FROM owners ORDER BY $order $sort LIMIT " . $this_page_first_result . ',' . $results_per_page;
$result = mysqli_query($conn, $sql);

$sort == 'DESC' ? $sort = 'ASC' : $sort = 'DESC';

echo   "<div class='container'><table class='table table-bordered table-hover'>
            <thead>
                <tr id='headers'>
                    <th scope='col' id='Fname'><a href='?order=fname&&sort=$sort'>First Name</a></th>
                    <th scope='col' id='Lname'><a href='?order=lname&&sort=$sort'>Last Name</a></th>
                    <th scope='col' id='Add1'>Address 1</th>
                    <th scope='col' id='Add2'>Address 2</th>
                    <th scope='col' id='City'><a href='?order=city&&sort=$sort'>City</a></th>
                    <th scope='col' id='State'><a href='?order=st&&sort=$sort'>State</a></th>
                    <th scope='col' id='Zip'>Zip Code</th>
                    <th scope='col'>Pets</th>
                </tr>
            </thead>
            <tbody id='ownerTable'>";


while ($row = mysqli_fetch_array($result)) {
    echo '<tr><td>' . $row['fname'] . '</td><td>' . $row['lname'] . '</td><td>' . $row['add1'] . '</td><td>' . $row['add2'] . '</td><td>' . $row['city'] . '</td><td>' . $row['st'] . '</td><td>' . $row['zip'] . '</td><td><button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">Pets</button></td></tr>';
}

echo '            
            </tbody>
        </table></div>';

$p = $page;
if ($p < 9) $p = 9;

echo '    <div class="container mb-5"><nav aria-label="Page navigation example"><ul class="pagination justify-content-center">';

if ($page == 1) echo "&nbsp&nbsp<li class='page-item active'><a href='?order=$order&&sort=$sort&&page=1' class='page-link'>1</a></li>&nbsp&nbsp";
else echo "&nbsp&nbsp<li class='page-item'><a href='?order=$order&&sort=$sort&&page=1' class='page-link'>1</a></li>&nbsp&nbsp";

if(isset($_GET['sort'])) {
    $sort = $_GET['sort'];
} else {
    $sort = 'DESC';
}

for ($i = $p - 7; $i <= $p + 7; $i++) {
    if ($i == $number_of_pages) break;
    if ($i == $page) {
        echo "<li class='page-item active'><a href='?order=$order&&sort=$sort&&page=$i' class='page-link'>$i</a></li>";
    } else {
        echo "<li class='page-item'><a href='?order=$order&&sort=$sort&&page=$i' class='page-link'>$i</a></li>";
    }
}

if ($page == $number_of_pages) echo "&nbsp&nbsp<li class='page-item active'><a href='?order=$order&&sort=$sort&&page=$number_of_pages' class='page-link'>$number_of_pages</a></li>&nbsp&nbsp";
else echo "&nbsp&nbsp<li class='page-item'><a href='?order=$order&&sort=$sort&&page=$number_of_pages' class='page-link'>$number_of_pages</a></li>&nbsp&nbsp";
echo '</ul></nav></div>';