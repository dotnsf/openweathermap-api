//. app.js
var express = require( 'express' ),
    app = express();

var owm = require( './api/owm' );
app.use( '/api', owm );

app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

var http_port = process.env.PORT || 8080;
app.listen( http_port );
console.log( "server starting on " + http_port + " ..." );

module.exports = app;
