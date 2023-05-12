const { uuid } = require("uuidv4")
const udw = require('../db/utils/db-wrapper')
const PGP = udw.PGP
const db = udw.DB
const dbSQLConfig = require('../db/index')
const dbManager = require("../db/utils/db-manager")

module.exports.getCustomerDetailsById = async(req, res) => {
    const {id} = req.params
    try {
        const result = await db.query(dbSQLConfig.query.getAllDetailById,id)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.getAllInsuranceCustomerDetails = async(req, res) => {
    
    try {
        const result = await db.query(dbSQLConfig.query.getAllInsuranceDetails)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.getCustomerCertainDetailById = async (req, res) => {
    const { id, type } = req.params
    const tableName = dbManager.getTableName(`${type+'_details'}`,'public')
    try {
        const query = 'SELECT * FROM $1 WHERE personal_id=$2'
        const result = await db.query(query, [tableName, id])
        console.log(query)
        
        console.log(JSON.stringify(result[0]))
        return res.status(200).send(result[0])
    } catch (error) {
        return res.status(500).send(error)
    }
}