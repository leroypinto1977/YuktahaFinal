import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import * as React from "react";

const NTEventRegistrationEmail = ({ userName, eventName, eventId }) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Heading as="h1" style={{ color: "#2b2b2b", textAlign: "center" }}>
            🎉 Event Registration Confirmed!
          </Heading>
          <Text>
            Hi <b>{userName}</b>,
          </Text>
          <Text>
            Congratulations! You have successfully registered for the technical
            event <b>{eventName}</b>.
          </Text>
          <Text>
            Your event ID is: <b>{eventId}</b>
          </Text>
          <Text>
            Stay tuned for further event details. If you have any questions,
            feel free to reach out to us.
          </Text>
          <Text>Best regards,</Text>
          <Text>
            <b>Yuktaha 2k25 Team</b>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NTEventRegistrationEmail;
