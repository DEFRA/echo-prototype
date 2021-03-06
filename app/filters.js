var cases_list = require('./data/applications.json')
module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  filters.appInfo = function(id,key) {
      var app = {};
      cases_list.forEach(function(item){
          if (item.index == id){
            app = item;
          }
        })

      return app[key];
  }

  filters.showHide = function(obj,text) {
    var query = text.split();
      for(key in obj) {
        for(var v=0; v<query.length; v++) {
        if(obj[key].indexOf(query[v])!=-1) {
          return "show";
        }
      }
      }
      return "hide";
  }

  filters.increase = function(num) {
      return num+=1;
  }

  filters.getCode = function(text) {

      var regex = /[\d]{4}/g
      var newtext = text.match(regex)
      return newtext
  }


  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
