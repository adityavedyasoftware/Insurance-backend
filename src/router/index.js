let Express = require('express');
const { createCustomerDetails, getAllCustomerDetails, getCustomerDetailsById, createCommunicationDetails, createKycDetails, createOccupationDetails, createMedicalDetails, createBankDetails, createFamilyDetails } = require('../controller/insurance-customer');
const { createSqlDb } = require('../middleware/dbCreation');

let router = Express.Router();

router.post('/customer/details',
createCustomerDetails
)

router.get('/customers',
getAllCustomerDetails
)

router.get('/customer/details/:id',
getCustomerDetailsById
)

router.post('/communication/details',
createCommunicationDetails
)

router.post('/kyc/details',
createSqlDb,
createKycDetails
)


router.post('/occupation/details',
createSqlDb,
createOccupationDetails
)

router.post('/medical/details',
createSqlDb,
createMedicalDetails
)
router.post('/bank/details',
createSqlDb,
createBankDetails
)
router.post('/family/details',
createSqlDb,
createFamilyDetails
)
module.exports.router = router;