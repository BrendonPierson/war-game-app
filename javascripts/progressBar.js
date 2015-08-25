define(function(require){

  return function(p1, p2){
    $("#player1progress").removeClass('progress-bar-success');
    $("#player2progress").removeClass('progress-bar-danger');
    $("#player2progress").removeClass('progress-bar-success');
    $("#player1progress").removeClass('progress-bar-danger');


    var p1percent = Math.floor(p1.length / 104 * 100);
    var p2percent = Math.floor(p2.length / 104 * 100);
    $("#player1progress").css('width', p1percent + "%");
    $("#player2progress").css('width', p2percent + "%");
    // $("#player1progress").text(p1.length + ' Cards');
    // $("#player2progress").text(p2.length + ' Cards');

    if(p1percent > p2percent) {
      $("#player1progress").addClass('progress-bar-success');
      $("#player2progress").addClass('progress-bar-danger');
    } 

    if (p2percent > p1percent) {
      $("#player2progress").addClass('progress-bar-success');
      $("#player1progress").addClass('progress-bar-danger');      
    }
  };
});