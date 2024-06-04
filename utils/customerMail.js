import transporter from "./transporter.js";

const sendVehicleAddEmail = async (customerEmail, customerName, vehicle) => {
  return new Promise((resolve, reject) => {
    const features = vehicle.features ? vehicle.features.join(", ") : "N/A";
    const vehicleDetails = `
        <p><strong>Name:</strong> ${vehicle.name}</p>
        <p><strong>Register No:</strong> ${vehicle.registerno}</p>
        <p><strong>Type:</strong> ${vehicle.type}</p>
        <p><strong>Brand:</strong> ${vehicle.brand}</p>
        <p><strong>Model:</strong> ${vehicle.model}</p>
        <p><strong>Price:</strong> ${vehicle.price}</p>
        <p><strong>Ownership:</strong> ${vehicle.ownership}</p>
        <p><strong>Transmission:</strong> ${vehicle.transmission}</p>
        <p><strong>Gear:</strong> ${vehicle.gear}</p>
        <p><strong>Color:</strong> ${vehicle.color}</p>
        <p><strong>Year of Manufacture:</strong> ${vehicle.yom}</p>
        <p><strong>Fuel:</strong> ${vehicle.fuel}</p>
        <p><strong>Fuel Capacity:</strong> ${vehicle.fuelcap}</p>
        <p><strong>Power:</strong> ${vehicle.power}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage}</p>
        <p><strong>No of Doors:</strong> ${vehicle.noofdoors}</p>
        <p><strong>No of Seats:</strong> ${vehicle.noofseats}</p>
        <p><strong>District:</strong> ${vehicle.district}</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
        <p><strong>Features:</strong> ${features}</p>
      `;

    const message = `
        <p style="font-weight: bold;">Dear ${customerName},</p>
        <p style="color:green;font-weight: bold;">Your vehicle "${vehicle.name}" Request has been sent successfully.</p>
        <br>
        <p>Here are the details of your vehicle:</p>
        ${vehicleDetails}
        <br>
        <p>Thank you for using our service.</p>
        <p>Regards,<br/>Jaffna Vehicle Spot (PVT) LTD</p>
      `;

    transporter.sendMail(
      {
        from: '"Jaffna Vehicle Spot (PVT) LTD" <healerz763@gmail.com>',
        to: customerEmail,
        subject: "Vehicle Addition Successful",
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending vehicle addition email:", error);
          reject(error);
        } else {
          console.log("Vehicle addition email sent to:", customerEmail);
          console.log("Message sent: %s", info.messageId);
          resolve();
        }
      }
    );
  });
};

const sendRegistrationEmail = async (email, fname, password) => {
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

const sendAccountDeletionEmail = async (email, fname) => {
  return new Promise((resolve, reject) => {
    const message = `
        <p style="font-weight: bold;">Dear ${fname},</p>
        <p style="color:red;font-weight: bold;">Your account has been deleted.</p>
        <br>
        <p>If you have any questions or concerns, please contact us.</p>
        <p>Regards,<br/>Jaffna Vehicle Spot (PVT) LTD</p>
      `;

    transporter.sendMail(
      {
        from: '"Jaffna Vehicle Spot (PVT) LTD" <healerz763@gmail.com>',
        to: email,
        subject: "Account Deletion Notification",
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending account deletion email:", error);
          reject(error);
        } else {
          console.log("Account deletion email sent to:", email);
          console.log("Message sent: %s", info.messageId);
          resolve();
        }
      }
    );
  });
};

const sendRequestConfirmEmail = async (email, fname) => {
  return new Promise((resolve, reject) => {
    const message = `
      <p style="font-weight: bold;">Dear ${fname},</p>
      <p style="color:green;font-weight: bold;">Your Purchase Request has been Send SucessFully.</p>
      <br>
      <p>Thank you for your interest in our Vehicles. We have received your purchase request and it is currently under review.</p>
      <p>We will be in touch with you within [24 hours to 48 hours ] to inform you of the approval status of your request.</p>
      <br>
      <p>If you have any questions or concerns, please contact us.</p>
      <p>Regards,<br/>Jaffna Vehicle Spot (PVT) LTD</p>
    `;

    transporter.sendMail(
      {
        from: '"Jaffna Vehicle Spot (PVT) LTD" <healerz763@gmail.com>',
        to: email,
        subject: "Purchase Request Confirmation Notification",
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending Confirm Request email:", error);
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

export {
  sendVehicleAddEmail,
  sendRegistrationEmail,
  sendAccountDeletionEmail,
  sendRequestConfirmEmail,
};
