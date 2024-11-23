import Replicate from "replicate";
import { NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase imports

// Ensure Firebase is initialized somewhere else in your project

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        // Initialize Replicate with your API token
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // Prepare input for Replicate
        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,
        };

        // Run the model on Replicate
        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            { input }
        );
        console.log("Replicate Output:", output);

        // Assuming output[0] contains the image URL from Replicate
        const imageUrl = output[0];

        // Firebase Storage reference
        const storage = getStorage();
        const storageRef = ref(storage, `ai-short-video-files/${Date.now()}.png`);

        // Fetch the image (assuming it's a URL or base64)
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();

        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, imageBlob);
        console.log("Image uploaded to Firebase Storage");

        // Get the download URL of the uploaded image
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadUrl);

        // Return the download URL in the response
        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to generate or upload image." });
    }
}
