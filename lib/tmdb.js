var request = require('request');
var urlbase = 'http://api.themoviedb.org/2.1/';

this.init = function(opts) {
  this.apikey = opts.apikey;
  this.cache = opts.cache;
  return this;
}

this.apikey;

this.Movie = {
  
  // search method. query object like: { query: querystring,year:year,lang:lang }
  search: function(q,callback) {
    if(!q.lang) q.lang = 'en';
    var url = urlbase+'Movie.search/'+q.lang+'/json/'+exports.apikey+'/'+q.query;
    if(q.year) url += '+'+q.year;

    exports.fetch(url,callback);
  },
  
  // getInfo method.
  getInfo: function(q, callback) {
    if(!q.lang) q.lang = 'en';
    var url = urlbase+'Movie.getInfo/'+q.lang+'/json/'+exports.apikey+'/'+q.query;;
    request({uri:encodeURI(url)}, function(error,response,body) {
      exports.handle(url,error,response,body,callback);
    });
  }
};

this.fetch = function(url,callback) {
  if(this.cache) {
    this.cache.get(fixkey(url),function(err,reply) {
      if(!reply)
        fetchexternal(url,callback);
      else
        callback(undefined,JSON.parse(reply));
    });
  }
  else {
    fetchexternal(url,callback);
  }
}

var fetchexternal = function(url,callback) {
  request({uri:encodeURI(url)}, function(error,response,body) {
    exports.handle(url,error,response,body,callback);
  });
}

exports.handle = function(url, error, response, body, callback) {
  var res = JSON.parse(body);
  if(!error && response.statusCode == 200 && !res.status_code) {
    callback(undefined,res);
    if(this.cache)
          this.cache.set(fixkey(url),body);
    return;
  }

  if(!error) {
    switch(res.status_code) {
      case 1: // success
        callback(undefined,res);
        if(exports.cache)
          exports.cache.set(fixkey(url),body);
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

var fixkey = function(key) {
  return 'tmdb:'+key.replace(' ', '_');
}
