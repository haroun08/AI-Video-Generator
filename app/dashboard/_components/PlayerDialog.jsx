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
                component="RemotionVideo" // Must match the `id` in Composition
                durationInFrames={750} // Dynamically update based on captions
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  script: videoData?.script || [],
                  imageList: videoData?.imageList || [],
                  audioFileUrl: videoData?.audioFileUrl || '',
                  captions: videoData?.captions || [],
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
