const express = require('express');

const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const insurancespec = path.join(__dirname, 'insurance-api.yaml');
let data = {};
let port = 5000

try {
    let fileContents = fs.readFileSync(insurancespec, 'utf8');
    data = yaml.load(fileContents);
} catch (e) {
    console.log(e);
}
var swaggerUi = require('swagger-ui-express');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(data));
const OpenApiValidator = require('express-openapi-validator');
app.use(
    OpenApiValidator.middleware({
        apiSpec: insurancespec,
        validateRequests: true,
        validateResponses: false,
        ignorePaths: /^.*\/query\/poll\/[-0-9a-z]+$/,
        formats: [{
            name: '32 byte string',
            type: 'string',
            validate: v => /^[-a-zA-Z0-9]{32}$/.test(v)
        },
        //  {
        //     name: '<user-id>@<ncg-id>',
        //     type: 'string',
        //     validate: healthIdValidator
        // }, {
        //     name: 'healthid',
        //     type: 'string',
        //     validate: v => healthIdValidator
        // }
    ],
        unknownFormats: ['string']
    }),
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/insurance',require('./router/index').router)
app.get('/',(req,res)=>{
    res.send('Hello')
})
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})

// test()