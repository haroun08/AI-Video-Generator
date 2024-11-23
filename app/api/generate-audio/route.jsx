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
    const [response] = await client.synthesizeSpeech(request);
    const audioBuffer = Buffer.from(response.audioContent,'binary');
    await uploadBytes(storageRef,audioBuffer,{
        contentType:'audio/mp3'
    });
    const downloadUrl = await getDownloadURL('https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750');
    console.log(downloadUrl);
    return NextResponse.json({Result:downloadUrl});
}