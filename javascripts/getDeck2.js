define(function(require){
    var $ = require("jquery"),
      Q = require("q");

  return function(){
    var deferred = Q.defer();

    $.ajax({
      url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      method: "GET"
    }).done(function(data){
      console.log(data);
      // deckId1 = data.deck_id;
      deferred.resolve(data.deck_id);
    }).fail(function(xhr, status, error) {
      deferred.reject(error);
    });
    return deferred.promise;
    
    // $.ajax({
    //   url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
    //   method: "GET"
    // }).done(function(data){
    //   console.log(data);
    //   deckId2 = data.deck_id;
    // });
  };
});