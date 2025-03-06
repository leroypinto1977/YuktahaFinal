// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Check } from "lucide-react";
// import React, { useState } from "react";

// const UserProfile = ({ user, userDetails }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: userDetails.firstName,
//     lastName: userDetails.lastName,
//     college: userDetails.college,
//     phoneNumber: userDetails.phoneNumber,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await fetch("/api/updateUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: user.email,
//           ...formData,
//         }),
//       });

//       if (response.ok) {
//         setIsEditing(false);
//         alert("User details updated successfully!");
//       } else {
//         alert("Failed to update user details.");
//       }
//     } catch (error) {
//       console.error("Error updating user details:", error);
//       alert("An error occurred while updating user details.");
//     }
//   };

//   return (
//     <Card className="w-full max-w-xl bg-black/90 border-zinc-600 border-4 text-white rounded-[24px] p-6">
//       <div className="relative">
//         <div className="h-40 -mt-[16px] -mx-[16px] rounded-[16px] bg-gradient-to-r from-[#f05454] to-[#3282b8] opacity-100" />
//         <div className="relative items-center gap-4 mb-8">
//           <div className="relative w-24 h-24">
//             <img
//               src={user.picture}
//               alt="Profile"
//               className="w-24 h-24 -mt-[45px] rounded-full border-5 border-black "
//             />
//           </div>

//           <div className="relative flex-1">
//             <div className="flex items-center gap-4 mb-1">
//               <h2 className="text-2xl font-semibold">
//                 {userDetails.firstName} {userDetails.lastName}
//               </h2>
//             </div>
//             <p className="text-gray-400">{user.email}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Yuktaha ID", value: userDetails.yuktahaId },
//             {
//               label: "Workshops registered",
//               value: userDetails.workshopsRegistered,
//             },
//             {
//               label: "Technical events registered",
//               value: userDetails.technicalEventsRegistered,
//             },
//             {
//               label: "Non-Technical events",
//               value: userDetails.nonTechnicalEvents,
//             },
//           ].map((stat) => (
//             <div key={stat.label}>
//               <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
//               <p className="font-medium">{stat.value}</p>
//             </div>
//           ))}
//         </div>
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm mb-2">First Name</label>
//               <Input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 className="w-full bg-gray-800 h-11 rounded-lg p-3"
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm mb-2">Last Name</label>
//               <Input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 className="w-full bg-gray-800 h-11 rounded-lg p-3"
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm mb-2">College</label>
//             <div className="relative">
//               <Input
//                 type="text"
//                 name="college"
//                 value={formData.college}
//                 className="w-full h-11 bg-gray-800 rounded-lg p-3 pr-32"
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm mb-2">Phone Number</label>
//             <div className="relative">
//               <Input
//                 type="text"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 className="w-full h-11 bg-gray-800 rounded-lg p-3 pr-32"
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end gap-3 mt-8">
//           <button
//             className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
//             onClick={() => setIsEditing(!isEditing)}
//           >
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//           {isEditing && (
//             <button
//               className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//               onClick={handleSaveChanges}
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default UserProfile;

"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const UserProfile = ({ user, userDetails: initialUserDetails }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialUserDetails.firstName,
    lastName: initialUserDetails.lastName,
    college: initialUserDetails.college,
    phoneNumber: initialUserDetails.phoneNumber || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    // Reset form data to current userDetails values
    setFormData({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      college: userDetails.college,
      phoneNumber: userDetails.phoneNumber || "",
    });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const refreshUserDetails = async () => {
    try {
      // const response = await fetch(`/api/getUser?email=${user.email}`);

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
        {
          method: "GET",
          cache: "no-store",
          // headers: {
          //   "x-api-key": process.env.API_KEY, // Read from env
          // },
        }
      );

      if (response.ok) {
        const updatedDetails = await response.json();
        setUserDetails(updatedDetails);
        setFormData({
          firstName: updatedDetails.firstName,
          lastName: updatedDetails.lastName,
          college: updatedDetails.college,
          phoneNumber: updatedDetails.phoneNumber || "",
        });
      }
    } catch (error) {
      console.error("Error refreshing user details:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-api-key": process.env.API_KEY,
        },
        body: JSON.stringify({
          email: user.email,
          ...formData,
        }),
      });

      if (response.ok) {
        // Refresh user details from the API
        await refreshUserDetails();
        setIsEditing(false);
        alert("User details updated successfully!");
      } else {
        alert("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("An error occurred while updating user details.");
    }
  };

  return (
    <Card className="w-full max-w-xl bg-black/90 border-zinc-600 border-4 text-white rounded-[24px] p-6">
      <div className="relative">
        <div className="h-40 -mt-[16px] -mx-[16px] rounded-[16px] bg-gradient-to-r from-[#f05454] to-[#3282b8] opacity-100" />
        <div className="relative items-center gap-4 mb-8">
          <div className="relative w-24 h-24">
            <img
              src={user.picture}
              alt="Profile"
              className="w-24 h-24 -mt-[45px] rounded-full border-5 border-black "
            />
          </div>

          <div className="relative flex-1">
            <div className="flex items-center gap-4 mb-1">
              <h2 className="text-2xl font-semibold">
                {userDetails.firstName} {userDetails.lastName}
              </h2>
            </div>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Yuktaha ID", value: userDetails.yuktahaId },
            {
              label: "Workshops registered",
              value: userDetails.workshopsRegistered,
            },
            {
              label: "Technical events registered",
              value: userDetails.teventsRegistered,
            },
            {
              label: "Non-Technical events",
              value: userDetails.nteventsRegistered,
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-gray-400 text-sm mb-1 text-center">
                {stat.label}
              </p>
              <p className="font-medium text-center">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">First Name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                className="w-full bg-gray-800 h-11 rounded-lg p-3"
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                className="w-full bg-gray-800 h-11 rounded-lg p-3"
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">College</label>
            <div className="relative">
              <Input
                type="text"
                name="college"
                value={formData.college}
                className="w-full h-11 bg-gray-800 rounded-lg p-3 pr-32"
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <div className="relative">
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                className="w-full h-11 bg-gray-800 rounded-lg p-3 pr-32"
                onChange={handleInputChange}
                readOnly={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={handleSaveChanges}
              >
                Submit
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
