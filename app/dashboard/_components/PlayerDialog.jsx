import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db.select() 
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log(result);
    setVideoData(result[0]);
  };
  return (
    <div>
      <Dialog open={openDialog}>
        <DialogContent className="bg-white flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold my-5">
              Your Video is ready
            </DialogTitle>
            <DialogDescription>
              <Player
                component={RemotionVideo}
                durationInFrames={120}
                compositionWidth={450}
                compositionHeight={550}
                fps={30}
                inputProps={{
                    ...videoData
                }}
              />
              <div className="flex gap-10">
                <Button variant="ghost">Cancel</Button>
                <Button>Export</Button>
              </div>

              <RemotionVideo />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlayerDialog;
