'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';

function CreateNewVideo() {
  const [formData,setFormData] = useState([]);

  const onHandleInputChange = (fieldName,fieldValue) => {
    console.log(fieldName,fieldValue);
    setFormData(prev=> ({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const onCreateClickHandler= () => {
    getVideoScript();
  }

  const getVideoScript =async () => {
    const prompt = 'write a script to generate '+ formData.duration+' seconds video on topic :'+formData.topic+'along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format wih Image prompt and contentText as a field'
    console.log(prompt);
    //const result = await axios.post('/api/get-video-scirpt',{
    //  prompt :
    //});
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-ellipsis text-4xl text-primary text-center'>Create new</h2>
      <div className='mt-10 shadow-sm p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler} >Create Short Video</Button>
      </div>
    </div>
  )
}

export default CreateNewVideo
