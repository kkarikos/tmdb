# TMDb Wrapper for Node.js

TMDb use made easy for Node.js users. Most of the TMDb API methods are not yet supported. That is why there is no easy way to install.

## Requirements

* [request](https://github.com/mikeal/request)

## Samples

```js
var tmdb = require('./tmdb').init('yourapikey');
tmdb.Movie.search({query: 'Transformers', year: 2007}, function(err,res) {
  for(var x in res) {
    console.log(res[x].name);
  }
});
```

More samples at test dir.
