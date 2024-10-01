import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const PDFGenerator = ({
  hypertension,
  hypertensionControlled,
  diabetes,
  diabetesControlled,
  hospitalized,
  allergic,
  excessiveBleeding,
  seriousIllnesses,
  isFemale,
  sheIsPregnant,
  pregnant,
  eatenLastSixHours,
  covidSymptoms,
  bloodPressure,
  bloodSugar,
  lastTreatment,
  otherData,
  treatments,
  budgetItems,
  fullNamePatient
}) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('CLINICA DENTAL RC', 14, 20);
  doc.setFontSize(14);
  doc.text('DATOS DEL PACIENTE', 14, 30);
  doc.setFontSize(12);
  doc.text(`Nombre paciente: ${fullNamePatient}`, 14, 40);
  doc.setFontSize(14);
  doc.text('CUESTIONARIO DE SALUD', 14, 50);
  doc.setFontSize(12);
  doc.text(`1. Hipertensión arterial: ${hypertension ? 'SI' : 'NO'}`, 14, 60);
  if (hypertension) {
    doc.text(`   Controlada: ${hypertensionControlled ? 'SI' : 'NO'}`, 14, 70);
  }
  doc.text(`2. Diabetes: ${diabetes ? 'SI' : 'NO'}`, 14, 80);
  if (diabetes) {
    doc.text(`   Controlada: ${diabetesControlled ? 'SI' : 'NO'}`, 14, 90);
  }
  doc.text(`3. Hospitalizado en los últimos 2 años: ${hospitalized ? 'SI' : 'NO'}`, 14, 100);
  doc.text(`4. Alergia a medicamentos: ${allergic ? 'SI' : 'NO'}`, 14, 110);
  doc.text(`5. Sangramiento excesivo: ${excessiveBleeding ? 'SI' : 'NO'}`, 14, 120);
  doc.text(`6. Enfermedades serias: ${seriousIllnesses}`, 14, 130);
  if (isFemale) {
    doc.text(`7. Embarazo: ${sheIsPregnant ? 'SI' : 'NO'}`, 14, 140);
    if (sheIsPregnant) {
      doc.text(`   Meses de embarazo: ${pregnant}`, 14, 150);
    }
  }
  doc.text(`8. Comió en las últimas 6 horas: ${eatenLastSixHours ? 'SI' : 'NO'}`, 14, 160);
  doc.text(`9. Síntomas recientes (tos, fiebre, etc.): ${covidSymptoms ? 'SI' : 'NO'}`, 14, 170);
  doc.setFontSize(14);
  doc.text('EVALUACION FISICA', 14, 180);
  doc.setFontSize(12);
  doc.text(`Presión arterial: ${bloodPressure}`, 14, 190);
  doc.text(`Azúcar en sangre: ${bloodSugar}`, 14, 200);
  doc.text(`Último tratamiento: ${lastTreatment}`, 14, 210);
  doc.text(`Otros datos: ${otherData}`, 14, 220);
  doc.setFontSize(14);
  doc.text('TRATAMIENTOS', 14, 230);
  doc.autoTable({
    startY: 240,
    head: [['Tratamiento', 'Costo', 'Fecha']],
    body: treatments.map(t => [t.treatment, t.cost, t.date])
  });
  doc.setFontSize(14);
  doc.text('PRESUPUESTO', 14, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Tratamiento', 'Costo']],
    body: budgetItems.map(b => [b.treatment, b.cost])
  });
  doc.save('ficha_clinica.pdf');
};