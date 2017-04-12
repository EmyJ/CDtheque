<?php 
include('include/conf.inc.php');
include('include/sql.inc.php');

$tab_cd_theque =  [];
$bdd = connect_bdd();
$sql = "SELECT
 album_id AS id,
 album_name AS cd 
 FROM cd_album ";
$tab_cd = send_sql_multi($bdd,$sql);

$tab_cd_theque ["tabCD"]= $tab_cd;

$sql = "SELECT
 categ_id AS id,
 categ_name AS text 
 FROM cd_categ ";
$tab_categ = send_sql_multi($bdd,$sql);

$tab_cd_theque ["tabCateg"]= $tab_categ;

echo json_encode($tab_cd_theque);


