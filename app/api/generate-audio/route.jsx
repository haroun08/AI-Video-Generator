import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient({
    apiKey:process.env.GOOGLE_API_KEY
});
export async function POST(req){
    const {text,id} = await req.json();
    //const storageRef = ref('storage','ai-short-video-files/'+id+'.mp3')
    
    const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
        audioConfig: {audioEncoding: 'MP3'},
    };

     // Performs the text-to-speech request
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
  return NextResponse.json({Result:"Success"});
}