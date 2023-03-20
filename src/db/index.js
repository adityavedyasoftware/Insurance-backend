var path = require('path');
const { PGP } = require('../utils/db-wrapper');

function sql(file) {
    const fullPath = path.join(__dirname, file); // generating full path;
    console.log(fullPath)
    return new PGP.QueryFile(fullPath, {minify: true});
}

module.exports = {
    user: {
        add: sql('./generations/createtable.sql')
    }
}