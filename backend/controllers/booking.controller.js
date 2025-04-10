import Booking from "../models/booking.model.js";
import User from "../models/customer.model.js";
import nodemailer from "nodemailer";
import generateInvoice from "../config/invoice.js";
import fs from "fs";
const logo = "../media/logo.png";

import dotenv from "dotenv";
dotenv.config();

export const getBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    console.log(bookings);
    res.json({ message: bookings });
  } catch (error) {
    next(error);
  }
};

export const getUpdateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json({ message: booking });
  } catch (error) {
    next(error);
  }
};

export const sendEmailResponsee = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    const invoiceData = {
      logo: logo,
      customerName: booking.fullname,
      email: booking.email,
      date: new Date().toLocaleDateString(),

      service_type: booking.service_type,
      startTime: booking.startTime,
      endTime: booking.endTime,
      selectedDate: booking.selectedDate,
      selectedDay: booking.selectedDay,

      deposit: booking.price || 100,
    };

    const invoicePath = await generateInvoice(invoiceData);

    if (!fs.existsSync(invoicePath)) {
      return res
        .status(500)
        .json({ message: "Invoice file generation failed" });
    }

    const { response } = req.body;
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
      subject: "Booking Confirmation & Invoice",
      text: response,
      attachments: [{ filename: "invoice.pdf", path: invoicePath }],
    };

    await transporter.sendMail(mailOptions);

    await Booking.findByIdAndUpdate(booking._id, {
      $set: { status: "Responded" },
    });

    fs.unlinkSync(invoicePath);

    res.json({ message: "Email sent with invoice, status updated!" });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.json({ message: "Deleted Enquiry!" });
  } catch (error) {
    return next(error);
  }
};
