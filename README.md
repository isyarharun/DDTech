This Program using MySql as a database

to run server and run test

1. install all dependencies using `yarn`
2. please add the database with name `carrental`
3. please provide a database setting in env file
4. please make sure port 4000 is empty or you can change the port in .env file
5. run server `npm run dev`
6. run unit test `npm run test`

every time you run the test file it will truncate all the database to make sure the test working correctly.
please start the server again by using `npm run dev` so it will generate the seed file again from scratch

API to rent car/s
API URL : localhost:4000/rental/makeRental\
Method: POST\
Request Body :\
{\
 "carIds" : array of integer,\
 "customerId": integer,\
"startDate": date,\
"endDate": date\
}\
All of the input params are mandatory.\
Request Body Example :\
{\
 "carIds": [1],\
 "customerId": 1,\
 "startDate": "2019-08-19 12:00:00",\
 "endDate": "2019-08-25 12:00:00"\
}\
Response : \
200 (Ok) \
[\
 {\
 "startDate": "2019-08-19T12:00:00.000Z",\
 "endDate": "2019-08-25T12:00:00.000Z",\
 "vehicleNumber": "B 12345 KL",\
 "firstName": "Isyar",\
 "lastName": "Harun",\
 "originalPrice": 150000,\
 "discountPrice": 142500\
 }\
]\

400 (bad request) input params are wrong\
{\
 "error": "errorMessage"\
}

404 (not found) data not found\
{\
 "error": "errorMessage"\
}

500 (internal server error)\
{\
 "error": "errorMessage"\
}\
