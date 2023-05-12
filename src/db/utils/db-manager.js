

var pgw = require('./db-wrapper');
const PGP = pgw.PGP;
const db = pgw.DB;

/**
 *
 * @param table
 * @param schema_id
 * @returns {PGP.helpers.TableName}
 */
var getTableName = function (table, schema_id) {
    return new PGP.helpers.TableName({ table: table, schema: schema_id });
};

var getSelectQuery = function (columns, whereColumn) {
    return 'SELECT ' + columns.join(', ') + ' FROM $1 WHERE ' + whereColumn + ' = $2';
}

var getSelectCountQuery = function (columns, record) {
    return 'SELECT COUNT(*) > 0 as exists FROM $1' + getCondition(columns, record);
}

var getInsertQuery = function (records, columnSet, tableName) {
    return PGP.helpers.insert(records, columnSet, tableName);
};

var getUpdateQuery = function (record, columnSet, tableName, name) {
    return PGP.helpers.update(record, columnSet, tableName) + getCondition(name, record);
};

var getCondition = function (name, record, operator) {
    if (!operator) {
        operator = '=';
    }

    if (!Array.isArray(name)) {
        name = [name];
    }

    let where = ' WHERE ' + name.map(n => n + ' ' + operator + ' ${' + n + '}').join(' AND ');
    return PGP.as.format(where, record);
}

/**
 * Executes a query that expects 0 or 1 rows,
 * to resolve with the row-object when 1 row is returned
 * and with `null` when nothing is returned.
 * When the query returns more than 1 row, the method rejects
 * When receiving a multi-query result, only the last result is processed, ignoring the rest
 *
 * @param query
 * @param values
 * @returns {PGP.helpers.TableName}
 */
var executeQueryExpectingOneOrNoneRows = function (query, values) {
    if (values) {
        return db.oneOrNone(query, values);
    } else {
        return db.oneOrNone(query);
    }
};

/**
 * Executes a query that expects any number of rows.
 *
 * @param query
 * @param values
 * @returns {any}
 */
var executeQueryExpectingAnyRows = function (query, values) {
    if (values) {
        return db.any(query, values);
    } else {
        return db.any(query);
    }
};

var executeInsertUpdateQueryExpectingKeys = function (query, values, key) {
    let returning = '';
    if (key) {
        if (!Array.isArray(key)) {
            key = [key];
        }

        returning += ' RETURNING ' + key.join(', ');
    }

    return db.result(query + returning, values ? values : []);
}

var executeInsertUpdateQueryExpectingCount = function (query, values, key) {
    return db.result(query + (key ? ' RETURNING ' + key : ''), values ? values : [], r => {
        let ret = { count: r.rowCount };
        if (key) {
            ret[key + 's'] = r.rows.map(x => x[key]);
        }

        return ret;
    });
}

var executeInsertUpdateQueryExpectingCountAndIds = function (query, values) {
    return executeInsertUpdateQueryExpectingCount(query, values, 'id');
}

var executeInsertUpdateQueryExpectingKey = function (query, values, key) {
    return new Promise(function (resolve, reject) {
        let keys = key + 's';
        executeInsertUpdateQueryExpectingCount(query, values, key)
            .then(data => resolve(data[keys] && data[keys].length > 0 ? data[keys][0] : null))
            .catch(err => reject(err));
    });
}

var executeInsertUpdateQueryExpectingId = function (query, values) {
    return executeInsertUpdateQueryExpectingKey(query, values, 'id');
}

/**
 *
 * @param functionName
 * @param parametersList
 * @returns {any}
 */
var executeFunction = function (functionName, parametersList) {
    return db.func(functionName, parametersList);
};

var executeSQLFile = function (sqlFullPath, options) {
    return new PGP.QueryFile(sqlFullPath, options);
};

/**
 *
 * @param columnList
 */
var getColumnSet = function (columnList) {
    return new PGP.helpers.ColumnSet(columnList);
};

module.exports = {
    PGP: PGP,
    getTableName: getTableName,
    getSelectQuery: getSelectQuery,
    getSelectCountQuery: getSelectCountQuery,
    getInsertQuery: getInsertQuery,
    getUpdateQuery: getUpdateQuery,
    getCondition: getCondition,
    executeFunction: executeFunction,
    executeSQLFile: executeSQLFile,
    getColumnSet: getColumnSet,
    executeQueryExpectingAnyRows: executeQueryExpectingAnyRows,
    executeQueryExpectingOneOrNoneRows: executeQueryExpectingOneOrNoneRows,
    executeInsertUpdateQueryExpectingKeys: executeInsertUpdateQueryExpectingKeys,
    executeInsertUpdateQueryExpectingCount: executeInsertUpdateQueryExpectingCount,
    executeInsertUpdateQueryExpectingCountAndIds: executeInsertUpdateQueryExpectingCountAndIds,
    executeInsertUpdateQueryExpectingKey: executeInsertUpdateQueryExpectingKey,
    executeInsertUpdateQueryExpectingId: executeInsertUpdateQueryExpectingId,
};