"use client";
import React, { useState, useEffect, useContext } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";

function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoScript, setVideoScript] = useState(null);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImagesList] = useState();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(1);


  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    getVideoScript();
    
  };

  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with Image prompt and contentText as a field`;

    console.log(prompt);
    try {
      const videoScript = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });
      console.log(videoScript.data.result);

      setLoading(false);
      setProgress(100);
      setVideoData((prev) => ({
        ...prev,
        videoScript: videoScript.data.result,
      }));
      setVideoScript(videoScript.data.result);

      GenerateAudioFile(videoScript.data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
      setLoading(false);
    }
  };
  /**
   * Generate Audio File and Save to Firebase Storage
   * @param {*} scriptData
   * @returns
   */
  const GenerateAudioFile = async (scriptData) => {
    try {
      if (typeof scriptData === "string") {
        try {
          scriptData = JSON.parse(scriptData);
        } catch (parseError) {
          console.error("Error parsing scriptData:", parseError);
          return;
        }
      }
      if (
        scriptData &&
        scriptData.segments &&
        Array.isArray(scriptData.segments)
      ) {
        let script = "";
        const id = uuidv4();

        scriptData.segments.forEach((item) => {
          if (item.contentText) {
            script += item.contentText + "\n";
          } else {
            console.error("Item is missing contentText:", item);
          }
        });
        console.log("Data Text--------", scriptData);
        const response = await axios.post("/api/generate-audio", {
          text: script,
          id: id,
        });
        setVideoData((prev) => ({
          ...prev
          //audioFile: resp.data.result,
        }));
        setAudioFileUrl(response.data);
        response.data.result &&
          GenerateAudioCaption(response.data.result, scriptData);
        console.log("Audio generated:", response.data);
      } else {
        console.error("'segments' is not an array or not defined.");
        console.log("ScriptData:", scriptData);
      }
    } catch (error) {
      console.error("Error parsing or processing scriptData:", error);
    }
  };
  /**
   * used generate caption from audio file
   * @param {*} fileUrl
   */
  const GenerateAudioCaption = async (fileUrl, scriptData) => {
    setLoading(true);
    console.log(fileUrl);
    await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });
    setCaptions(response?.data?.result);

    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    response.data.result && GenerateImage(scriptData);
  };

  /**
   * Generate AI images
   */
  const GenerateImage = async (scriptData) => {
    let images = [];
    for (const element of scriptData) {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (e) {
        console.log("Error:" + e);
      }
    }
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    setImagesList(images);
    setLoading(false);
  };
  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      SaveVideoData();
    }
  }, [videoData]);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : prev));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning({ id: VideoData?.id });
  
    setVideoId(result[0].id);  // Store the video ID
    console.log(result);
    setPlayVideo(true); // Set playVideo to true after data is saved
    setLoading(false);  // End the loading state
  };
  
  

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-ellipsis text-4xl text-primary text-center">
        Create New Video
      </h2>
      <div className="mt-10 shadow-sm p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} progress={progress} />
      <PlayerDialog playVideo={playVideo && videoId !== null} videoId={videoId} />
      </div>
  );
}

export default CreateNewVideo;
