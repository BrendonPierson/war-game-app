define(function(require){
  var cards = require("cards");

  cards.getNewDeck();

  $("#main-wrapper").on('click', '#playRound', function(){
    console.log("player round clicked");
    cards.playRound();
  });

  $("#main-wrapper").on('click', '#war', function(){
    cards.war();
    $(this).slideUp('slow');
    $("#playRound").slideDown();
  });

  $(document).keydown(function(e) {
    if (e.which === 39){
      cards.playRound();
    }
  });



});