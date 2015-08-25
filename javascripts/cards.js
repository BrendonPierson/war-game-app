define(function(require){
  var $ = require("jquery"),
      cardImages = require("cardImages"),
      win = require("win"),
      getDeck = require("getDeck"),
      getDeck2 = require("getDeck2"),
      convertValues = require("convertValues"),
      progressBar = require("progressBar"),
      removeClasses = require("removeClasses"),
      color = require("color"),
      deckId1,
      deckId2,
      // TESTdeckId1,
      // TESTdeckId2,
      player1cards = [],
      player2cards = [],
      round = 0;

  return {
    getNewDeck: function(){
      var deck = getDeck();
      var deck2 = getDeck2();

      deck.then(function(data){
        deckId1 = data;
      }).fail(function(data){
        console.log("data", data);
      }).done(function(){
        $.ajax({
          url:"http://deckofcardsapi.com/api/deck/" + deckId1 + "/draw/?count=52",
          method: "GET"
        }).done(function(data){
          for(var i = 0; i < 52; i++){
            player1cards[player1cards.length] = data.cards[i];
          }
          player1cards = convertValues(player1cards);
          console.log("player1cards", player1cards);
          $("#player1").html("<h3>52 Cards</h3>");
          $("#player1card").html('<img src="http://cdn.shopify.com/s/files/1/0200/7616/products/blue-back_4_1024x1024.png?v=1375486520" height="314">');
          $("#player2card").html('<img src="http://cdn.shopify.com/s/files/1/0200/7616/products/blue-back_4_1024x1024.png?v=1375486520" height="314">');
        });
      });

      deck2.then(function(data){
        deckId2 = data;
      }).fail(function(data){
        console.log("data", data);
      }).done(function(){
        $.ajax({
          url:"http://deckofcardsapi.com/api/deck/" + deckId2 + "/draw/?count=52",
          method: "GET"
        }).done(function(data){
          for(var i = 0; i < 52; i++){
            player2cards[player2cards.length] = data.cards[i];
          }
          player2cards = convertValues(player2cards);
          console.log("player2cards", player2cards);
          $("#player2").html("<h3>52 Cards</h3>");
          $("#deal").slideUp('slow');

          $("#playRound").slideDown();
          $('h3').slideDown();
          $(".progress").slideDown();
        }); 
      });
    },
    playRound: function(){
      cardImages(player1cards, player2cards, 0);
      removeClasses();
      color(round);

      if(player1cards[0].value === player2cards[0].value) {
        win.cardsEqual(player1cards, player2cards);
      }
      else if (player1cards[0].value > player2cards[0].value){
        win.play1(player1cards, player2cards);
      } else {
        win.play2(player1cards, player2cards);
      }

      win.checkForWinner(player1cards, player2cards);
      round += 1;
      $("#round").text(round);
      console.log("round", round);
      progressBar(player1cards, player2cards);
      if(round > 52) {
        if(player1cards.length > player2cards.length) {
          $("#playersRow").html("<h1>Player 1 wins!</h1>");
        } else {
          $("#playersRow").html("<h1>Player 2 wins!</h1>");
        }
      }
      
    },
    war: function(){
        var warRound = 4;
        cardImages(player1cards, player2cards, warRound);
        removeClasses();
        // $("#player1").removeClass("alert-success");
        // $("#player2").removeClass("alert-success");
        // $("#player1card").removeClass("alert-success");
        // $("#player2card").removeClass("alert-success");
        while (player1cards[warRound].value === player2cards[warRound].value){
          console.log(warRound + " War");
          warRound += 4;
          cardImages(player1cards, player2cards, warRound);
        $("#player1card").append("<img src='/media/cards_face_down-01.png' height='315'>");
        $("#player2card").append("<img src='/media/cards_face_down-01.png' height='315'>");
        }
        if (player1cards[warRound].value > player2cards[warRound].value){
          console.log("Players cards", player1cards[warRound].value,  player2cards[warRound].value);
          console.log("player 1 has higher card");
          for (var i = 0; i < warRound + 1; i++) {
            player1cards[player1cards.length] = player1cards[i];
            player1cards[player1cards.length] = player2cards[i];
            player1cards.shift();
            player2cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-success");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-danger");
          $("#player1card").addClass("alert-success");
          $("#player2card").addClass("alert-danger");
          $("#playRound").removeClass('disabled');
        } else {
          console.log("Players cards", player1cards[warRound].value,  player2cards[warRound].value);
          console.log("player 2 has higher card");
          for (var j = 0; j < warRound + 1; j++) {
            player2cards[player2cards.length] = player2cards[j];
            player2cards[player2cards.length] = player1cards[j];
            player2cards.shift();
            player1cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-danger");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-success");
          $("#player2card").addClass("alert-success");
          $("#player1card").addClass("alert-danger");
          $("#playRound").removeClass('disabled');
        }
        progressBar(player1cards, player2cards);
        round += 1;
      }
  };
});