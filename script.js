//les globales
var cdtheque    =[];
var tabCD		= [
					{cd:"Mozart", id:1}
				  ];
var tabCateg	= [
					{text:"Classique" , id:1}
				  ];
var tabPiste 	= [];
var data 		= [];
var idCD		= 1;
var idCateg		= 2;
var str         = "";


function CDtheque(){
	this.tabCD;
	this.tabCateg;
}

function CD (id, cd){
	this.id = id;
	this.cd = cd;
	this.tabCateg;
	this.tabPiste;

}

function Categ(nom, id){
	this.id = id;
	this.text = nom;
	idCateg++;
}


// Debut de Jquery
$(function(){ // doc ready function
	//---------------------------------
    $('#spinner').hide();

    $.ajax({
        method: "POST",
        url: "load.php",
        dataType:"json"
    }).done(function(tab){
        cdtheque = tab;
        tabCD	= cdtheque.tabCD;
        afficherTabCD();
    }).fail(function(){
        alert("error");
    });

	//--------------------------------------
	//
	// ADD CD
	//
	//--------------------------------------
	$("#btnAddCD").click(function(){

        var cdName = $('#cdName').val();

        $('#spinner').toggle();

        $.post(

            "album_create.php",

            { name: cdName } ,

            function( id ) {
                //alert(id);
                var newCd = new CD(id,cdName);
                afficher(newCd);
                tabCD.push(newCd);
                $('#spinner').toggle();
                $("#cd").val("");
                dataPush();
            }).fail(function() {
            alert( "error" );
        });




	});
	
	//--------------------------------------
	//
	// Delete CD
	//
	//--------------------------------------

	$(document).on("click",'.btnDelCD', function(){
		
		var id  = $(this).parents('table').hide();
	 		id.prev().remove();
	 		id.prev().remove();
	 	for (var i  in tabCD){
	 		if (id == tabCD[i].id){
	 			tabCD.splice(i,1);
	 			
	 			break;
	 		}

	 }

	});
	
	//----------------------------------------
	//
	//ADD Categ
	//
	//-----------------------------------------

	$("#btnAddCateg").click(function(){
			

			var nom = $("#categNom").val();

  			myCateg = new Categ(nom, idCateg );

  			tabCateg.push(myCateg);

  			afficherTableauCateg();

  			var test = $("#categNom").val();
  			alert(test);

  			$.post(
					"categ_create.php", 

					{name : $("#categNom").val()} 

					).fail(function() {
    					alert( "error" );

  					});


  			dataPush();

  			$("#categNom").val("");
		
	});
	
	//--------------------------------------
	//
	// Delete Categ
	//
	//--------------------------------------
	$(document).on("click",'.btnDelCateg', function(){
		
		var id  = $(this).parents('tr').attr("data-id");
	 		$(this).parents('table').hide();
	 		//id.prev().remove();
	 		//id.prev().remove();
	 	for (var i  in tabCateg){
	 		if (id == tabCateg[i].id){
	 			tabCateg.splice(i,1);
	 			dataPush();
	 			break;
	 		}
	 	dataPush();
	 }

	});

	//---------------------------------
	}); // doc ready function
	// Fin Jquery
	//---------------------------------
//----------------------------------------------------------------------------------------------------------------------
function afficherTabCD(){
    for(var i in tabCD){
        afficher(tabCD[i]);
    }
}
//----------------------------------------------------------------------------------------------------------------------
function afficher(CD) {

        str = "<br><br>";
        str += '<table class="table table-striped" data-id=' + CD.id + '>';
        str += "<tr>";
        str += "<td colspan=3><h3>#" + CD.id + " " + CD.cd + "</td>";
        str += "<td>";
        for(var i in tabCateg) {
            str += "<select>tabCateg[i].text</select>";
        }
        str += "</td>"
        str += '<td> <a class="btn btn-primary btnDelTeam" role="button">';
        str += '<span class="glyphicon glyphicon-trash">';
        str += '</span></a></h3></td>';
        str += "</tr>";
        // entete du tableau
        str += "<tr>";
        str += "<th>Piste</th><th>Titre</th><th>Temps</th><td><td></td></td>";
        str += "</tr>";
        str += "</table>";

    $('#demo').append(str);

}

function afficherTabCateg(){

	var str2 = "";

	for (var i in tabCateg){
		
		str2 	+='<table class="table table-striped">';
		str2	+="<tr data-id="+ tab.tabCateg[i].id +">";
		str2	+="<td colspan=3><h3>#"+ tab.tabCateg[i].id +" "+ tab.tabCateg[i].text;
		str2	+='<td colspan=3><h3><a class="btn btn-primary btnDelCateg" role="button">';
		str2	+='<span class="glyphicon glyphicon-trash"></td>';
		str2	+='</span></a></h3></td>';
		str2	+="</tr>";
	}
	$('#categ').append(str2);
	dataPush();
}

function dataPush(){
	
	$(".categSelect").select2().empty();
	
	data = [];
	
	for (var i in tabCateg){
		data.push({id:tabCateg[i].id, text:tabCateg[i].text  })
	}
	$(".categSelect").select2({tags: true,  
								data: data});
}
