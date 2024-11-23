'use client'
import React, { useState, useEffect } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';

function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);  
  const [progress, setProgress] = useState(0); 
  const [videoScript, setVideoScript] = useState(null);  // Initialize as null, not undefined

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };

  const getVideoScript = async () => {
    setLoading(true);  
    const prompt = `write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with Image prompt and contentText as a field`;
  
    console.log(prompt);
    try {
      const resultScript = await axios.post('/api/get-video-script', { prompt });
      console.log(resultScript.data.result); // Log the result to check the structure
  
      setLoading(false);  
      setProgress(100);
      setVideoScript(resultScript.data.result); // Set the videoScript

      // Generate audio file after setting the videoScript
      GenerateAudioFile(resultScript.data.result);
    } catch (error) {
      console.error('Error generating video script:', error);
      setLoading(false);  
    }
  };
  
  const GenerateAudioFile = async (scriptData) => {
    try {
      if (typeof scriptData === 'string') {
        scriptData = JSON.parse(scriptData);
      }
  
      if (scriptData && scriptData.segments && Array.isArray(scriptData.segments)) {
        let script = '';
  
        scriptData.segments.forEach(item => {
          script += item.contentText + '\n';
        });
  
        console.log('Well done Haroun => Generated Script:', script); 
      } else {
        console.error("'segments' is not an array or not defined.");
        console.log('ScriptData:', scriptData); 
      }
    } catch (error) {
      console.error('Error parsing or processing scriptData:', error);
    }
  };
  

  // Manage loading state and progress bar
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
