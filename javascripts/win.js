define(function(require){
  var $ = require("jquery");

  return {
    play1: function(player1cards, player2cards){
      console.log("Players cards", player1cards[0].value,  player2cards[0].value);
      console.log("player 1 has higher card");
      player1cards[player1cards.length] = player1cards[0];
      player1cards[player1cards.length] = player2cards[0];
      player1cards.shift();
      player2cards.shift();
      console.log("player1cards", player1cards);
      console.log("player2cards", player2cards);
      $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-success");
      $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-danger");
      $("#player1card").addClass("alert-success");
      $("#player2card").addClass("alert-danger");
    },
    play2: function(player1cards, player2cards){
        console.log("Players cards", player1cards[0].value,  player2cards[0].value);
        console.log("player 2 has higher card");
        player2cards[player2cards.length] = player2cards[0];
        player2cards[player2cards.length] = player1cards[0];
        player2cards.shift();
        player1cards.shift();
        console.log("player1cards", player1cards);
        console.log("player2cards", player2cards);
        $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-danger");
        $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-success");
        $("#player2card").addClass("alert-success");
        $("#player1card").addClass("alert-danger");
    },
    cardsEqual: function(player1cards, player2cards){
      $("#playRound").addClass('disabled');
      console.log("Players cards", player1cards[0].value,  player2cards[0].value);
      console.log("time for war");
      $("#player1card").append("<img src='/media/cards_face_down-01.png' height='315'>");
      $("#player2card").append("<img src='/media/cards_face_down-01.png' height='315'>");
      $("#war").slideDown();
      $("#playRound").slideUp();
    },
    checkForWinner: function(player1cards, player2cards){
      if (player2cards.length === 0) {
        console.log("player 1 wins!");
        $("#playersRow").html("<h1>Player 1 wins!</h1>");
      }
      if (player1cards.length === 0) {
        console.log("player 2 wins!");
        $("#playersRow").html("<h1>'Merica! Player 2 wins!</h1>");
      }
    }
  };
});