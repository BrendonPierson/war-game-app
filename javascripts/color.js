define(function(require){
  return function(round){
    var gb = 255 - (round * 4.9);
    $("body").css('color', 'rgb(255,'+ gb + ',' + gb + ')');
  };
});