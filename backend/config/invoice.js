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

    doc.fontSize(20).text("DEPOSIT INVOICE", 400, 50, { align: "right" });

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
      "Balance Due After Confirmation: ₹" + invoiceData.deposit,
      400,
      230
    );

    doc.moveDown();

    const tableTop = 280;
    const columnWidths = [250, 100, 100, 100];

    doc.fillColor("black").fontSize(10);
    doc.rect(50, tableTop, 500, 20).fill("#444").stroke();
    doc.fillColor("white").text("Service", 55, tableTop + 5);
    doc.text("Event", 305, tableTop + 5);
    doc.text("Status", 405, tableTop + 5);
    doc.text("Deposit", 505, tableTop + 5);

    let position = tableTop + 25;
    doc.fillColor("black");

    invoiceData.items.forEach((item) => {
      const price = parseFloat(item.price);
      if (isNaN(price)) {
        console.warn("Invalid price for item:", item.name);
        return;
      }

      const quantity = item.quantity || 1;
      const deposit = parseFloat(item.deposit);
      if (isNaN(deposit)) {
        console.warn("Invalid deposit value for item:", item.name);
        return;
      }

      doc.text(item.service_type, 55, position);
      doc.text(item.event_type, 305, position);
      doc.text("pending", 405, position);
      doc.text(deposit.toFixed(2), 505, position);
      position += 20;
    });

    const totalDeposit = parseFloat(invoiceData.deposit);
    if (isNaN(totalDeposit)) {
      console.warn("Invalid total deposit amount.");
      return;
    }

    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("PENDING", 405, position + 10);
    doc.text("₹" + totalDeposit.toFixed(2), 505, position + 10);

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
