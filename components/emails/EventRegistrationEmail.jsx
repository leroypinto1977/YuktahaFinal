import * as React from "react";

export const EventRegistrationEmail = ({
  firstName,
  eventType,
  eventId,
  transactionId,
}) => (
  <div>
    <h1>Thank you, {firstName}!</h1>
    <p>You have successfully registered for the following event:</p>
    <ul>
      <li>
        <strong>Event Type:</strong> {eventType}
      </li>
      <li>
        <strong>Event ID:</strong> {eventId}
      </li>
    </ul>
    <p>
      Your transaction ID is: <strong>{transactionId}</strong>.
    </p>
    <p>Please wait for 1 hour for the transaction to be approved.</p>
    <p>Best regards,</p>
    <p>The Yuktaha 2025 Team</p>
  </div>
);

export default EventRegistrationEmail;
