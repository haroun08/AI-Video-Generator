'use client';
import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState();

  const handleThumbnailClick = (id) => {
    setOpenPlayerDialog(true);
    setVideoId(id);  
  };

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {videoList?.map((video) => (
        <div
          key={video.id}  
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => handleThumbnailClick(video.id)}  
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v),
            }}
          />
        </div>
      ))}
       <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;
