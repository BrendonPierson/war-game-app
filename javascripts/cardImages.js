define(function(require){
  var $ = require("jquery");

  return function(player1, player2, index){
    p1card = player1[index].image;
    p2card = player2[index].image;
    $("#player1card").html("<img src=" + p1card + " >");
    $("#player2card").html("<img src=" + p2card + " >");
  };

  
});