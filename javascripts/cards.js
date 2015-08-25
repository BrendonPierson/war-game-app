define(function(require){
  var $ = require("jquery"),
      cardImages = require("cardImages"),
      win = require("win"),
      getDeck = require("getDeck"),
      convertValues = require("convertValues"),
      progressBar = require("progressBar"),
      deckId1,
      deckId2,
      // TESTdeckId1,
      // TESTdeckId2,
      player1cards = [],
      player2cards = [],
      round = 0;

  return {
    getNewDeck: function(){
      // var deck = getDeck();
      // var deck2 = getDeck();

      // deck.then(function(data){
      //   deckId1 = data;
      // }).deck2.then(function(data){
      //   deck2 = data;
      // }).fail(function(data){
      //   console.log("data", data);
      // }).done(function(){
      //   $("#deal").slideDown('slow');
      // });

      


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
        $("#deal").slideDown('slow');
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
        player1cards = convertValues(player1cards);
        console.log("player1cards", player1cards);
        $("#player1").html("<h2>52 Cards");
        $("#player1card").html('<img src="http://cdn.shopify.com/s/files/1/0200/7616/products/blue-back_4_1024x1024.png?v=1375486520" height="500">');
        $("#player2card").html('<img src="http://cdn.shopify.com/s/files/1/0200/7616/products/blue-back_4_1024x1024.png?v=1375486520" height="500">');
      });

      $.ajax({
        url:"http://deckofcardsapi.com/api/deck/" + deckId2 + "/draw/?count=52",
        method: "GET"
      }).done(function(data){
        for(var i = 0; i < 52; i++){
          player2cards[player2cards.length] = data.cards[i];
        }
        player2cards = convertValues(player2cards);
        console.log("player2cards", player2cards);
        $("#player2").html("<h2>52 Cards");
        $("#deal").slideUp('slow');
      });  
    },
    playRound: function(){
      cardImages(player1cards, player2cards, 0);
      $("#player1").removeClass("alert-success");
      $("#player2").removeClass("alert-success");

      if(player1cards[0].value === player2cards[0].value) {
        $("#playRound").addClass('disabled');
        console.log("Players cards", player1cards[0].value,  player2cards[0].value);
        console.log("time for war");
        $("#war").slideDown();
        $("#playRound").slideUp();
      }
      else if (player1cards[0].value > player2cards[0].value){
        // win.play1(player1cards, player2cards);
        console.log("Players cards", player1cards[0].value,  player2cards[0].value);
        console.log("player 1 has higher card");
        player1cards[player1cards.length] = player1cards[0];
        player1cards[player1cards.length] = player2cards[0];
        player1cards.shift();
        player2cards.shift();
        console.log("player1cards", player1cards);
        console.log("player2cards", player2cards);
        $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-success");
        $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
      } else {
        // win.play2(player1cards, player2cards);
        console.log("Players cards", player1cards[0].value,  player2cards[0].value);
        console.log("player 2 has higher card");
        player2cards[player2cards.length] = player2cards[0];
        player2cards[player2cards.length] = player1cards[0];
        player2cards.shift();
        player1cards.shift();
        console.log("player1cards", player1cards);
        console.log("player2cards", player2cards);
        $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
        $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-success");
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
        $("#player1").removeClass("alert-success");
        $("#player2").removeClass("alert-success");
        while (player1cards[warRound].value === player2cards[warRound].value){
          console.log(warRound + " War");
          warRound += 4;
          cardImages(player1cards, player2cards, warRound);
        }
        if (player1cards[warRound].value > player2cards[warRound].value){
          console.log("Players cards", player1cards[warRound].value,  player2cards[warRound].value);
          console.log("player 1 has higher card");
          for (var i = 0; i < warRound; i++) {
            player1cards[player1cards.length] = player1cards[i];
            player1cards[player1cards.length] = player2cards[i];
            player1cards.shift();
            player2cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>").addClass("alert-success");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
          $("#playRound").removeClass('disabled');
        } else {
          console.log("Players cards", player1cards[warRound].value,  player2cards[warRound].value);
          console.log("player 2 has higher card");
          for (var j = 0; j < warRound; j++) {
            player2cards[player2cards.length] = player2cards[j];
            player2cards[player2cards.length] = player1cards[j];
            player2cards.shift();
            player1cards.shift();
          }
          console.log("player1cards", player1cards);
          console.log("player2cards", player2cards);
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>");
          $("#player1").html("<h2>" + player1cards.length + " cards</h2>");
          $("#player2").html("<h2>" + player2cards.length + " cards</h2>").addClass("alert-success");
          $("#playRound").removeClass('disabled');
        }
        progressBar(player1cards, player2cards);
        round += 1;
      }
  };
});