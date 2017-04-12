<?php 
include('include/conf.inc.php');
include('include/sql.inc.php');



$bdd = connect_bdd();
$name = mysqli_real_escape_string ($bdd,$_POST["name"]);
$sql = "INSERT INTO cd_album SET album_name ='".$name."'";

send_sql($bdd,$sql);
sleep(2);
echo mysqli_insert_id($bdd);




