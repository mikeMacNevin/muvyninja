

function hbsHelpers(hbs) {
    hbs.registerHelper("yearOnly", function(str) {
      return str.slice(0,4);
    });
  

  }
  
  module.exports = hbsHelpers;