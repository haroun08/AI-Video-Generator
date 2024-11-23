import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try{
    const {audioFileUrl} = await req.json();
    const client = new AssemblyAI({
        apiKey: process.env.CAPTION_API,
      });
      
      const FILE_URL =
        'https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750';
      
      
      const data = {
        audio: FILE_URL
      }
      
      const transcript = await client.transcripts.transcribe(data);
      console.log(transcript.words);
      return NextResponse.json({'result':transcript.words});
    }catch(e){
        return NextResponse.json({'error':e});
    }
      
}