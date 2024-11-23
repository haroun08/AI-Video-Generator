import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log("Prompt:", prompt);

        const result = await chatSession.sendMessage(prompt);
        console.log("Raw response:", result); // Log the entire response object

        // *** Crucial Change: Call the 'text' function ***
        const jsonData = result.response.text(); 
        console.log("Parsed JSON:", jsonData);

        // Now you can access the JSON data.  Error handling is still crucial!
        return NextResponse.json({ 'result': jsonData });
        
    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json({ 'Error': e.message });
    }
}