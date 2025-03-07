// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Text,
//   Row,
//   Column,
//   Hr,
//   Link,
// } from "@react-email/components";
// import QRCode from "qrcode";
// import * as React from "react";

// // Email template for Yuktaha registration confirmation
// export const YuktahaConfirmationEmail = async ({
//   firstName,
//   lastName,
//   email,
//   yuktahaId,
//   college,
//   department,
//   city,
//   phoneNumber,
//   yearOfStudy,
// }) => {
//   // Generate QR code for the yuktahaId
//   let qrCodeDataURL;
//   try {
//     qrCodeDataURL = await QRCode.toDataURL(
//       yuktahaId || "registration-complete",
//       {
//         width: 200,
//         margin: 1,
//         color: {
//           dark: "#000000",
//           light: "#FFFFFF",
//         },
//       }
//     );
//     console.log(
//       "QR Code generated successfully:",
//       qrCodeDataURL.substring(0, 50) + "..."
//     );
//   } catch (error) {
//     console.error("Error generating QR code:", error);
//     qrCodeDataURL = "https://placeholder-qr-image.com/error";
//   }

//   return (
//     <Html>
//       <Head />
//       <Preview>
//         Welcome to Yuktaha 2025 - Your Registration is Confirmed!
//       </Preview>
//       <Body style={main}>
//         <Container style={container}>
//           {/* Main card container */}
//           <Section style={cardContainer}>
//             {/* Gradient header */}
//             <Row style={gradientHeader}></Row>

//             {/* Profile section */}
//             <Section style={profileSection}>
//               {/* Profile image would go here */}
//               <Row>
//                 <Column>
//                   <Text style={profileName}>
//                     {firstName} {lastName}
//                   </Text>
//                   <Text style={profileEmail}>{email}</Text>
//                 </Column>
//               </Row>
//             </Section>

//             {/* Stats grid */}
//             <Section style={statsSection}>
//               <Row>
//                 <Column style={statColumn}>
//                   <Text style={statLabel}>Yuktaha ID</Text>
//                   <Text style={statValue}>{yuktahaId}</Text>
//                 </Column>
//                 <Column style={statColumn}>
//                   <Text style={statLabel}>Workshops registered</Text>
//                   <Text style={statValue}>0</Text>
//                 </Column>
//                 <Column style={statColumn}>
//                   <Text style={statLabel}>Technical events registered</Text>
//                   <Text style={statValue}>0</Text>
//                 </Column>
//                 <Column style={statColumn}>
//                   <Text style={statLabel}>Non-Technical events</Text>
//                   <Text style={statValue}>0</Text>
//                 </Column>
//               </Row>
//             </Section>

//             {/* User details form-like layout */}
//             <Section style={detailsSection}>
//               <Row style={formRow}>
//                 <Column style={formColumnHalf}>
//                   <Text style={formLabel}>First Name</Text>
//                   <Text style={formField}>{firstName}</Text>
//                 </Column>
//                 <Column style={formColumnHalf}>
//                   <Text style={formLabel}>Last Name</Text>
//                   <Text style={formField}>{lastName}</Text>
//                 </Column>
//               </Row>

//               <Row style={formRow}>
//                 <Column>
//                   <Text style={formLabel}>College</Text>
//                   <Text style={formField}>{college}</Text>
//                 </Column>
//               </Row>

//               <Row style={formRow}>
//                 <Column>
//                   <Text style={formLabel}>Phone Number</Text>
//                   <Text style={formField}>{phoneNumber}</Text>
//                 </Column>
//               </Row>

//               {/* Additional details */}
//               <Row style={formRow}>
//                 <Column>
//                   <Text style={formLabel}>Department</Text>
//                   <Text style={formField}>{department}</Text>
//                 </Column>
//               </Row>

//               <Row style={formRow}>
//                 <Column>
//                   <Text style={formLabel}>City</Text>
//                   <Text style={formField}>{city}</Text>
//                 </Column>
//               </Row>

//               <Row style={formRowLast}>
//                 <Column>
//                   <Text style={formLabel}>Year of Study</Text>
//                   <Text style={formField}>{yearOfStudy}</Text>
//                 </Column>
//               </Row>
//             </Section>

//             {/* QR Code Section */}
//             <Section style={qrSection}>
//               <Heading style={qrHeading}>Your Yuktaha ID QR Code</Heading>
//               <Text style={qrDescription}>
//                 Present this QR code at all Yuktaha events for quick check-in
//               </Text>
//               <Img
//                 src={qrCodeDataURL}
//                 width="200"
//                 height="200"
//                 alt="Yuktaha ID QR Code"
//                 style={qrImage}
//               />
//             </Section>
//           </Section>

//           {/* Footer */}
//           <Section style={footer}>
//             <Text style={footerText}>© 2025 Yuktaha. All rights reserved.</Text>
//             <Text style={footerText}>
//               If you have any questions, please contact us at{" "}
//               <Link href="mailto:support@yuktaha.com" style={link}>
//                 support@yuktaha.com
//               </Link>
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// };

// export default YuktahaConfirmationEmail;

// // Styles
// const main = {
//   backgroundColor: "#222",
//   fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//   padding: "40px 0",
//   color: "white",
// };

// const container = {
//   margin: "0 auto",
//   width: "600px",
//   maxWidth: "100%",
// };

// const cardContainer = {
//   backgroundColor: "#000000",
//   borderRadius: "24px",
//   overflow: "hidden",
//   border: "4px solid #333",
//   margin: "20px auto",
//   padding: "0px",
// };

// const gradientHeader = {
//   height: "120px",
//   background: "linear-gradient(to right, #f05454, #3282b8)",
//   margin: "0",
//   width: "100%",
// };

// const profileSection = {
//   padding: "0 24px 12px",
//   position: "relative",
// };

// const profileName = {
//   fontSize: "28px",
//   fontWeight: "bold",
//   margin: "10px 0 5px",
//   color: "white",
// };

// const profileEmail = {
//   fontSize: "16px",
//   color: "#aaa",
//   margin: "0 0 20px",
// };

// const statsSection = {
//   padding: "0 24px 20px",
//   textAlign: "center",
// };

// const statColumn = {
//   padding: "10px",
//   width: "25%",
// };

// const statLabel = {
//   fontSize: "14px",
//   color: "#aaa",
//   margin: "0 0 5px",
// };

// const statValue = {
//   fontSize: "16px",
//   fontWeight: "bold",
//   margin: "0",
//   color: "white",
// };

// const detailsSection = {
//   padding: "20px 24px",
// };

// const formRow = {
//   margin: "0 0 20px",
// };

// const formRowLast = {
//   margin: "0",
// };

// const formColumnHalf = {
//   width: "50%",
// };

// const formLabel = {
//   fontSize: "14px",
//   color: "#aaa",
//   display: "block",
//   marginBottom: "8px",
// };

// const formField = {
//   fontSize: "16px",
//   backgroundColor: "#222",
//   color: "white",
//   padding: "12px 16px",
//   borderRadius: "8px",
//   width: "100%",
//   boxSizing: "border-box",
// };

// const qrSection = {
//   backgroundColor: "#111",
//   padding: "30px 24px",
//   textAlign: "center",
//   borderTop: "1px solid #333",
// };

// const qrHeading = {
//   fontSize: "20px",
//   fontWeight: "bold",
//   color: "white",
//   margin: "10px 0",
// };

// const qrDescription = {
//   fontSize: "14px",
//   color: "#aaa",
//   margin: "10px 0 20px",
// };

// const qrImage = {
//   margin: "0 auto",
//   display: "block",
//   padding: "10px",
//   backgroundColor: "white",
//   borderRadius: "8px",
// };

// const footer = {
//   backgroundColor: "#111",
//   padding: "20px",
//   textAlign: "center",
//   borderRadius: "0 0 8px 8px",
//   marginTop: "20px",
// };

// const footerText = {
//   fontSize: "14px",
//   color: "#666",
//   margin: "5px 0",
// };

// const link = {
//   color: "#3282b8",
//   textDecoration: "underline",
// };

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

// Email template for Yuktaha registration confirmation - removed QR code generation
export const YuktahaConfirmationEmail = async ({
  firstName,
  lastName,
  email,
  yuktahaId,
  college,
  department,
  city,
  phoneNumber,
  yearOfStudy,
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Yuktaha 2025 - Your Registration is Confirmed!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Main card container */}
          <Section style={cardContainer}>
            {/* Gradient header */}
            <Row style={gradientHeader}></Row>

            {/* Profile section */}
            <Section style={profileSection}>
              {/* Profile image would go here */}
              <Row>
                <Column>
                  <Text style={profileName}>
                    {firstName} {lastName}
                  </Text>
                  <Text style={profileEmail}>{email}</Text>
                </Column>
              </Row>
            </Section>

            {/* Stats grid */}
            <Section style={statsSection}>
              <Row>
                <Column style={statColumn}>
                  <Text style={statLabel}>Yuktaha ID</Text>
                  <Text style={statValue}>{yuktahaId}</Text>
                </Column>
                <Column style={statColumn}>
                  <Text style={statLabel}>Workshops registered</Text>
                  <Text style={statValue}>0</Text>
                </Column>
                <Column style={statColumn}>
                  <Text style={statLabel}>Technical events registered</Text>
                  <Text style={statValue}>0</Text>
                </Column>
                <Column style={statColumn}>
                  <Text style={statLabel}>Non-Technical events</Text>
                  <Text style={statValue}>0</Text>
                </Column>
              </Row>
            </Section>

            {/* User details form-like layout */}
            <Section style={detailsSection}>
              <Row style={formRow}>
                <Column style={formColumnHalf}>
                  <Text style={formLabel}>First Name</Text>
                  <Text style={formField}>{firstName}</Text>
                </Column>
                <Column style={formColumnHalf}>
                  <Text style={formLabel}>Last Name</Text>
                  <Text style={formField}>{lastName}</Text>
                </Column>
              </Row>

              <Row style={formRow}>
                <Column>
                  <Text style={formLabel}>College</Text>
                  <Text style={formField}>{college}</Text>
                </Column>
              </Row>

              <Row style={formRow}>
                <Column>
                  <Text style={formLabel}>Phone Number</Text>
                  <Text style={formField}>{phoneNumber}</Text>
                </Column>
              </Row>

              {/* Additional details */}
              <Row style={formRow}>
                <Column>
                  <Text style={formLabel}>Department</Text>
                  <Text style={formField}>{department}</Text>
                </Column>
              </Row>

              <Row style={formRow}>
                <Column>
                  <Text style={formLabel}>City</Text>
                  <Text style={formField}>{city}</Text>
                </Column>
              </Row>

              <Row style={formRowLast}>
                <Column>
                  <Text style={formLabel}>Year of Study</Text>
                  <Text style={formField}>{yearOfStudy}</Text>
                </Column>
              </Row>
            </Section>

            {/* QR Code Section - Modified to reference attachment */}
            <Section style={qrSection}>
              <Heading style={qrHeading}>Your Yuktaha ID QR Code</Heading>
              <Text style={qrDescription}>
                We've attached your Yuktaha ID QR code to this email. Present
                this QR code at all Yuktaha events for quick check-in.
              </Text>
              <Text style={qrInstructions}>
                The QR code is attached as a file named "yuktaha-qr-{yuktahaId}
                .png". Please download and save it on your device.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>© 2025 Yuktaha. All rights reserved.</Text>
            <Text style={footerText}>
              If you have any questions, please contact us at{" "}
              <Link href="mailto:support@yuktaha.com" style={link}>
                support@yuktaha.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default YuktahaConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#222",
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  padding: "40px 0",
  color: "white",
};

const container = {
  margin: "0 auto",
  width: "600px",
  maxWidth: "100%",
};

const cardContainer = {
  backgroundColor: "#000000",
  borderRadius: "24px",
  overflow: "hidden",
  border: "4px solid #333",
  margin: "20px auto",
  padding: "0px",
};

const gradientHeader = {
  height: "120px",
  background: "linear-gradient(to right, #f05454, #3282b8)",
  margin: "0",
  width: "100%",
};

const profileSection = {
  padding: "0 24px 12px",
  position: "relative",
};

const profileName = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "10px 0 5px",
  color: "white",
};

const profileEmail = {
  fontSize: "16px",
  color: "#aaa",
  margin: "0 0 20px",
};

const statsSection = {
  padding: "0 24px 20px",
  textAlign: "center",
};

const statColumn = {
  padding: "10px",
  width: "25%",
};

const statLabel = {
  fontSize: "14px",
  color: "#aaa",
  margin: "0 0 5px",
};

const statValue = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
  color: "white",
};

const detailsSection = {
  padding: "20px 24px",
};

const formRow = {
  margin: "0 0 20px",
};

const formRowLast = {
  margin: "0",
};

const formColumnHalf = {
  width: "50%",
};

const formLabel = {
  fontSize: "14px",
  color: "#aaa",
  display: "block",
  marginBottom: "8px",
};

const formField = {
  fontSize: "16px",
  backgroundColor: "#222",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  width: "100%",
  boxSizing: "border-box",
};

const qrSection = {
  backgroundColor: "#111",
  padding: "30px 24px",
  textAlign: "center",
  borderTop: "1px solid #333",
};

const qrHeading = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "white",
  margin: "10px 0",
};

const qrDescription = {
  fontSize: "14px",
  color: "#aaa",
  margin: "10px 0 10px",
};

const qrInstructions = {
  fontSize: "14px",
  color: "#aaa",
  margin: "10px 0 20px",
};

const footer = {
  backgroundColor: "#111",
  padding: "20px",
  textAlign: "center",
  borderRadius: "0 0 8px 8px",
  marginTop: "20px",
};

const footerText = {
  fontSize: "14px",
  color: "#666",
  margin: "5px 0",
};

const link = {
  color: "#3282b8",
  textDecoration: "underline",
};
