var players;

function ajax (){


  $.ajax({

    url : "https://www.boolean.careers/api/array/basket?n=10",
    method: "GET",
    success: function(data, state){

      if (data.success) {
        players = data.response;
        upDateList(players);
      }
    },
    error: function(){
    }
  })
}

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

    if (players[i].playerCode == id) {

      player = players[i];
    }
  }
  return player;
}

function getRandomPlayers(){

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
    option.setAttribute("data-id",player.playerCode);
    option.innerHTML= player.playerCode;

    var datalist = $("div#player");
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

  idDOM.text(player.playerCode);
  pointsDOM.text(player.points);
  bounceDOM.text(player.rebounds);
  mistakeDOM.text(player.fouls);
  twoPercDOM.text(player.twoPoints + "%");
  threePercDOM.text(player.threePoints + "%");
}


function init() {
  ajax();

  var btn = $("#clear-btn");
  btn.click(clearClick);

  $(document).on("click", "#player > div", function() {
    var id = $(this).attr("data-id");
    upCompleteId(players,id);
  })

}

$(document).ready(init);
