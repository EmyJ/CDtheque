<?php
//----------------------------------------
// Connection base de Données 
// retourne identifiant connexion
//----------------------------------------

function connect_bdd(){
	$bdd = mysqli_connect(HOST,LOGIN,PSW,BASE);
	mysqli_set_charset($bdd,"utf8");
	if (!$bdd) {
    	die('Erreur de connexion : ' . mysqli_connect_error());
	}
	return $bdd;//identifiant connexion
}
//----------------------------------------
// Envoie une requete SQL
// retourne un tableau multiligne
// For example : SELECT *
//----------------------------------------
function send_sql_multi($bdd,$sql){
	$resultat = mysqli_query($bdd,$sql);
	if($resultat){
		while($row = mysqli_fetch_assoc($resultat)){
	 		$tab[]= $row;
	 	}
		return $tab;
	}
	else
		die ($sql."<br><br>".mysqli_error($bdd));
}
//----------------------------------------
// Envoie une requete SQL
// retourne un tableau avec 1 ligne
// For example : SELECT * WHERE ID = $id
//----------------------------------------
function send_sql_simple($bdd,$sql){
	$resultat = mysqli_query($bdd,$sql);
	if($resultat)
		$tab = mysqli_fetch_assoc($resultat);
	else
		die ($sql."<br><br>".mysqli_error($bdd));
	return $tab;//identifiant connexion
}
//----------------------------------------
// Envoie une requete SQL
// retourne un tableau avec 1 ligne
// For example : INSERT UPDATE DELETE
//----------------------------------------
function send_sql($bdd,$sql){
	$resultat = mysqli_query($bdd,$sql);
	if(! $resultat)	
		die ($sql."<br><br>".mysqli_error($bdd));
}





?>