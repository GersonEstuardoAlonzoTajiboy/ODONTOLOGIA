USE dentistry_system_database;

DELIMITER //
CREATE PROCEDURE procedure_to_register_health_questionnaire(
    IN p_hypertension BOOLEAN,
    IN p_hypertension_control BOOLEAN,
    IN p_diabetes BOOLEAN,
    IN p_diabetes_control BOOLEAN,
    IN p_hospitalization BOOLEAN,
    IN p_medicine_allergy BOOLEAN,
    IN p_bleeding BOOLEAN,
    IN p_serious_illnesses TEXT,
    IN p_pregnancy BOOLEAN,
    IN p_pregnancy_months INT,
    IN p_recent_meal BOOLEAN,
    IN p_recent_symptoms BOOLEAN,
    IN p_patient_id INT
)
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error registering health questionnaire.';
    END;
    START TRANSACTION; 
        INSERT INTO health_questionnaire (
            hypertension, hypertension_control, diabetes, diabetes_control, hospitalization,
            medicine_allergy, bleeding, serious_illnesses, pregnancy, pregnancy_months,
            recent_meal, recent_symptoms, createdAt, updatedAt, patient_id
        ) VALUES (
            p_hypertension, p_hypertension_control, p_diabetes, p_diabetes_control, p_hospitalization,
            p_medicine_allergy, p_bleeding, p_serious_illnesses, p_pregnancy, p_pregnancy_months,
            p_recent_meal, p_recent_symptoms, NOW(), NOW(), p_patient_id
        );
    COMMIT;
END //
DELIMITER ;