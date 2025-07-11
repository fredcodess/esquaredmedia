import Booking from "../models/booking.model.js";
import nodemailer from "nodemailer";
import Agenda from "agenda";

export const sendConfirmationEmail = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    const adminEmail = process.env.ADMIN_EMAIL;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: adminEmail,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    const mailOptions = {
      from: `E-Squared <${adminEmail}>`,
      to: booking.email,
      subject: "Booking Confirmation",
      html: `
<h2>Booking Confirmation</h2>
<p>Dear ${booking.fullname || "Valued Customer"},</p>
<p>Thank you for your booking with E-Squared! We have successfully received your booking details.</p>
<p>A staff member will be in touch with you shortly to confirm your booking and provide any further information.</p>
<p>If you have any questions in the meantime, please feel free to contact us at ${adminEmail}.</p>
<p>Best regards,<br>The E-Squared Team</p>
`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent" });
  } catch (error) {
    next(error);
  }
};

const agenda = new Agenda({
  db: {
    address:
      process.env.MONGODB_URI || "mongodb://localhost:27017/esquaredmedia",
    collection: "bookings",
  },
  processEvery: "1 minute",
});

const sendAdminReminderEmail = async (booking) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: adminEmail,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    const eventDateFormatted = new Date(
      booking.selectedDate
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const mailOptions = {
      from: `E-Squared <${adminEmail}>`,
      to: adminEmail,
      subject: `Reminder: Upcoming Booking Tomorrow on ${eventDateFormatted}`,
      text: `
Dear Admin,

This is a reminder for an upcoming booking scheduled tomorrow.

Booking Details:
- Customer: ${booking.fullname}
- Event Date: ${eventDateFormatted}
- From: ${booking.startTime} - ${booking.endTime}
- Customer Email: ${booking.email}

Please review the booking and contact the customer if necessary.

E-Squared System
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent for booking ${booking._id}`);
  } catch (error) {
    console.error(
      `Error sending reminder email for booking ${booking._id}:`,
      error
    );
  }
};

// Function to check for bookings 1 day from now
const checkUpcomingBookings = async () => {
  try {
    const now = new Date();
    const targetDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    );

    targetDate.setUTCHours(0, 0, 0, 0);

    const endOfTargetDate = new Date(targetDate);
    endOfTargetDate.setUTCHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      selectedDate: {
        $gte: targetDate,
        $lte: endOfTargetDate,
      },
    });

    for (const booking of bookings) {
      await sendAdminReminderEmail(booking);
    }
    console.log(
      `Checked for bookings on ${targetDate.toISOString()}: ${
        bookings.length
      } found`
    );
  } catch (error) {
    console.error("Error checking upcoming bookings:", error);
  }
};

agenda.define("check upcoming bookings", async (job) => {
  console.log(
    "Running check upcoming bookings job at",
    new Date().toISOString()
  );
  await checkUpcomingBookings();
});

// Start Agenda and schedule the job
(async () => {
  try {
    await agenda.start();
    console.log("Agenda started successfully");

    await agenda.every("17 11 * * *", "check upcoming bookings");
  } catch (error) {
    console.error("Error starting Agenda or scheduling job:", error);
  }
})();
