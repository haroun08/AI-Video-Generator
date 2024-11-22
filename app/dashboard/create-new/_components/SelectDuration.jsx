'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select"
const SelectDuration = ({onUserSelect}) => {
  return (
    <div className='mt-7'>
    <h2 className='font-bold text-2xl text-primary'>Duration</h2>
    <p className='text-gray-500'>Select the Duration of your video</p>
    <Select onValueChange={(val)=>{
      val!='Custom Prompt'&&onUserSelect('duration',val)
    }}>
      <SelectTrigger className="w-full mt-2 p-6 text-lg">
        <SelectValue placeholder="Duration" />
      </SelectTrigger>
      <SelectContent>
      <SelectItem value="30 Sec">30 Sec</SelectItem>
      <SelectItem value="60 Sec">60 Sec</SelectItem>
      </SelectContent>
    </Select>

  </div>
  )
}

export default SelectDuration