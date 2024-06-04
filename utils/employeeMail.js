import transporter from "./transporter.js";

const sendCustomerRegistrationEmail = async (email, fname, password) => {
  return new Promise((resolve, reject) => {
    const message = `
          <p style="font-weight: bold;">Dear ${fname},</p>
          <p style="color:green;font-weight: bold;">Your registration was successful.</p>
          <br>
          <p>Your Username: ${email}</p>
          <p>Your Password: ${password}</p>
          <br>
          <p>Please join us and enjoy our services.</p>
          <p>Regards,<br/>Jaffna Vehicle Spot (PVT) LTD</p>
        `;

    transporter.sendMail(
      {
        from: '"Jaffna Vehicle Spot (PVT) LTD" <your.email@example.com>',
        to: email,
        subject: "Registration Successful",
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending registration email:", error);
          reject(error);
        } else {
          console.log("Registration email sent to:", email);
          console.log("Message sent: %s", info.messageId);
          resolve();
        }
      }
    );
  });
};

export { sendCustomerRegistrationEmail};
