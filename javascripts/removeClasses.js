define(function(require){
  var $ = require("jquery");

  return function(){
    $("#player1").removeClass("alert-success");
    $("#player2").removeClass("alert-success");
    $("#player1card").removeClass("alert-success");
    $("#player2card").removeClass("alert-success");

    $("#player1").removeClass("alert-danger");
    $("#player2").removeClass("alert-danger");
    $("#player1card").removeClass("alert-danger");
    $("#player2card").removeClass("alert-danger");
  };
});