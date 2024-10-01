USE dentistry_system_database;

-- TREATMENT PLAN
DELIMITER // 
CREATE PROCEDURE procedure_to_register_treatment_plan(
    IN p_plan_details TEXT,
    IN p_estimated_cost DECIMAL(10, 2),
    IN p_treatment_category_id INT
)
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error registering treatment plan item.';
    END;
    START TRANSACTION; 
        INSERT INTO treatment_plan (plan_details, estimated_cost, createdAt, updatedAt, treatment_category_id)
        VALUES (p_plan_details, p_estimated_cost, NOW(), NOW(), p_treatment_category_id);
    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE procedure_to_update_treatment_plan(
    IN p_id INT,
    IN p_plan_details TEXT,
    IN p_estimated_cost DECIMAL(10, 2),
    IN p_treatment_category_id INT
)
BEGIN 
    DECLARE v_existing_status BOOLEAN;
    SELECT IFNULL(status, TRUE) INTO v_existing_status
    FROM treatment_plan
    WHERE id = p_id;
    IF v_existing_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item does not exist.';
    ELSEIF v_existing_status = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item exists but is logically deleted.';
    ELSE
        UPDATE treatment_plan
        SET plan_details = p_plan_details,
            estimated_cost = p_estimated_cost,
            updatedAt = NOW(),
            treatment_category_id = p_treatment_category_id
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE procedure_to_delete_logically_treatment_plan(
    IN p_id INT
)
BEGIN
    DECLARE treatment_plan_exists INT;
    DECLARE treatment_plan_status BOOLEAN;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error processing treatment plan logical deletion.';
    END;
    SELECT COUNT(*)
    INTO treatment_plan_exists
    FROM treatment_plan
    WHERE id = p_id;
    IF treatment_plan_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item does not exist.';
    ELSE
        SELECT status
        INTO treatment_plan_status
        FROM treatment_plan
        WHERE id = p_id;
        IF treatment_plan_status = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item has already been logically deleted.';
        ELSE
            START TRANSACTION;
                UPDATE treatment_plan
                SET status = false
                WHERE id = p_id;
            COMMIT;
        END IF;
    END IF;
END //
DELIMITER ;

-- TREATMENT CATEGORY
DELIMITER // 
CREATE PROCEDURE procedure_to_register_treatment_category(
    IN p_name TEXT
)
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error registering treatment plan item.';
    END;
    START TRANSACTION; 
        INSERT INTO treatment_category (name, createdAt, updatedAt)
        VALUES (p_name, NOW(), NOW());
    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE procedure_to_update_treatment_category(
    IN p_id INT,
    IN p_name TEXT
)
BEGIN 
    DECLARE v_existing_status BOOLEAN;
    SELECT IFNULL(status, TRUE) INTO v_existing_status
    FROM treatment_category
    WHERE id = p_id;
    IF v_existing_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment category item does not exist.';
    ELSEIF v_existing_status = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment category item exists but is logically deleted.';
    ELSE
        UPDATE treatment_category
        SET name = p_name,
            updatedAt = NOW()
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE procedure_to_delete_logically_treatment_category(
    IN p_id INT
)
BEGIN
    DECLARE treatment_plan_exists INT;
    DECLARE treatment_plan_status BOOLEAN;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error processing treatment plan logical deletion.';
    END;
    SELECT COUNT(*)
    INTO treatment_plan_exists
    FROM treatment_category
    WHERE id = p_id;
    IF treatment_plan_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item does not exist.';
    ELSE
        SELECT status
        INTO treatment_plan_status
        FROM treatment_category
        WHERE id = p_id;
        IF treatment_plan_status = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'treatment plan item has already been logically deleted.';
        ELSE
            START TRANSACTION;
                UPDATE treatment_category
                SET status = false
                WHERE id = p_id;
            COMMIT;
        END IF;
    END IF;
END //
DELIMITER ;