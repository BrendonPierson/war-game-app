requirejs.config({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"], //makes sure jquery is loaded before bootstrap
    "firebase": {
      exports: "Firebase"
    }
  }
});

//dependencies are global dependencies
requirejs(["dependencies", "eventHandlers"], 
  function(dependencies, eventHandlers) {
    
  } //end require function
);//end require 