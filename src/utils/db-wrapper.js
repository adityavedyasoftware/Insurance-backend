const util = require('util');
var moment = require('moment');

var promise = require('bluebird').getNewLibraryCopy();

var initOptions = {
    // Initialization Options
    promiseLib: promise,

    //noLocking should be set to true for mocking PG DB in UTs. Default is false
    // noLocking: process.env.PGP_NOLOCKING ? process.env.PGP_NOLOCKING : false,

    query: function (e) {
        //console.log('About to invoke query: ' + e.query);
        //logger.info('About to invoke query: ' + e.query);
    },
    receive: function (data, result, e) {
        var timeTaken = null;
        try {
            timeTaken = Date.now() - e.client.$ctx.start;
        } catch (e) { }
        //TODO: The logger from receive event doesn't have cls context due to which the requstId, tenantId and userid doesn't get logged.
        // console.log(util.format('Time taken [%s ms] for QUERY: %s', timeTaken, e.query));
    }
};


// Database connection parameters:
const dbConfig = {
    host: 'localhost',// DB_HOST,
    port: '5432' ,//constants.DB_PORT,
    database: 'test' ,//constants.DB_NAME,
    user: 'postgres',//constants.DB_USERNAME,
    password: 'root',//constants.DB_PASSWORD,
    max: 20,//constants.DB_CONNECTION_POOL_SIZE, // max number of clients in the pool
    min: 50,//constants.DB_CONNECTION_POOL_SIZE_MIN,
    idleTimeoutMillis: 30000
};

const pgPromise = require('pg-promise')(initOptions);
pgPromise.pg.types.setTypeParser(1114, function (str) { return moment.utc(str).toDate() });

// Create the database instance:
var db = pgPromise(dbConfig);

module.exports = {
    DB: db,
    PGP: pgPromise
};