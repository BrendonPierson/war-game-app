define(function(require){
  var cards = require("cards");

  cards.getNewDeck();
  $("#deal").click(function(){
    cards.deal();
    //disable deal button
    $("#playRound").slideDown();
    $('h3').slideDown();
    $(".progress").slideDown();
  });

  $("body").on('click', '#playRound', function(){
    console.log("player round clicked");
    cards.playRound();
  });

  $("body").on('click', '#war', function(){
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