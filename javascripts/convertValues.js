define(function(){
  return function(cardArray){
    for (var i = 0; i < cardArray.length; i++){

      switch (cardArray[i].value) {
        case "KING":
          cardArray[i].value = 13;
          break;
        case "QUEEN":
          cardArray[i].value = 12;
          break;
        case "ACE":
          cardArray[i].value = 14;
          break;
        case "JACK":
          cardArray[i].value = 11;
          break;
        default:
          cardArray[i].value = parseInt(cardArray[i].value);
          break;
      }
    }
    return cardArray;
  };
});