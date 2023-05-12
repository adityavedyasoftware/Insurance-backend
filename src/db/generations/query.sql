SELECT *
FROM personal_details p
FULL JOIN communication_details c ON p.id = c.personal_id
FULL JOIN kyc_details k ON p.id = k.personal_id
FULL JOIN occupation_details ON p.id = occupation_details.personal_id
FULL JOIN medical_details m ON p.id = m.personal_id
FULL JOIN previous_details ON p.id = previous_details.personal_id
FULL JOIN bank_details b ON p.id = b.personal_id
FULL JOIN family_details f ON p.id = f.personal_id
 WHERE p.id = $1;