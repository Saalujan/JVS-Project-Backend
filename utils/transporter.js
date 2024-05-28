import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "healerz763@gmail.com",
    pass: "reyx mitu tsmn quej",
  },
});

export default transporter;
