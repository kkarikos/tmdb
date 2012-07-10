# TMDb Wrapper for Node.js

[TMDb API](http://www.themoviedb.com) wrapper for Node.js users.

Wrapper can be injected with a [Redis](http://redis.io) cache.

## How to install

	npm install moviedb

## Samples

```js
var tmdb = require('tmdb').init({apikey:'yourapikey'});
tmdb.Movie.search({query: 'Transformers', year: 2007}, function(err,res) {
  for(var x in res) {
    console.log(res[x].name);
  }
});
```

More samples at test dir.

## Project status

The library is currently deployed in production on a site I am working on. Changes and fixes are coming here as I encounter troubles but at the moment there is no active developement on new features.

All the getter methods of the API have been implemented. At the moment there is no plans to implement the setter part of the API.
