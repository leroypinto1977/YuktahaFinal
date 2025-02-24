import { connectToDatabase } from "@/lib/mongodb";
import { TEvent } from "@/models/EventDetails";

export async function GET(req, { params }) {
  await connectToDatabase();

  try {
    const groupId = params.groupId;

    if (!groupId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Group ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const events = await TEvent.find(
      {
        groupId: parseInt(groupId),
      },
      "name dept short_desc eventid open outer_Img groupId type registrationFee teamSize"
    );

    if (!events || events.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No events found for this group",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: events,
        metadata: {
          groupId: groupId,
          count: events.length,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching technical events by group:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch technical events",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// import { connectToDatabase } from "@/lib/mongodb";
// import { TEvent } from "@/models/EventDetails";

// export async function GET(req, { params }) {
//   await connectToDatabase();

//   try {
//     const groupId = parseInt(params.groupId);

//     if (isNaN(groupId)) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Invalid Group ID format",
//         }),
//         {
//           status: 400,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     console.log(`Searching for events with groupId: ${groupId}`);

//     // First, check if any events exist with this groupId
//     const count = await TEvent.countDocuments({
//       groupId: groupId,
//       type: "technical",
//     });

//     console.log(`Found ${count} events for groupId ${groupId}`);

//     if (count === 0) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "No events found for this group",
//           debug: {
//             queriedGroupId: groupId,
//             type: "technical",
//           },
//         }),
//         {
//           status: 404,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const events = await TEvent.find({
//       groupId: groupId,
//       type: "technical",
//     }).lean();

//     // Map the database fields to the frontend expected fields
//     const mappedEvents = events.map((event) => ({
//       name: event.name,
//       dept: event.dept,
//       short_desc: event.short_desc,
//       eventid: event.eventid,
//       open: event.open,
//       outer_Img: event.outer_Img,
//       groupId: event.groupId,
//       type: event.type,
//       registrationFee: event.fees,
//       teamSize: event.team_count,
//     }));

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: mappedEvents,
//         metadata: {
//           groupId: groupId,
//           count: events.length,
//         },
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching technical events by group:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: "Failed to fetch technical events",
//         details:
//           process.env.NODE_ENV === "development" ? error.message : undefined,
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }
