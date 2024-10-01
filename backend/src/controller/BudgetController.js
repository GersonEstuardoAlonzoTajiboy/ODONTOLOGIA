import Budget from '../model/Budget.js';

const sequelize = Budget.sequelize;

export const registerBudget = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const treatments_json = JSON.stringify(req.body.treatments_json);
    const { patient_id } = req.body;
    await sequelize.query('CALL procedure_to_register_multiple_budget(:treatments_json, :patient_id)', {
      replacements: { treatments_json, patient_id },
      transaction: transaction
    });
    await transaction.commit();
    res.json({ message: 'Budget registered successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error registering treatment.', error);
    res.status(500).send('Internal Server Error.');
  }
};