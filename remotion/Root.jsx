import React from "react";
import { Composition } from "remotion";
import RemotionVideo from "@/app/dashboard/_components/RemotionVideo";

const mockImageList = [
  "https://picsum.photos/1280/720?random=1",
  "https://picsum.photos/1280/720?random=2",
  "https://picsum.photos/1280/720?random=3",
];

const mockCaptions = [
  { start: 0, end: 5000, text: "Scene 1 content" },
  { start: 5000, end: 10000, text: "Scene 2 content" },
  { start: 10000, end: 15000, text: "Scene 3 content" },
];

const mockScript = `This is a sample script for a generated video. It contains instructions for each scene.`;
const mockAudioFileUrl = "https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750";
const mockCreatedBy = "Haroun Barhoumi";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="GeneratedVideo"
        component={RemotionVideo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          script: mockScript,
          imageList: mockImageList,
          audioFileUrl: mockAudioFileUrl,
          captions: mockCaptions,
          createdBy: mockCreatedBy,
        }}
      />
    </>
  );
};

export default RemotionRoot;
