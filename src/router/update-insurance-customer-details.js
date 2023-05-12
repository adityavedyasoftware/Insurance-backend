let Express = require('express');
const { updatePersonalDetails, updateCommunicationDetails, updateKycDetails, updateOccupationDetails, updateMedicalDetails, updatePreviousDetails, updateBankDetails, updateFamilyDetails } = require('../controller/update-insurance-details');

let router = Express.Router();

router.put('/customer/update/personal',
    updatePersonalDetails
)

router.put('/customer/update/communication',
    updateCommunicationDetails
)

router.put('/customer/update/kyc',
    updateKycDetails
)

router.put('/customer/update/occupation',
    updateOccupationDetails
)

router.put('/customer/update/medical',
    updateMedicalDetails
)

router.put('/customer/update/previous',
    updatePreviousDetails
)

router.put('/customer/update/bank',
    updateBankDetails
)

router.put('/customer/update/family',
    updateFamilyDetails
)

module.exports.router = router;