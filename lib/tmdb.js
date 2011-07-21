var request = require('request');
var urlbase = 'http://api.themoviedb.org/2.1/';

this.init = function(opts) {
  this.apikey = opts.apikey;
  this.cache = opts.cache;
  return this;
}

this.apikey;

var buildUrl = function(query,method) {
  if(!query.lang) query.lang = 'en';
  return urlbase+method+'/'+query.lang+'/json/'+exports.apikey+'/'+query.query;
}

var buildUrlEmptyQuery = function(method) {
  return urlbase+method+'/en/json/'+exports.apikey;
}

this.Movie = {
  // search method. query object like: { query: querystring,year:year,lang:lang }
  search: function(q,callback) {
    if(q.year) q.query = q.query + '+' + q.year;
    exports.fetch(buildUrl(q,'Movie.search'),callback);
  },
  
  // getInfo method. query object like { query: id, lang:lang }
  getInfo: function(q, callback) {
    exports.fetch(buildUrl(q,'Movie.getInfo'),callback);
  },

  // getImages method. query object like { query: id, lang:lang }
  getImages: function(q, callback) {
    exports.fetch(buildUrl(q,'Movie.getImages'),callback);
  },

  // imdbLookup method. query object like { query: id, lang:lang }
  imdbLookup: function(q,callback) {
    exports.fetch(buildUrl(q,'Movie.imdbLookup'),callback);
  },

  browse: function(q,callback) {

  },

  // getLatest methos. no query object
  getLatest: function(callback) {
    exports.fetch(buildUrlEmptyQuery('Movie.getLatest'),callback); 
  },

  // getTranslations method. query object takes id like { query: id }
  getTranslations: function(q,callback) {
    exports.fetch(buildUrl(q,'Movie.getTranslations'),callback);
  },

  // getVersion method. query takes an id or an array of ids, like { query: ['885','550'] } 
  // TODO: make this skip cache
  getVersion: function(q, callback) {
    exports.fetch(buildUrl(q,'Movie.getVersion'),callback);
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
