import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateInvoice = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    const invoicesDir = path.join(process.cwd(), "invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const invoicePath = path.join(invoicesDir, `invoice-${Date.now()}.pdf`);
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    doc.moveDown().moveDown();
    doc.fillColor("black").fontSize(12).text("ESQUARED MEDIA", 50, 150);
    doc.fontSize(10).text("eeasquarede@ggmail.com");
    doc.text("0743667893");

    doc.fontSize(12).fillColor("black").text("Bill To:", 400, 150);
    doc.font("Helvetica-Bold").text(invoiceData.customerName, 460, 150);

    doc.font("Helvetica").fontSize(10).text("Date:", 400, 185);
    doc.text(invoiceData.date, 460, 185);
    doc.text("Payment:", 400, 200);
    doc.text("Deposit Invoice", 460, 200);

    doc.moveDown();
    doc.font("Helvetica-Bold").fillColor("#333333").fontSize(14);
    doc.text(
      "Balance Due After Confirmation: ₹" +
        (invoiceData.deposit * 2.5 - invoiceData.deposit),
      400,
      230
    );

    doc.moveDown();

    const tableTop = 280;
    const columnWidths = [150, 100, 100, 100, 100];

    doc.fillColor("black").fontSize(10);
    doc.rect(50, tableTop, 500, 20).fill("#444").stroke();
    doc.fillColor("white").text("Service", 55, tableTop + 5);
    doc.text("Date", 205, tableTop + 5);
    doc.text("Time", 305, tableTop + 5);
    doc.text("Status", 405, tableTop + 5);
    doc.text("Deposit", 505, tableTop + 5);

    let position = tableTop + 25;
    doc.fillColor("black");

    const deposit = parseFloat(invoiceData.deposit);
    if (isNaN(deposit)) {
      console.warn("Invalid deposit value for item:", invoiceData.name);
      return;
    }

    doc.text(invoiceData.service_type, 55, position);
    doc.text(invoiceData.date, 205, position);
    doc.text(invoiceData.startTime + "-" + invoiceData.endTime, 305, position);
    doc.text("Confirmed", 405, position);
    doc.text(deposit.toFixed(2), 505, position);
    position += 20;

    doc.moveDown().moveDown();
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#666666")
      .text("Notes:", 50, position + 50);
    doc
      .fillColor("black")
      .text("Thanks for being an awesome customer!", 50, position + 65);

    doc.moveDown();
    doc.fillColor("#666666").text("Terms:", 50, position + 95);
    doc
      .fillColor("black")
      .text(
        "This invoice is auto-generated at the time of delivery. If there is any issue, contact the provider.",
        50,
        position + 110,
        { width: 500 }
      );

    doc.end();

    writeStream.on("finish", () => resolve(invoicePath));
    writeStream.on("error", reject);
  });
};

export default generateInvoice;
