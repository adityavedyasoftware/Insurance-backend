const { uuid } = require("uuidv4")
const dbManager = require("../db/utils/db-manager")
const udw = require('../db/utils/db-wrapper')
const PGP = udw.PGP
const db = udw.DB

module.exports.createCustomerDetails = async (req, res) => {
    console.log(req.body)
    const {
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

    let uid = uuid()

    let columnSet = new PGP.helpers.ColumnSet([
        {
            name: 'id',
            prop: 'id'
        },
        {
            name: 'full_name',
            prop: 'full_name'
        },
        {
            name: 'phone_number',
            prop: 'phone_number'
        },
        {
            name: 'father_name',
            prop: 'father_name'
        },
        {
            name: 'mother_name',
            prop: 'mother_name'
        },
        {
            name: 'gender',
            prop: 'gender'
        },
        {
            name: 'maritial_status',
            prop: 'maritial_status'
        },
        {
            name: 'dob',
            prop: 'dob'
        },
        {
            name: 'age',
            prop: 'age'
        },
        {
            name: 'age_proof',
            prop: 'age_proof'
        },
        {
            name: 'place_of_birth',
            prop: 'place_of_birth'
        },
        {
            name: 'residential_status',
            prop: 'residential_status'
        },
        {
            name: 'citizenship',
            prop: 'citizenship'
        }
    ], {
        table: 'personal_details'
    })

    let customerDetails = {
        id: uid,
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

    const query = PGP.helpers.insert(customerDetails, columnSet)
    // const returningQuery = query + ' RETURNING id'
    console.log(query)
    try {
        const result = await dbManager.executeInsertUpdateQueryExpectingId(query)
        console.log(result)
        return res.status(200).send({
            id: result,
            msg: 'Success'
        })

    } catch (error) {
        return res.status(500).send(error)
    }

}

module.exports.getAllCustomerDetails = async (req, res) => {
    let tableName = dbManager.getTableName('personal_details', 'public')
    try {
        const query = 'SELECT * FROM $1'
        const result = await db.any(query, tableName)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.getPersonalDetailsById = async (req, res) => {

    let tableName = dbManager.getTableName('personal_details', 'public')
    let id = req.params.id

    try {
        const query = 'SELECT * FROM $1 WHERE id=$2'
        const result = await db.query(query, [tableName, id])
        console.log(query)
        return res.status(200).send(result[0])
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createCommunicationDetails = async (req, res) => {
    const {
        personalId,
        alternatePhoneNumber,
        email,
        permanentAddress,
        presentAddress
    } = req.body

    const comm_id = uuid()

    const communicationDetails = {

        comm_id: comm_id,
        personal_id: personalId,
        alternate_phone_number: alternatePhoneNumber,
        email,
        permanent_address: permanentAddress,
        present_address: presentAddress
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(communicationDetails), { table: 'communication_details' })

    const query = PGP.helpers.insert(communicationDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createKycDetails = async (req, res) => {
    const {
        personalId,
        tax,
        panNumber,
        aadharNumber,
        proofIdentity,
        addressProof,
        gstAct
    } = req.body

    const id = uuid()

    const kycDetails = {

        kyc_id: id,
        personal_id: personalId,
        tax,
        pan_number: panNumber,
        aadhar_number: aadharNumber,
        proof_identity: proofIdentity,
        address_proof: addressProof,
        gst_act: gstAct
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(kycDetails), { table: 'kyc_details' })

    const query = PGP.helpers.insert(kycDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createOccupationDetails = async (req, res) => {
    const {
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

    const id = uuid()

    const occupationDetails = {
        occup_id: id,
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
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(occupationDetails), { table: 'occupation_details' })

    const query = PGP.helpers.insert(occupationDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createMedicalDetails = async (req, res) => {
    const {
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

    const id = uuid()

    const medicalDetails = {
        med_id: id,
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
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(medicalDetails), { table: 'medical_details' })

    const query = PGP.helpers.insert(medicalDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createPreviousDetails = async (req, res) => {
    const {
        personalId,
        prevPolicyNumber,
        plan,
        permiumPayingTerm,
        sumAssured
    } = req.body

    const id = uuid()

    const previousDetails = {
        prev_id: id,
        personal_id: personalId,
        prev_policy_number: prevPolicyNumber,
        plan,
        permium_paying_term: permiumPayingTerm,
        sum_assured: sumAssured
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(previousDetails), { table: 'previous_details' })

    const query = PGP.helpers.insert(previousDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createBankDetails = async (req, res) => {
    const {
        personalId,
        accountType,
        accountNumber,
        ifsc,
        bankName
    } = req.body


    const bankDetails = {
        personal_id: personalId,
        account_type: accountType,
        account_number: accountNumber,
        ifsc,
        bank_name: bankName
    }
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(bankDetails), { table: 'bank_details' })

    const query = PGP.helpers.insert(bankDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.createFamilyDetails = async (req, res) => {
    const {
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

    const id = uuid()
    const familyDetails = {
        fam_id: id,
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
    const columnSet = new PGP.helpers.ColumnSet(Object.keys(familyDetails), { table: 'family_details' })

    const query = PGP.helpers.insert(familyDetails, columnSet)
    console.log(query);
    try {
        const result = await db.none(query)
        console.log(result)
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(500).send(error)
    }
}