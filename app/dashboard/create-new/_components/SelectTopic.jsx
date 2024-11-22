'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


function SelectTopic({onUserSelect}) {
  const  options = ['Custom Prompt','Random AI Story','Scary Toy','Historical Fact','Bed Time Story','Motivational','Fun Facts']
  const [selectedOption,setSelectedOption]=useState();
  return (
    <div>
      <h2 className='font-bold text-2xl text-primary'>Content</h2>
      <p className='text-gray-500'>What is the Topic of your Video?</p>
      <Select onValueChange={(val)=>{
        setSelectedOption(val)
        val!='Custom Prompt'&&onUserSelect('topic',val)
      }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item,index)=> (
            <SelectItem value={item} key={index} >{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption=='Custom Prompt'&& <Textarea className="mt-3" onChange={(e) => onUserSelect('topic',e.target.value)} placeholder="Enter your prompt" /> }
    </div>
  )
}

export default SelectTopic
