import * as React from "react";

export const WorkshopRegistrationEmail = ({
  firstName,
  workshopId,
  workshopDate,
  workshopTime,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
    <h1>Thank you, {firstName}!</h1>
    <p>You have successfully registered for the workshop.</p>
    <p>Here are the details of your registration:</p>
    <ul>
      <li>
        <strong>Workshop ID:</strong> {workshopId}
      </li>
      <li>
        <strong>Date:</strong> {workshopDate}
      </li>
      <li>
        <strong>Time:</strong> {workshopTime}
      </li>
    </ul>
    <p>We look forward to seeing you at the workshop!</p>
    <p>Best regards,</p>
    <p>The Workshop Team</p>
  </div>
);

export default WorkshopRegistrationEmail;
