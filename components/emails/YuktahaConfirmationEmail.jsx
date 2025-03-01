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
//           {/* Header with logo */}
//           <Section style={header}>
//             <Heading style={heading}>Yuktaha 2025</Heading>
//           </Section>

//           {/* Main message */}
//           <Section style={messageSection}>
//             <Heading style={subheading}>Registration Confirmed!</Heading>
//             <Text style={paragraph}>Hello {firstName},</Text>
//             <Text style={paragraph}>
//               Thank you for registering for Yuktaha 2025. Your registration has
//               been successfully processed. Please find your registration details
//               and Yuktaha ID below.
//             </Text>
//           </Section>

//           {/* User Profile Card */}
//           <Section style={cardContainer}>
//             <Row style={gradientHeader}></Row>

//             <Row style={profileSection}>
//               <Column>
//                 <Text style={profileName}>
//                   {firstName} {lastName}
//                 </Text>
//                 <Text style={profileEmail}>{email}</Text>
//               </Column>
//             </Row>

//             {/* Stats Section */}
//             <Row style={statsSection}>
//               <Column style={statColumn}>
//                 <Text style={statLabel}>Yuktaha ID</Text>
//                 <Text style={statValue}>{yuktahaId}</Text>
//               </Column>
//             </Row>

//             <Hr style={divider} />

//             {/* User Details */}
//             <Section style={detailsSection}>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>First Name</Column>
//                 <Column style={detailValue}>{firstName}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>Last Name</Column>
//                 <Column style={detailValue}>{lastName}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>College</Column>
//                 <Column style={detailValue}>{college}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>Department</Column>
//                 <Column style={detailValue}>{department}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>City</Column>
//                 <Column style={detailValue}>{city}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>Phone Number</Column>
//                 <Column style={detailValue}>{phoneNumber}</Column>
//               </Row>
//               <Row style={detailRow}>
//                 <Column style={detailLabel}>Year of Study</Column>
//                 <Column style={detailValue}>{yearOfStudy}</Column>
//               </Row>
//             </Section>
//           </Section>

//           {/* QR Code Section */}
//           <Section style={qrSection}>
//             <Heading style={qrHeading}>Your Yuktaha ID QR Code</Heading>
//             <Text style={qrDescription}>
//               Present this QR code at all Yuktaha events for quick check-in
//             </Text>
//             {/* Add the actual QR code image here */}
//             <Img
//               src={qrCodeDataURL}
//               width="200"
//               height="200"
//               alt="Yuktaha ID QR Code"
//               style={qrImage}
//             />
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
//   backgroundColor: "#f5f5f5",
//   fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//   padding: "40px 0",
// };

// const container = {
//   margin: "0 auto",
//   width: "600px",
//   maxWidth: "100%",
// };

// const header = {
//   backgroundColor: "#000",
//   color: "#fff",
//   padding: "20px",
//   textAlign: "center",
//   borderTopLeftRadius: "8px",
//   borderTopRightRadius: "8px",
// };

// const heading = {
//   fontSize: "28px",
//   fontWeight: "bold",
//   margin: "0",
// };

// const messageSection = {
//   backgroundColor: "#fff",
//   padding: "20px",
//   textAlign: "left",
// };

// const subheading = {
//   fontSize: "20px",
//   fontWeight: "bold",
//   color: "#333",
//   margin: "10px 0",
// };

// const paragraph = {
//   fontSize: "16px",
//   lineHeight: "24px",
//   color: "#444",
//   margin: "10px 0",
// };

// const cardContainer = {
//   backgroundColor: "#000",
//   borderRadius: "12px",
//   overflow: "hidden",
//   margin: "20px 0",
//   color: "#fff",
//   border: "2px solid #444",
// };

// const gradientHeader = {
//   height: "80px",
//   background: "linear-gradient(to right, #f05454, #3282b8)",
//   width: "100%",
// };

// const profileSection = {
//   padding: "0 20px 20px",
//   textAlign: "left",
//   position: "relative",
// };

// const profileName = {
//   fontSize: "24px",
//   fontWeight: "bold",
//   margin: "10px 0 5px",
// };

// const profileEmail = {
//   fontSize: "14px",
//   color: "#aaa",
//   margin: "0",
// };

// const statsSection = {
//   display: "flex",
//   justifyContent: "space-between",
//   padding: "0 20px 20px",
//   textAlign: "center",
// };

// const statColumn = {
//   width: "100%",
//   padding: "10px",
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
// };

// const divider = {
//   borderColor: "#333",
//   margin: "0 20px",
// };

// const detailsSection = {
//   padding: "20px",
//   textAlign: "left",
// };

// const detailRow = {
//   margin: "10px 0",
// };

// const detailLabel = {
//   width: "40%",
//   fontSize: "14px",
//   color: "#aaa",
// };

// const detailValue = {
//   width: "60%",
//   fontSize: "14px",
//   color: "#fff",
// };

// const qrSection = {
//   backgroundColor: "#fff",
//   padding: "20px",
//   textAlign: "center",
// };

// const qrHeading = {
//   fontSize: "18px",
//   fontWeight: "bold",
//   color: "#333",
//   margin: "10px 0",
// };

// const qrDescription = {
//   fontSize: "14px",
//   color: "#666",
//   margin: "10px 0 20px",
// };

// const qrImage = {
//   margin: "0 auto",
//   display: "block",
//   border: "1px solid #ddd",
// };

// const footer = {
//   backgroundColor: "#f8f8f8",
//   padding: "20px",
//   textAlign: "center",
//   borderBottomLeftRadius: "8px",
//   borderBottomRightRadius: "8px",
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
import QRCode from "qrcode";
import * as React from "react";

// Email template for Yuktaha registration confirmation
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
  // Generate QR code for the yuktahaId
  let qrCodeDataURL;
  try {
    qrCodeDataURL = await QRCode.toDataURL(
      yuktahaId || "registration-complete",
      {
        width: 200,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }
    );
    console.log(
      "QR Code generated successfully:",
      qrCodeDataURL.substring(0, 50) + "..."
    );
  } catch (error) {
    console.error("Error generating QR code:", error);
    qrCodeDataURL = "https://placeholder-qr-image.com/error";
  }

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

            {/* QR Code Section */}
            <Section style={qrSection}>
              <Heading style={qrHeading}>Your Yuktaha ID QR Code</Heading>
              <Text style={qrDescription}>
                Present this QR code at all Yuktaha events for quick check-in
              </Text>
              <Img
                src={qrCodeDataURL}
                width="200"
                height="200"
                alt="Yuktaha ID QR Code"
                style={qrImage}
              />
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
  margin: "10px 0 20px",
};

const qrImage = {
  margin: "0 auto",
  display: "block",
  padding: "10px",
  backgroundColor: "white",
  borderRadius: "8px",
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
