import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const router = useRouter();

  // Sync dialog state with playVideo prop
  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId) {
      GetVideoData();
    }
  }, [playVideo, videoId]);

  // Fetch video data from the database
  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    if (result.length > 0) {
      setVideoData(result[0]);
    }
  };

  // Submit function to create a video entry
  const submit = async () => {
    try {
      if (!videoData) {
        alert("Video data is not available.");
        return;
      }

      const newVideo = {
        script: videoData.script || [{ imagePrompt: "test Haroun Barhoumi" }],
        imageList:
          videoData.imageList ||
          Array.from({ length: 50 }, (_, i) => `https://picsum.photos/800/600?random=${i + 1}`),
        audioFileUrl:
          videoData.audioFileUrl ||
          "https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=72db8329-f58a-4b3d-8ae1-107a987a3efd",
        captions: videoData.captions || [
          {
            text: "Hello",
            start: "0",
            end: "150",
            confidence: 0.98,
            speaker: null,
          },
        ],
        createdBy: "kun.haroun7@gmail.com", // Replace with the actual user email or ID
      };

      // Insert the new video into the database
      await db.insert(VideoData).values(newVideo);

      alert("Video created successfully!");
      setOpenDialog(false);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error creating video:", error);
      alert("Failed to create the video. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold my-5">
              Your Video is Ready
            </DialogTitle>
            <DialogDescription>
              {videoData ? (
                <Player
                  component={RemotionVideo}  
                  durationInFrames={1800}  
                  compositionWidth={300}
                  compositionHeight={450}
                  fps={60}
                  controls={true}
                  inputProps={{
                    script: videoData?.script || [{ imagePrompt: "test Haroun Barhoumi" }],
                    imageList:
                      videoData?.imageList || [],
                    audioFileUrl:
                      videoData?.audioFileUrl ||
                      "https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750",
                    captions: videoData?.captions || [],
                  }}
                />
              ) : (
                <p>Loading video data...</p>
              )}
              <div className="flex gap-10 mt-4">
                <Button variant="ghost" onClick={() => { router.replace("/dashboard"); setOpenDialog(false); }}>
                  Cancel
                </Button>
                <Button onClick={submit}>
                  Submit & Create Video
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlayerDialog;
