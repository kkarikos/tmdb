var assert = require('assert');
var fs = require('fs');
var key = new String(fs.readFileSync('APIKEY')).replace(/(\r\n|\n|\r)/gm,"");
var opts = {
  apikey: key,
  cache: require('redis').createClient()
  };
var tmdb = require('../lib/tmdb').init(opts);

tmdb.Person.getInfo({query: '500'}, function(err,result) {
  assert.equal('Tom Cruise', result[0].name);
});

tmdb.Person.getLatest(function(err,result) {
  assert.ok(result[0].name, 'Name should exist');
});

tmdb.Person.getVersion({query:'287'},function(err,result) {
  assert.equal('Brad Pitt',result[0].name);
});

tmdb.Person.getVersion({query: ['287', '500']},function(err,result) {
  assert.equal('Brad Pitt',result[0].name);
  assert.equal('Tom Cruise',result[1].name);
});

tmdb.Person.search({query:'Brad+Pitt'}, function(err,result) {
  assert.equal('287', result[0].id); 
});

tmdb.cache.quit();
