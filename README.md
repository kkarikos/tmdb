# TMDb Wrapper for Node.js

TMDb API wrapper for Node.js users. Most of the TMDb API methods are not yet supported.

Wrapper can be injected with a [Redis](http://redis.io) cache.

## Requirements

* [request](https://github.com/mikeal/request)
* [redis](https://github.com/mranney/node_redis) (optional)

## Samples

```js
var tmdb = require('./tmdb').init({apikey:'yourapikey'});
tmdb.Movie.search({query: 'Transformers', year: 2007}, function(err,res) {
  for(var x in res) {
    console.log(res[x].name);
  }
});
```

More samples at test dir.
