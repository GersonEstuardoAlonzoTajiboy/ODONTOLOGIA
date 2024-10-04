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
  doc.text(`1. ¿Sufre de Hipertensión arterial? ${hypertension ? 'SI' : 'NO'}`, 14, 60);
  if (hypertension) {
    doc.text(` ¿Está controlada? ¿Toma su tratamiento? ${hypertensionControlled ? 'SI' : 'NO'}`, 14, 70);
  }
  doc.text(`2. ¿Sufre de Diabetes? ${diabetes ? 'SI' : 'NO'}`, 14, 80);
  if (diabetes) {
    doc.text(` ¿Está controlada? ¿Toma su tratamiento? ${diabetesControlled ? 'SI' : 'NO'}`, 14, 90);
  }
  doc.text(`3. ¿Haestado hospitalizado en los últimos dos años? ${hospitalized ? 'SI' : 'NO'}`, 14, 100);
  doc.text(`4. ¿Esalérgico a la aspirina o penicilina u otra medicina? ${allergic ? 'SI' : 'NO'}`, 14, 110);
  doc.text(`5. ¿Hatenido alguna vez algún sangramiento excesivo? ${excessiveBleeding ? 'SI' : 'NO'}`, 14, 120);
  doc.text(`6. Indique las enfermedades serias que ha padecido o que padece: ${seriousIllnesses}`, 14, 130);

  if (isFemale) {
    doc.text(`7. Si es usted mujer, indique si está embarazada ${sheIsPregnant ? 'SI' : 'NO'}`, 14, 140);
    if (sheIsPregnant) {
      doc.text(`¿Cuantos meses de embarazo? ${pregnant}`, 14, 150);
    }
  }
  doc.text(`9. ¿Ha comido algo en las últimas seis horas? ${eatenLastSixHours ? 'SI' : 'NO'}`, 14, 160);
  const question10 = `10. En el último mes ha tenido síntomas como: ¿tos, fiebre, cansancio, pérdida de olfato y gusto, dolor de garganta, dolor en el pecho, diarrea, dolor de cabeza? ${covidSymptoms ? 'SI' : 'NO'}`;
  const question10Lines = doc.splitTextToSize(question10, 180);
  const question10Y = 170;
  question10Lines.forEach((line, index) => {
    doc.text(line, 14, question10Y + (index * 10));
  });

  // Tratamientos
  doc.setFontSize(14);
  doc.text('TRATAMIENTOS', doc.internal.pageSize.getWidth() / 2, 230, { align: 'center' });
  doc.autoTable({
    startY: 240,
    head: [['Tratamiento', 'Costo', 'Fecha']],
    body: treatments.map(t => [t.treatment, t.cost, t.date])
  });

  // Tratamientos
  doc.setFontSize(14);
  doc.text('TRATAMIENTOS', doc.internal.pageSize.getWidth() / 2, 230, { align: 'center' });
  doc.autoTable({
    startY: 240,
    head: [['Tratamiento', 'Costo', 'Fecha']],
    body: treatments.map(t => [
      t.treatment,
      t.cost,
      new Date(t.date).toLocaleDateString('es-ES')
    ])
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