import React from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig } from 'remotion'

const RemotionVideo = ({script,imageList,audioFileUrl,caption}) => {
  const {fps}=useVideoConfig(); 
  const getDurationFrame = () => {
    return captions[captions?.length-1]?.end/1000*fps
  }
  
  return (
    <AbsoluteFill style={{
      backgroundColor: 'black'
    }}>
      {imageList.map((item,index)=>(
        <>
          <Sequence key={index} from={((index*getDurationFrame())/imageList?.length)} durationInFrames={getDurationFrame()}>
            <Img src={'/logo.png'} style={{
              width:'100%',
              height:'100%',
              objectFit:'cover'
              }}></Img>
          </Sequence>
        </>
      ))}
    </AbsoluteFill>
  )
}

export default RemotionVideo