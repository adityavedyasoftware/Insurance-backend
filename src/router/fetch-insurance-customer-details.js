let Express = require('express');
const { getCustomerDetailsById, getAllInsuranceCustomerDetails, getCustomerCertainDetailById } = require('../controller/fetch-insurance-details');
const { getAllCustomerDetails } = require('../controller/insurance-customer');

let router = Express.Router();

router.get('/customer/all/details/:id',
getCustomerDetailsById
)

router.get('/all/customer/details',
getAllInsuranceCustomerDetails
)

router.get('/customer/:type/detail/:id',
getCustomerCertainDetailById
)

module.exports.router = router;