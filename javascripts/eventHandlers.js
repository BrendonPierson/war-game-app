define(function(require){
  var cards = require("cards");

  cards.getNewDeck();
  $("#deal").click(function(){
    cards.deal();
    //disable deal button
    $(this).parent().prepend('<button id="playRound" type="button" class="btn btn-primary btn-lg">Play Round</button>');
  });

  $("body").on('click', '#playRound', function(){
    console.log("player round clicked");
    cards.playRound();
  });

  $("body").on('click', '#war', function(){
    cards.war();
    $(this).slideUp('slow');
  });
});