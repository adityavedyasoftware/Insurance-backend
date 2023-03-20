-- DROP DATABASE IF EXISTS insurances;
-- CREATE DATABASE insurances;
-- DROP TABLE IF EXISTS testp;
CREATE TABLE IF NOT EXISTS testp
(
    id        INT,
    type_name VARCHAR(31),
    primary key (id)
);
ALTER TABLE testp
    OWNER TO postgres;

-- DROP TABLE IF EXISTS Personal_Details;

CREATE TABLE IF NOT EXISTS Personal_Details (
    id uuid PRIMARY KEY,
    full_name VARCHAR(200),
    phone_number BIGINT,
    father_name VARCHAR(200),
    mother_name VARCHAR(200),
    gender VARCHAR(20),
    maritial_status VARCHAR(20),
    dob DATE,
    age SMALLINT,
    age_proof VARCHAR(200),
    place_of_birth VARCHAR(200),
    residential_status VARCHAR(200),
    citizenship VARCHAR(50)
);


ALTER TABLE Personal_Details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS communication_details (
    comm_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    alternate_phone_number varchar(255),
    email varchar(255),
    permanent_address varchar(255),
    present_address varchar(255)

);

ALTER TABLE communication_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS kyc_details (
    kyc_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    tax varchar(255),
    pan_number varchar(255) UNIQUE,
    aadhar_number varchar(255) UNIQUE,
    proof_identity varchar(255),
    address_proof varchar(255),
    gst_act varchar(255)
);

ALTER TABLE kyc_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS occupation_details (
    occup_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    present_occupation varchar(255),
    nature_of_duty varchar(255) UNIQUE,
    present_employer varchar(255) UNIQUE,
    service_length INTEGER DEFAULT 0,
    annual_income INTEGER DEFAULT 0,
    source_of_income varchar(255),
    educational_qualification varchar(255),
    purpose_of_insurance varchar(255),
    armed_force_employed boolean DEFAULT False
);

ALTER TABLE occupation_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS medical_details (
    med_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    alcohilic_drink boolean DEFAULT False,
    narcotics boolean DEFAULT False,
    smoke_consume boolean DEFAULT False,
    state_of_health varchar(255),
    any_operation boolean DEFAULT False,
    height INTEGER DEFAULT 0,
    weights INTEGER DEFAULT 0,
    identification_mark boolean DEFAULT False
);

ALTER TABLE medical_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS previous_details (
    prev_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    prev_policy_number varchar(255),
    plan varchar(255),
    permium_paying_term varchar(255),
    sum_assured INTEGER DEFAULT 0
);

ALTER TABLE previous_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS bank_details (
    account_number bigint PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    account_type varchar(255),
    ifsc varchar(255),
    bank_name varchar(255)
);

ALTER TABLE bank_details OWNER TO postgres;

CREATE TABLE IF NOT EXISTS family_details (
    fam_id uuid PRIMARY KEY,
    personal_id uuid REFERENCES Personal_Details(id),
    father_age INTEGER DEFAULT 0,
    father_living boolean DEFAULT False,
    mother_age INTEGER DEFAULT 0,
    mother_living boolean DEFAULT False,
    brother_age INTEGER DEFAULT 0,
    brother_living boolean DEFAULT False,
    sister_age INTEGER DEFAULT 0,
    sister_living boolean DEFAULT False
);

ALTER TABLE family_details OWNER TO postgres;