import TreatmentCategory from '../model/TreatmentPlan.js';

const sequelize = TreatmentCategory.sequelize;

export const registerTreatmentCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { name } = req.body;
    await sequelize.query('CALL procedure_to_register_treatment_category(:name)', {
      replacements: { name: name },
      transaction: transaction
    });
    await transaction.commit();
    res.json({ message: 'Treatment Category registered successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error registering Treatment Category.', error);
    res.status(500).send('Internal Server Error.');
  }
};

export const updateTreatmenCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id, name } = req.body;
    const existingTreatmentPlan = await TreatmentCategory.findByPk(id, { transaction });
    if (!existingTreatmentPlan) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Treatment Plan record does not exist.' });
    }
    await sequelize.query('CALL procedure_to_update_treatment_category(:id, :name)', {
      replacements: { id: id, name: name },
      transaction: transaction
    });
    await transaction.commit();
    res.json({ message: 'Treatment Category updated successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating Treatment Category.', error);
    res.status(500).send('Internal Server Error.');
  }
};

export const deleteLogicallyTreatmentCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.body;
    const existingTreatmentPlan = await TreatmentCategory.findByPk(id);
    if (!existingTreatmentPlan) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Treatment Category record does not exist.' });
    }
    if (!existingTreatmentPlan.status) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Treatment Category record has already been logically deleted.' });
    }
    await sequelize.query('CALL procedure_to_delete_logically_treatment_category(:id)', {
      replacements: { id: id },
      transaction: transaction
    });
    await transaction.commit();
    res.status(200).json({ message: 'Treatment Category record logically deleted successfully.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting Treatment Category logically.', error);
    res.status(500).send('Internal Server Error.');
  }
};