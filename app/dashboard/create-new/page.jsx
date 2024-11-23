'use client'
import React, { useState, useEffect } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';


const FILE_URL = 'https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750';
function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);  
  const [progress, setProgress] = useState(0); 
  const [videoScript, setVideoScript] = useState(null); 
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [captions,setCaptions] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
   // getVideoScript();
   GenerateAudioCaption(FILE_URL);
  };

  const getVideoScript = async () => {
    setLoading(true);  
    const prompt = `write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with Image prompt and contentText as a field`;
  
    console.log(prompt);
    try {
      const videoScript = await axios.post('/api/get-video-script', { prompt });
      console.log(videoScript.data.result); 
  
      setLoading(false);  
      setProgress(100);
      setVideoScript(videoScript.data.result); 

      GenerateAudioFile(videoScript.data.result);
    } catch (error) {
      console.error('Error generating video script:', error);
      setLoading(false);  
    }
  };
  
  const GenerateAudioFile = async (scriptData) => {
    try {
      if (typeof scriptData === 'string') {
        try {
          scriptData = JSON.parse(scriptData);
        } catch (parseError) {
          console.error('Error parsing scriptData:', parseError);
          return; 
        }
      }
  
      // Check if scriptData is valid and contains the expected segments
      if (scriptData && scriptData.segments && Array.isArray(scriptData.segments)) {
        let script = '';
        const id = uuidv4();
  
        scriptData.segments.forEach(item => {
          if (item.contentText) {
            script += item.contentText + '\n';
          } else {
            console.error('Item is missing contentText:', item);
          }
        });
        console.log('Data Text--------',scriptData);
        const response = await axios.post('/api/generate-audio', {
          text: script,
          id: id,
        });
        setAudioFileUrl(response.data);
        console.log('Audio generated:', response.data);
      } else {
        console.error("'segments' is not an array or not defined.");
        console.log('ScriptData:', scriptData);
      }
    } catch (error) {
      console.error('Error parsing or processing scriptData:', error);
    }
  };
  
  const GenerateAudioCaption= async (fileUrl)=> {
    setLoading(true);
    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(response=> {
      console.log(response.data.result);
      setCaptions(response.data.result);
    })

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : prev)); 
      }, 1000);
      return () => clearInterval(timer);  
    }
  }, [loading]);

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-ellipsis text-4xl text-primary text-center">
        Create New Video
      </h2>
      <div className="mt-10 shadow-sm p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} progress={progress} />
    </div>
  );
}

export default CreateNewVideo;
