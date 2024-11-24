'use client';
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame } from 'remotion';

const RemotionVideo = ({
  script,
  imageList = [],
  audioFileUrl,
  captions = [],
  setDurationInFrame,
}) => {
  const fps = 30; // Standard FPS
  const frame = useCurrentFrame(); // Frame info comes from the Player

  const [durationInFrames, setInternalDurationInFrames] = useState(fps * 5); // Default duration

  useEffect(() => {
    // Dynamically set video duration based on captions
    const calculatedDuration =
      Math.floor((captions[captions.length - 1]?.end / 1000) * fps) || fps * 5;
    setInternalDurationInFrames(calculatedDuration);
    setDurationInFrame?.(calculatedDuration); // Notify parent
  }, [captions]);

  const getCurrentCaption = () => {
    const currentTimeMs = (frame / fps) * 1000; // Convert frame to milliseconds
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
            durationInFrames={durationInFrames / imageList.length}
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
