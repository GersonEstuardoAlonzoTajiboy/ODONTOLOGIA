USE dentistry_system_database;

DELIMITER //
CREATE PROCEDURE procedure_to_register_root_canal_treatment(
    IN p_tooth_number VARCHAR(50),
    IN p_conductometry TEXT,
    IN p_restoration BOOLEAN,
    IN p_other_data TEXT,
    IN p_patient_id INT
)
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error registering root canal treatment.';
    END;
    START TRANSACTION; 
        INSERT INTO root_canal_treatment (
            tooth_number, conductometry, restoration, other_data, createdAt, updatedAt, patient_id, creation_date
        ) VALUES (
            p_tooth_number, p_conductometry, p_restoration, p_other_data, NOW(), NOW(), p_patient_id, NOW()
        );
    COMMIT;
END //
DELIMITER ;