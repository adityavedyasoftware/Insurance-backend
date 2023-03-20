
const udw = require('../utils/db-wrapper');
const db = udw.DB
const PGP = udw.PGP
const dbSQLConfig = require('../db/index');
module.exports.createSqlDb = async (req,res,next) => {
    try {
        await db.none(dbSQLConfig.user.add)
        console.log('Db created Successfully..')
    } catch (error) {
        console.log(error)
    }
    next()
 }