"use client"
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame } from 'remotion';

const RemotionVideo = ({
  script,
  imageList = [],
  audioFileUrl,
  captions = [],
  setDurationInFrame,
}) => {
  const fps = 30;  
  const frame = useCurrentFrame();  

  const [durationInFrames, setInternalDurationInFrames] = useState(fps * 5);  

  useEffect(() => {
    const calculatedDuration =
      Math.floor((captions[captions.length - 1]?.end / 1000) * 100*fps) || fps * 50;
  
    setInternalDurationInFrames(calculatedDuration);
  
    if (imageList.length === 0) {
      setInternalDurationInFrames(fps * 5); 
    }
  }, [captions, imageList.length, fps]);
  

  const getCurrentCaption = () => {
    const currentTimeMs = (frame / fps) * 100; // Convert frame to milliseconds
    const currentCaption = captions.find(
      (caption) => currentTimeMs >= caption.start && currentTimeMs <= caption.end
    );
    return currentCaption?.text || '';
  };
  

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {imageList && imageList.length > 0 ? (
        imageList.map((item, index) => (
          <Sequence
            key={index}
            from={(index * durationInFrames) / imageList.length}
            durationInFrames={Math.max(durationInFrames / imageList.length, 150)} // Ensure each image stays at least 15 frames
          >
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <AbsoluteFill className="text-white flex w-full justify-center items-center bottom-10 h-full">
              <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>
                {getCurrentCaption()}
              </h2>
            </AbsoluteFill>
          </Sequence>
        ))
      ) : (
        <div
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: '20%',
          }}
        >
          No images to display.
        </div>
      )}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
