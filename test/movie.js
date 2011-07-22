var assert = require('assert');
var opts = { 
  apikey: 'yourapikey',
  cache: require('redis').createClient()
  };
var tmdb = require('../lib/tmdb').init(opts);

tmdb.Movie.search({query:'Transformers'},function(err,result) {
  if(!err) {
    console.log('success');
    assert.equal('Transformers', result[0].name, 'Simple query test');
    for(var x in result) {
      console.log(result[x].name);
    }
  }
  else {
    console.log('error:'+err);
  }
});

tmdb.Movie.search({query: 'the green hornet'}, function(err,result) {
  assert.equal('The Green Hornet', result[0].name, 'Spaced search');
});


tmdb.Movie.getInfo({query:'187'},function(err,result) {
  // movie should be sin city
  assert.equal('Sin City', result[0].name, 'Get info test');
});

tmdb.Movie.getImages({query:'550'},function(err,result) {
  assert.equal('Fight Club', result[0].name, 'Get name from images list');
});

tmdb.Movie.imdbLookup({query:'tt0137523'},function(err,result) {
  assert.equal('Fight Club', result[0].name, 'Get name from imdb lookup');
});

tmdb.Movie.getLatest(function(err,result) {
  assert.ok(result,'Get latest flick not null');
});

tmdb.Movie.getTranslations({query:'11'},function(err,result) {
  assert.equal('Star Wars: Episode IV: A New Hope', result[0].name); // dumb test
});

tmdb.Movie.getVersion({query: ['885','550']}, function(err,result) {
  assert.equal('The Docks of New York', result[0].name);
  assert.equal('Fight Club', result[1].name);
});

tmdb.Movie.search({query:'sdjfisodjfoisjdf'},function(err,result) {
  console.log(result);
});

// failing test
tmdb.apikey = 'buuba';
tmdb.Movie.search({query:'Transformers'}, function(err,result) {
  console.log(err);
});

tmdb.cache.quit();
