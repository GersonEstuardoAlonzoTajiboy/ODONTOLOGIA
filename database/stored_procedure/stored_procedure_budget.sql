USE dentistry_system_database;

DELIMITER //
CREATE PROCEDURE procedure_to_register_multiple_budget(
    IN p_treatments_json JSON,
    IN p_patient_id INT
)
BEGIN
    DECLARE v_treatment VARCHAR(255);
    DECLARE v_cost DECIMAL(10, 2);
    DECLARE v_treatment_count INT DEFAULT 0;
    DECLARE v_idx INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error registering treatments.';
    END;
    START TRANSACTION;
    SET v_treatment_count = JSON_LENGTH(p_treatments_json);
    WHILE v_idx < v_treatment_count DO
        SET v_treatment = JSON_UNQUOTE(JSON_EXTRACT(p_treatments_json, CONCAT('$[', v_idx, '].treatment')));
        SET v_cost = JSON_UNQUOTE(JSON_EXTRACT(p_treatments_json, CONCAT('$[', v_idx, '].cost')));
        INSERT INTO budget (treatment, cost, createdAt, updatedAt, patient_id) VALUES (v_treatment, v_cost, NOW(), NOW(), p_patient_id);
        SET v_idx = v_idx + 1;
    END WHILE;
    COMMIT;
END //
DELIMITER ;