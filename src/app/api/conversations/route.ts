import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_TAVUS_API_KEY || "",
      },
      body: JSON.stringify({
        replica_id: process.env.NEXT_REPLICA_ID || "rfe12d8b9597",
        persona_id: process.env.NEXT_PERSONA_ID || "pdced222244b",
        properties: {
          max_call_duration: 45,
          participant_left_timeout: 30,
          participant_absent_timeout: 30,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Failed to create conversation", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

