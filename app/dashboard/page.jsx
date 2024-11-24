'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { VideoData } from "@/configs/schema"; 
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import VideoList from './_components/VideoList';

function Dashboard() {
    const [videoList,setVideoList]=useState([]);
    const {user} = useUser();


    useEffect(()=>{
      user&&GetVideoList();
    },[user])
    /**
     * Get Users Video
     */
    const GetVideoList= async() => {
      const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress))
    
      console.log(result);
      setVideoList(result);
    }
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashborad</h2>
        <Link href={'/dashboard/create-new'}>
            <Button>+ Create New</Button>
            
        </Link>
      </div>
        {videoList.length==0&&<div>
            <EmptyState></EmptyState>
      </div>}

      <div>
        <VideoList videoList={videoList}></VideoList>
      </div>
    </div>
  )
}

export default Dashboard