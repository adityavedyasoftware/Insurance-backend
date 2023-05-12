const { getUpdateQuery } = require('../db/utils/db-manager')
const udw = require('../db/utils/db-wrapper')
const PGP = udw.PGP
const db = udw.DB

module.exports.updatePersonalDetails = async (req, res) => {
    
    const {
        id,
        full_name,
        phone_number,
        father_name,
        mother_name,
        gender,
        maritial_status,
        dob,
        age,
        age_proof,
        place_of_birth,
        residential_status,
        citizenship
    } = req.body
    let updateCustomerDetails = {
        id,
        full_name,
        phone_number,
        father_name,
        mother_name,
        gender,
        maritial_status,
        dob,
        age,
        age_proof,
        place_of_birth,
        residential_status,
        citizenship
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateCustomerDetails), { table: 'personal_details' })

    const query = getUpdateQuery(updateCustomerDetails, columnSet, 'personal_details', "id");
    console.log(query)

    try {
        const result = await db.any(query,id)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}


module.exports.updateCommunicationDetails = async(req, res) =>{
    const {
        commId,
        personalId,
        alternatePhoneNumber,
        email,
        permanentAddress,
        presentAddress
    } = req.body
    const updateCommunicationDetails = {
        comm_id: commId,
        personal_id: personalId,
        alternate_phone_number: alternatePhoneNumber,
        email,
        permanent_address: permanentAddress,
        present_address: presentAddress
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateCommunicationDetails))

    const query = getUpdateQuery(updateCommunicationDetails, columnSet, 'communication_details', ['personal_id','comm_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, commId)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updateKycDetails = async(req, res) =>{
    const {
        kycId,
        personalId,
        tax,
        panNumber,
        aadharNumber,
        proofIdentity,
        addressProof,
        gstAct
    } = req.body


    const updateKycDetails = {

        kyc_id: kycId,
        personal_id: personalId,
        tax,
        pan_number: panNumber,
        aadhar_number: aadharNumber,
        proof_identity: proofIdentity,
        address_proof: addressProof,
        gst_act: gstAct
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateKycDetails))

    const query = getUpdateQuery(updateKycDetails, columnSet, 'kyc_details', ['personal_id','kyc_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, kycId)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updateOccupationDetails = async(req, res) =>{
    const {
        occupId,
        personalId,
        presentOccupation,
        natureOfDuty,
        presentEmployer,
        serviceLength,
        annualIncome,
        sourceOfIncome,
        educationalQualification,
        purposeOfInsurance,
        armedForceEmployed
    } = req.body

    const updateOccupationDetails = {
        occup_id: occupId,
        personal_id: personalId,
        present_occupation: presentOccupation,
        nature_of_duty: natureOfDuty,
        present_employer: presentEmployer,
        service_length: serviceLength,
        annual_income: annualIncome,
        source_of_income: sourceOfIncome,
        educational_qualification: educationalQualification,
        purpose_of_insurance: purposeOfInsurance,
        armed_force_employed: armedForceEmployed
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateOccupationDetails))

    const query = getUpdateQuery(updateOccupationDetails, columnSet, 'occupation_details', ['personal_id','occup_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, occupId)
        console.log(result)
        return res.status(200).send('Successfully Updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updateMedicalDetails = async(req, res) =>{
    const {
        medId,
        personalId,
        alcohilicDrink,
        narcotics,
        smokeConsume,
        stateOfHealth,
        anyOperation,
        height,
        weights,
        identificationMark
    } = req.body


    const updateMedicalDetails = {
        med_id: medId,
        personal_id: personalId,
        alcohilic_drink: alcohilicDrink,
        narcotics,
        smoke_consume: smokeConsume,
        state_of_health: stateOfHealth,
        any_operation: anyOperation,
        height,
        weights,
        identification_mark: identificationMark
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateMedicalDetails))

    const query = getUpdateQuery(updateMedicalDetails, columnSet, 'medical_details', ['personal_id','med_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, medId)
        console.log(result)
        return res.status(200).send('Successfully Updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updatePreviousDetails = async(req, res) =>{
    const {
        prevId,
        personalId,
        prevPolicyNumber,
        plan,
        permiumPayingTerm,
        sumAssured
    } = req.body
    console.log(req.body)
    const updatePreviousDetails = {
        prev_id: prevId,
        personal_id: personalId,
        prev_policy_number: prevPolicyNumber,
        plan,
        permium_paying_term: permiumPayingTerm,
        sum_assured: sumAssured
    }
    console.log(updatePreviousDetails)
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updatePreviousDetails))

    const query = getUpdateQuery(updatePreviousDetails, columnSet, 'previous_details', ['personal_id','prev_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, prevId)
        console.log(result)
        return res.status(200).send('Successfully Updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updateBankDetails = async(req, res) =>{
    const {
        personalId,
        accountType,
        accountNumber,
        ifsc,
        bankName
    } = req.body


    const updateBankDetails = {
        personal_id: personalId,
        account_type: accountType,
        account_number: accountNumber,
        ifsc,
        bank_name: bankName
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateBankDetails))

    const query = getUpdateQuery(updateBankDetails, columnSet, 'bank_details', ['personal_id','account_number'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, accountNumber)
        console.log(result)
        return res.status(200).send('Successfully Updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.updateFamilyDetails = async(req, res) =>{
    const {
        famId,
        personalId,
        fatherAge,
        fatherLiving,
        motherAge,
        motherLiving,
        brotherAge,
        brotherLiving,
        sisterAge,
        sisterLiving,
    } = req.body

    const updateFamilyDetails = {
        fam_id: famId,
        personal_id: personalId,
        father_age: fatherAge,
        father_living: fatherLiving,
        mother_age: motherAge,
        mother_living: motherLiving,
        brother_age: brotherAge,
        brother_living: brotherLiving,
        sister_age: sisterAge,
        sister_living: sisterLiving,
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(updateFamilyDetails))

    const query = getUpdateQuery(updateFamilyDetails, columnSet, 'family_details', ['personal_id','fam_id'])
    console.log(query);
    try {
        const result = await db.any(query,personalId, famId)
        console.log(result)
        return res.status(200).send('Successfully Updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}