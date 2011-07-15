var request = require('request');
var urlbase = 'http://api.themoviedb.org/2.1/';

this.init = function(key) {
  this.apikey = key;
  return this;
}

this.apikey;

this.Movie = {
  
  // search method. query object like: { query: querystring,year:year,lang:lang }
  search: function(q,callback) {
    if(!q.lang) q.lang = 'en';
    var url = urlbase+'Movie.search/'+q.lang+'/json/'+exports.apikey+'/'+q.query;
    if(q.year) url += '+'+q.year;
    request({uri:url}, function(error,response,body) {
      exports.handle(error,response,body,callback);
    });
  },
  
  // getInfo method.
  getInfo: function(id, callback) {
    var url = urlbase+'Movie.getInfo/'+id;
    request({uri:url}, function(error,response,body) {
      exports.handle(error,response,body,callback);
    });
  }


};

exports.handle = function(error, response, body, callback) {
  var res = JSON.parse(body);
  if(!error && response.statusCode == 200 && !res.status_code) {
    callback(undefined,res);
    return;
  }

  if(!error) {
    switch(res.status_code) {
      case 1: // success
        callback(undefined,res);
        break;

      case 7: //invalid api key
        callback(res,undefined);
        break;
    }
  }
  else {
    callback(error,res);
  }
}
