define(function(require){
  var $ = require("jquery"),
      cardImages = require("cardImages"),
      deckId1,
      deckId2,
      player1cards = [],
      player2cards = [],
      round = 0;

  return {
    getNewDeck: function(){
      $.ajax({
        url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
      }).done(function(data){
        console.log(data);
        deckId1 = data.deck_id;
      });
      $.ajax({
        url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
      }).done(function(data){
        console.log(data);
        deckId2 = data.deck_id;
      });
    },
    deal: function(){
      $.ajax({
        url:"http://deckofcardsapi.com/api/deck/" + deckId1 + "/draw/?count=52",
        method: "GET"
      }).done(function(data){
        for(var i = 0; i < 52; i++){
          player1cards[player1cards.length] = data.cards[i];
        }
        console.log("player1cards", player1cards);
        $("#player1").html("<h2>52 Cards");
      });

      $.ajax({
        url:"http://deckofcardsapi.com/api/deck/" + deckId2 + "/draw/?count=52",
        method: "GET"
      }).done(function(data){
        for(var i = 0; i < 52; i++){
          player2cards[player2cards.length] = data.cards[i];
        }
        console.log("player2cards", player2cards);
        $("#player2").html("<h2>52 Cards");
      });  
    },
    playRound: function(){
      cardImages(player1cards, player2cards, 0);
      if(player1cards[round].value === player2cards[round].value) {
        console.log("Players cards", player1cards[round].value,  player2cards[round].value);
        console.log("time for war");
        $("#war").slideDown('slow');
        $("#playRound").addClass('disabled');
      }
      else if (player1cards[round].value > player2cards[round].value){
        console.log("Players cards", player1cards[round].value,  player2cards[round].value);
        console.log("player 1 has higher card");
        player1cards[player1cards.length] = player1cards[round];
        player1cards[player1cards.length] = player2cards[round];
        player1cards.shift();
        player2cards.shift();
        console.log("player1cards", player1cards);
        console.log("player2cards", player2cards);
        $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
        $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
      } else {
        console.log("Players cards", player1cards[round].value,  player2cards[round].value);
        console.log("player 2 has higher card");
        player2cards[player2cards.length] = player2cards[round];
        player2cards[player2cards.length] = player1cards[round];
        player2cards.shift();
        player1cards.shift();
        console.log("player1cards", player1cards);
        console.log("player2cards", player2cards);
        $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
        $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
      }
      if (player2cards.length === 0) {
        console.log("player 1 wins!");
        $("#playersRow").html("<h1>Player 1 wins!</h1>");
      }
      if (player1cards.length === 0) {
        console.log("player 2 wins!");
        $("#playersRow").html("<h1>Player 2 wins!</h1>");
      }
    },
    war: function(){
        var warRound = 3;
        cardImages(player1cards, player2cards, warRound);
        if (player1cards[warRound].value === player2cards[warRound].value){
          warRound += 3;

        } else if (player1cards[round + 3].value > player2cards[round + 3].value){
          console.log("Players cards", player1cards[round].value,  player2cards[round].value);
          console.log("player 1 has higher card");
          for (var i = 0; i < 3; i++) {
            player1cards[player1cards.length] = player1cards[i];
            player1cards[player1cards.length] = player2cards[i];
            player1cards.shift();
            player2cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
          $("#playRound").removeClass('disabled');
        } else {
          console.log("Players cards", player1cards[round].value,  player2cards[round].value);
          console.log("player 2 has higher card");
          for (var j = 0; j < 3; j++) {
            player2cards[player2cards.length] = player2cards[j];
            player2cards[player2cards.length] = player1cards[j];
            player2cards.shift();
            player1cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
          $("#playRound").removeClass('disabled');
        }

      }
  };
});