import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    res.json({ message: contacts });
  } catch (error) {
    next(error);
  }
};

export const getUpdateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json({ message: contact });
  } catch (error) {
    next(error);
  }
};

export const sendEmailResponse = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    const { response } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: adminEmail,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: `E-Squared <${adminEmail}>`,
      to: contact.email,
      subject: contact.subject,
      text: response,
    };

    // Send the email
    await transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        return next(error);
      }

      const contactId = contact._id;
      const responded = "Responded";

      await Contact.findByIdAndUpdate(contactId, {
        $set: {
          status: responded,
        },
      });

      res.json({
        message: "Email sent and contact status updated successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.deleteOne();

    res.json({ message: "Deleted Enquiry!" });
  } catch (error) {
    return next(error);
  }
};
