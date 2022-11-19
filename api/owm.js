//. owm.js
var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    request = require( 'request' ),
    api = express();

require( 'dotenv' ).config();

var settings_cors = 'CORS' in process.env ? process.env.CORS : '';
var settings_api_key = 'API_KEY' in process.env ? process.env.API_KEY : '';

api.all( '/*', function( req, res, next ){
  if( settings_cors ){
    res.setHeader( 'Access-Control-Allow-Origin', settings_cors );
    res.setHeader( 'Vary', 'Origin' );
  }
  next();
});

//. POST メソッドで JSON データを受け取れるようにする
api.use( bodyParser.urlencoded( { extended: true } ) );
api.use( bodyParser.json() );
api.use( express.Router() );


api.forecast = function( q, zip, lat, lng ){
  return new Promise( ( resolve, reject ) => {
    if( settings_api_key ){
      var option = null;
      if( q ){
        option = {
          url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + q + '&APPID=' + settings_api_key,
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        };
      }else if( zip ){
        option = {
          url: 'http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + '&APPID=' + settings_api_key,
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        };
      }else if( lat && lng ){
        option = {
          url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&APPID=' + settings_api_key,
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        };
      }

      if( option ){
        request( option, function( err, res, body ){
          if( err ){
            resolve( { status: false, error: err } );
          }else{
            if( typeof body == 'string' ){ body = JSON.parse( body ); }
            resolve( { status: true, result: body } );
          }
        });
      }else{
        resolve( { status: false, error: 'no enough query parameters specified.' } );
      }
    }else{
      resolve( { status: false, error: 'no api key specified.' } );
    }
  });
};

api.get( '/forecast', async function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var q = req.query.q;
  var zip = req.query.zip;
  var lat = req.query.lat;
  var lng = req.query.lng;
  if( lat ){ lat = parseFloat( lat ); }
  if( lng ){ lng = parseFloat( lng ); }
  api.forecast( q, zip, lat, lng ).then( function( result ){
    res.status( result.status ? 200 : 400 );
    res.write( JSON.stringify( result, null, 2 ) );
    res.end();
  });
});

//. api をエクスポート
module.exports = api;
