import TreatmentPlan from '../model/TreatmentCategory.js';

const sequelize = TreatmentPlan.sequelize;

export const registerTreatmentPlan = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { plan_details, estimated_cost } = req.body;
    await sequelize.query('CALL procedure_to_register_treatment_plan(:plan_details, :estimated_cost)', {
      replacements: { plan_details: plan_details, estimated_cost: estimated_cost },
      transaction: transaction
    });
    await transaction.commit();
    res.json({ message: 'Treatment Plan registered successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error registering Treatment Plan.', error);
    res.status(500).send('Internal Server Error.');
  }
};

export const updateTreatmentPlan = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id, plan_details, estimated_cost } = req.body;
    const existingTreatmentPlan = await TreatmentPlan.findByPk(id, { transaction });
    if (!existingTreatmentPlan) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Treatment Plan record does not exist.' });
    }
    await sequelize.query('CALL procedure_to_update_treatment_plan(:id, :plan_details, :estimated_cost)', {
      replacements: { id: id, plan_details: plan_details, estimated_cost: estimated_cost },
      transaction: transaction
    });
    await transaction.commit();
    res.json({ message: 'Treatment Plan updated successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating Treatment Plan.', error);
    res.status(500).send('Internal Server Error.');
  }
};

export const deleteLogicallyTreatmentPlan = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.body;
    const existingTreatmentPlan = await TreatmentPlan.findByPk(id);
    if (!existingTreatmentPlan) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Treatment Plan record does not exist.' });
    }
    if (!existingTreatmentPlan.status) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Treatment Plan record has already been logically deleted.' });
    }
    await sequelize.query('CALL procedure_to_delete_logically_treatment_plan(:id)', {
      replacements: { id: id },
      transaction: transaction
    });
    await transaction.commit();
    res.status(200).json({ message: 'Treatment Plan record logically deleted successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting Treatment Plan logically.', error);
    res.status(500).send('Internal Server Error.');
  }
};