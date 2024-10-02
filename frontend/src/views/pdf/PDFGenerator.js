import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LogoRic from '../../assets/images/logos/IMG-20240709-WA0007.jpg';

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
  fullNamePatient,
  hallazgosRx,
  hallazgosClinico,
  consentimiento
}) => {
  const doc = new jsPDF();

  // Agregar el logo en la parte superior izquierda
  const logoWidth = 20; // ancho del logo
  const logoHeight = 20; // alto del logo
  doc.addImage(LogoRic, 'JPEG', 10, 10, logoWidth, logoHeight); // Ajusta las posiciones y tamaños según sea necesario

  // Título
  doc.setFontSize(18);
  doc.text('CLINICA DENTAL RC', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

  // Datos del paciente
  doc.setFontSize(14);
  doc.text('DATOS DEL PACIENTE', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Nombre del paciente: ${fullNamePatient}`, 14, 40);

  // Cuestionario de salud
  doc.setFontSize(14);
  doc.text('CUESTIONARIO DE SALUD', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });
  doc.setFontSize(12);

  // Preguntas del cuestionario
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

  // Evaluación física
  doc.setFontSize(14);
  doc.text('EVALUACION FISICA', doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Presión arterial: ${bloodPressure}`, 14, 190);
  doc.text(`Azúcar en sangre: ${bloodSugar}`, 14, 200);
  doc.text(`Último tratamiento: ${lastTreatment}`, 14, 210);
  doc.text(`Otros datos: ${otherData}`, 14, 220);

  // Tratamientos
  doc.setFontSize(14);
  doc.text('TRATAMIENTOS', doc.internal.pageSize.getWidth() / 2, 230, { align: 'center' });
  doc.autoTable({
    startY: 240,
    head: [['Tratamiento', 'Costo', 'Fecha']],
    body: treatments.map(t => [t.treatment, t.cost, t.date])
  });

  // Presupuesto
  doc.setFontSize(14);
  doc.text('PRESUPUESTO', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY + 10, { align: 'center' });
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Tratamiento', 'Costo']],
    body: budgetItems.map(b => [b.treatment, b.cost])
  });

  // Consentimiento informado
  doc.setFontSize(14);
  doc.text('CONSENTIMIENTO INFORMADO', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY + 30, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Hallazgos Clínicos y Rx: ${hallazgosRx}`, 14, doc.lastAutoTable.finalY + 40);
  doc.text(`Hallazgos Intraorales: ${hallazgosClinico}`, 14, doc.lastAutoTable.finalY + 50);
  doc.text(`Consentimiento Informado: ${consentimiento}`, 14, doc.lastAutoTable.finalY + 60);

  // Firmas
  doc.setFontSize(14);
  doc.text('FIRMA DEL PACIENTE:', 14, doc.lastAutoTable.finalY + 80);
  doc.line(14, doc.lastAutoTable.finalY + 85, 150, doc.lastAutoTable.finalY + 85); // Línea para firma
  doc.text('FIRMA DEL DOCTOR:', 14, doc.lastAutoTable.finalY + 100);
  doc.line(14, doc.lastAutoTable.finalY + 105, 150, doc.lastAutoTable.finalY + 105); // Línea para firma

  // Guardar PDF
  doc.save('ficha_clinica.pdf');
};