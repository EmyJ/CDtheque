<?php 
include('include/conf.inc.php');
include('include/sql.inc.php');



$bdd = connect_bdd();
$name = mysqli_real_escape_string ($bdd,$_POST["name"]);
$sql = "INSERT INTO cd_categ SET categ_name ='".$name."'";

send_sql($bdd,$sql);


