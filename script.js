
function random(min, max){
  return Math.floor(Math.random()*(max - min)) + min;
}

function randomChar(){
  var rndInd = random(65,90);
  var rndChar = String.fromCharCode(rndInd);

  return rndChar;
}

function idRandom(){

  var idRnd = "";
  var num = "";
  var char = "";

  for (var i = 0; i < 3; i++) {

    num += random(0,9);
    char += randomChar();
  }

  idRnd = char + num;

  return idRnd;
}

function randomPlayer(){

  var twoPerc = random(0,99);
  var threePerc = 100 - twoPerc;

  var player = {
    "id": idRandom() ,
    "points": random(0,100) ,
    "bounce": random(0,500),
    "mistake": random(0,50),
    "twoPerc": twoPerc,
    "threePerc": threePerc,
  };

  return player;
}

function isPresent(player, players){

  var finded = false;

  for (var i = 0; i < players.length; i++) {
    if (player.id == players[i].id) {
      finded = true;
    }
  }
  return finded;
}

function getIdPlayer(id, players){

  var player ;

  for (var i = 0; i < players.length; i++) {

    if (players[i].id == id) {

      player = players[i];
    }
  }
  return player;
}

function getRandomPlayers(){
  var players = [];

  while (players.length < 10) {

    var player = randomPlayer();

    if (!isPresent(player, players)) {

      players.push(player);
    }
  }
  return players;
}

function upDateList(players){

  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var option = document.createElement("div");
    option.setAttribute("data-id",player.id);
    option.innerHTML= player.id;

    var datalist = $("div#player");
    console.log(datalist);
    datalist.append(option);
  }
}

function clearClick(){
  var input = $("#usr-input");
  input.val("");

  var  idDOM = $("#id > span.content");
  var  pointsDOM = $("#points > span.content");
  var  bounceDOM = $("#bounce > span.content");
  var  mistakeDOM = $("#mistake > span.content");
  var  twoPercDOM = $("#twoPerc > span.content");
  var  threePercDOM = $("#threePerc > span.content");

  idDOM.text("");
  pointsDOM.text("");
  bounceDOM.text("");
  mistakeDOM.text("");
  twoPercDOM.text("");
  threePercDOM.text("");
}

function upCompleteId(players , selectId){

  var player = getIdPlayer(selectId, players);

  var  idDOM = $("#id > span.content");
  var  pointsDOM = $("#points > span.content");
  var  bounceDOM = $("#bounce > span.content");
  var  mistakeDOM = $("#mistake > span.content");
  var  twoPercDOM = $("#twoPerc > span.content");
  var  threePercDOM = $("#threePerc > span.content");

  idDOM.text(player.id);
  pointsDOM.text(player.points);
  bounceDOM.text(player.bounce);
  mistakeDOM.text(player.mistake);
  twoPercDOM.text(player.twoPerc + "%");
  threePercDOM.text(player.threePerc + "%");
}


function init() {
  var players = getRandomPlayers();
  upDateList(players);

  var btn = $("#clear-btn");
  btn.click(clearClick);

  var idPlayer = $("#player > div");
  idPlayer.on("click" , function(){
    var id = $(this).attr("data-id");
    upCompleteId(players,id);
  });
}

$(document).ready(init);
