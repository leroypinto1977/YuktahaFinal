import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

export default function WorkshopRegistrationEmail({
  userName,
  workshopName,
  workshopId,
}) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Heading style={{ color: "#333", fontSize: "24px" }}>
            Thank You, {userName}!
          </Heading>
          <Text style={{ color: "#555", fontSize: "16px" }}>
            You have successfully registered for the following workshop:
          </Text>
          <Text style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}>
            Workshop Name: {workshopName}
          </Text>
          <Text style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}>
            Workshop ID: {workshopId}
          </Text>
          <Text style={{ color: "#555", fontSize: "16px", marginTop: "20px" }}>
            We look forward to seeing you at the workshop!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
