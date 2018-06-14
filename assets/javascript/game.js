$(document).ready(function() {

var rose = {name: "Rose", health: 100, attack: 5, counterattack: 5};
var blanche = {name: "Blanche", health: 100, attack: 5, counterattack: 5};
var dorothy = {name: "Dorothy", health: 100, attack: 5, counterattack: 5};
var sophia = {name: "Sophia", health: 100, attack: 5, counterattack: 5};
var girls = [rose, blanche, dorothy, sophia];
var characterPicked = false;
var opponentPicked = false;
var gameWon = false;
var hero = [];
var villian = [];
var player1;
var player2;
var gameInProgress = false;
var videoPlayed = false;

$("#messageRow").eq(0).text("Pick a fighter!");

$(".fighter-pic").on("click", function() {
	debugger
	if (!gameInProgress){
		return
	}

	if (characterPicked & opponentPicked){return;}
	else if (gameWon){return;}
	else if (characterPicked & !opponentPicked){
		if ($(this).attr("type") === "unpicked"){
			$(this).attr("type","opponent");
			opponentPicked = true;
			player2 = $("[type~='opponent']").eq(0).attr("name");
			for (var i = 0 ; i < 4 ; i++){
				if (player2 === girls[i].name){
					villian = girls[i];
				}
			}
			$("#messageRow").eq(0).text("VS");
			setStats();
		}
	}
	else {		
		$(this).attr("type","ally");
		characterPicked = true;
		player1 = $("[type~='ally']").eq(0).attr("name");
		for (var i = 0 ; i < 4 ; i++){
			if (player1 === girls[i].name){
			hero = girls[i];
		}
	}
		$("#messageRow").eq(0).text("Pick an opponent!");
	}
	rearrangeFighters();
	checkVictory();
});


$(".btn").on("click", function(){
	if (characterPicked === false | opponentPicked === false |gameWon){
		return;
	}
	
	hero.health -= villian.attack;
	villian.health -= hero.attack;
	hero.attack += hero.counterattack;

	setStats();


	
	for (var i = 0 ; i < 4 ; i++){
		if (player1 === girls[i].name){
			girls[i] = hero;
		}
	}

	for (var i = 0 ; i < 4 ; i++){
		if (player2 === girls[i].name){
			girls[i] = villian;
		}
	}

	if (villian.health < 1){
		$(".fighter-pic").each(function(){
        	if ($(this).attr("type") === "opponent"){
       			$(this).attr("type","dead");
       			opponentPicked = false;
       			$("#messageRow").eq(0).text("Pick an opponent!");
       		}
        });  	
	}
	rearrangeFighters();
    checkVictory();
});

function rearrangeFighters (){
	$(".fighter-pic").each(function(){
		var x = $(this).detach();
    	if ($(this).attr("type") === "unpicked"){
       		x.appendTo(".enemies");
      	}
       	else if ($(this).attr("type") === "ally"){
        	x.appendTo(".allies");
        }
       	else if ($(this).attr("type") === "opponent"){
        	x.appendTo(".opponent");
        }
  	}); 
}

function checkVictory(){
	var x = 0;

	$(".fighter-pic").each(function(){
   		if ($(this).attr("type") === "unpicked" | $(this).attr("type") === "opponent"){x++;}
   	});
	if (x === 0){
		gameWon = true;
		$("#messageRow").eq(0).text("You Win!!!");
	}
}

function setStats(){
	debugger
	$("#your-stats").html("<br/>" + hero.name + "<br/>" + "Health: " + hero.health + "<br/>" + "Attack: " + hero.attack);
	//$("[type~='ally']").html(hero.name + "<br/>" + "Health: " + hero.health + "<br/>" + "Attack: " + hero.attack);
	$("#enemy-stats").html("<br/>" + villian.name + "<br/>" + "Health: " + villian.health + "<br/>" + "Attack: " + villian.attack);
}


$( "html" ).keypress(function(event) {
	debugger
	if (event.which === 13 & gameInProgress === false & videoPlayed === false){
		$("#body").append($("<video id='myVideo' />"));
		$("#myVideo").attr('src', 'assets/videos/crawl.mp4');
		$('video').trigger('play');
		videoPlayed = true;
	}
	else if (event.which === 13 & gameInProgress === false & videoPlayed === true){
		$('video').trigger('pause');
		$("#myVideo").remove();
		document.getElementById("mainPage").style.background = "#FEAF14";
		document.getElementById("body").style.background = "#FEAF14";
		document.getElementById("mainPage").style.opacity = "1";
		$("#theme-song").append($("<video id='myVideo2' />"));
		$("#myVideo2").attr('src', 'assets/videos/GGtheme.mp4');
		$("#instructions").text("");
		gameInProgress = true;
		$('video').trigger('play');

	}
});




}); // End $(document).ready