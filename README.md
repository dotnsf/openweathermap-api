# OpenWeatherMap API


## Overview

This is a **wrapper** for `OpenWeatherMap` API:

https://home.openweathermap.org/


## How to run

- Install dependencies:

  - `$ npm install`

- Run with Environment value `API_KEY` which would be your **OpenWeatherMap API Key**.

  - `$ API_KEY=xxxxx npm start`

- (Optional)Environment value `PORT` specifies listening port number(default:8080)

  - `$ API_KEY=xxxxx PORT=3000 npm start`

- (Optional)Environment value `CORS` specifies CORS allowed host(default:'')

  - `$ API_KEY=xxxxx CORS=http://localhost:3001 npm start`


## APIs

- Forecast

  - `GET /api/forecast?q=地名`

    - ex. `GET /api/forecast?q=Chiba-shi,jp`

  - `GET /api/forecast?lat=緯度&lng=経度`

    - ex. `GET /api/forecast?lat=35.6590424220025&lng=139.700615108013`

  - `GET /api/forecast?zip=郵便番号`

    - ex. `GET /api/forecast?zip=104-0061,jp`


## Licensing

This code is licensed under MIT.


## Copyright

2022 K.Kimura @ Juge.Me all rights reserved.

