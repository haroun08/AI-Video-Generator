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

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);

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
                component={RemotionVideo} // Pass the actual component here
                durationInFrames={750} // Dynamically update based on captions
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  script: videoData?.script || [{ imagePrompt: "test Haroun Barhoumi" }],
                  imageList: videoData?.imageList || [
                    "https://th.bing.com/th/id/OIP.O3NSw57ifjuhQ_mb29gzggHaHa?w=768&h=768&rs=1&pid=ImgDetMain",
                    "https://picsum.photos/800/600?random=1",
                    "https://picsum.photos/800/600?random=2",
                    "https://picsum.photos/800/600?random=3",
                  ],
                  audioFileUrl:
                    videoData?.audioFileUrl ||
                    "https://firebasestorage.googleapis.com/v0/b/replanto.appspot.com/o/ai-short-video-files%2Foutput.mp3?alt=media&token=e43777fa-c740-4243-acf6-99845683e750",
                  captions: videoData?.captions || [
                    {
                      "text": "Hello",
                      "start": "0",
                      "end": "150",
                      "confidence": 0.98,
                      "speaker": null
                    },
                    {
                      "text": "Welcome to our video",
                      "start": "151",
                      "end": "300",
                      "confidence": 0.92,
                      "speaker": null
                    },
                    {
                      "text": "This is a demo",
                      "start": "301",
                      "end": "450",
                      "confidence": 0.87,
                      "speaker": null
                    },
                    {
                      "text": "Hope you enjoy it",
                      "start": "451",
                      "end": "600",
                      "confidence": 0.9,
                      "speaker": null
                    },
                    {
                      "text": "Thank you",
                      "start": "601",
                      "end": "750",
                      "confidence": 0.95,
                      "speaker": null
                    }
                  ],
                }}
              />
              
              
              ) : (
                <p>Loading video data...</p>
              )}
              <div className="flex gap-10 mt-4">
                <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => alert("Export functionality not implemented yet.")}>
                  Export
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
