import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt:", prompt);

    // Check if `chatSession` is properly initialized
    if (!chatSession || typeof chatSession.sendMessage !== "function") {
      throw new Error("chatSession is not initialized or missing the sendMessage function");
    }

    // Send the prompt to the chat model
    const result = await chatSession.sendMessage(prompt);

    // Check for API response issues
    if (!result || !result.response) {
      throw new Error("Invalid response received from chatSession");
    }

    // Call `text()` correctly if it's a method or property
    let jsonData;
    if (typeof result.response.text === "function") {
      jsonData = await result.response.text(); // If it's a Promise
    } else if (typeof result.response.text === "string") {
      jsonData = result.response.text; // If it's a plain string
    } else {
      throw new Error("Unexpected response format from chatSession");
    }

    console.log("Parsed JSON:", jsonData);

    // Return parsed data
    return NextResponse.json({ result: jsonData });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
