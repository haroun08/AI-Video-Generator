const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a scirpit to generate 30 sec video talking about islam  and give me it in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot create a video script in JSON format that will automatically generate a 30-second video about Islam.  Video generation requires image/video editing software and potentially AI tools that are not directly accessible or controllable through a JSON script alone.  JSON is a data format, not a video production tool.\n\n\nHowever, I can provide you with a JSON structure that *represents* a potential script outline for a 30-second video about Islam.  You would then need to use this structure as a guide to create the video using a video editing program.\n\n\n```json\n{\n  \"title\": \"A Glimpse into Islam\",\n  \"duration\": 30,  // seconds\n  \"segments\": [\n    {\n      \"start\": 0,\n      \"end\": 5,\n      \"visuals\": [\"images/kaaba.jpg\", \"images/mosque.jpg\"],  // Replace with actual image paths\n      \"audio\": \"intro music (0-5 seconds)\",\n      \"text\": \"Islam: A faith of peace, submission to God.\"\n    },\n    {\n      \"start\": 5,\n      \"end\": 15,\n      \"visuals\": [\"images/prayer.jpg\", \"images/quran.jpg\"],\n      \"audio\": \"narration explaining the five pillars (briefly)\",\n      \"text\": \"Five Pillars: Faith, Prayer, Charity, Fasting, Pilgrimage\"\n    },\n    {\n      \"start\": 15,\n      \"end\": 25,\n      \"visuals\": [\"images/community.jpg\", \"images/family.jpg\"],\n      \"audio\": \"narration highlighting community and family values\",\n      \"text\": \"Community, compassion, and family are central to Islamic life.\"\n    },\n    {\n      \"start\": 25,\n      \"end\": 30,\n      \"visuals\": [\"images/peace.jpg\"],\n      \"audio\": \"outro music (25-30 seconds) + text overlay\",\n      \"text\": \"Learn more about Islam.  Peace be upon you.\"\n    }\n  ],\n  \"music\": {\n    \"intro\": \"path/to/intro_music.mp3\",\n    \"outro\": \"path/to/outro_music.mp3\"\n  },\n  \"narration\": \"path/to/narration.mp3\" // Or individual segment narrations\n}\n```\n\n**Important Considerations:**\n\n* **Accuracy:**  Ensure any information presented is factually accurate and avoids generalizations or stereotypes.  Islam is a diverse religion with many interpretations.\n* **Sensitivity:**  Approach the topic with respect and sensitivity, avoiding anything that could be considered offensive or disrespectful.\n* **Image and Audio Files:**  You'll need to replace the placeholder image and audio paths with your actual files.\n* **Video Editing Software:** You will need software like Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, or similar to assemble the video based on this JSON outline.\n\n\nThis JSON structure only provides a basic framework.  A real-world 30-second video would require much more detailed planning and execution.  Remember to research your topic thoroughly and create a script that is both informative and respectful.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format wih Image prompt and contentText as a field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"The Ballad of Lady Godiva\",\n  \"duration\": 30,\n  \"segments\": [\n    {\n      \"start\": 0,\n      \"end\": 5,\n      \"imagePrompt\": \"Realistic painting of a medieval English town, bustling marketplace, cobblestone streets, vibrant colors, historical accuracy, cinematic lighting\",\n      \"contentText\": \"1066. Coventry, England.  High taxes, a tyrannical lord, and a desperate plea...\"\n    },\n    {\n      \"start\": 5,\n      \"end\": 10,\n      \"imagePrompt\": \"Realistic portrait of Lady Godiva, beautiful, regal, compassionate, strong, long flowing blonde hair, medieval attire, determined expression\",\n      \"contentText\": \"Lady Godiva, wife of Leofric, Earl of Mercia, witnessed her husband's harsh rule firsthand.\"\n    },\n    {\n      \"start\": 10,\n      \"end\": 15,\n      \"imagePrompt\": \"Realistic painting of Lady Godiva riding a white horse, nude, long flowing hair concealing her body, crowds lining the streets, respectful and awed expressions on their faces,  historical setting, cinematic lighting\",\n      \"contentText\": \"She made a bold proposition: ride naked through the town if he would lower the taxes.  Her husband, initially skeptical, agreed.\"\n    },\n    {\n      \"start\": 15,\n      \"end\": 20,\n      \"imagePrompt\": \"Realistic painting of the townspeople gazing in awe and respect at Lady Godiva as she rides, a single person, perhaps a boy, looking away, showing a range of expressions from surprise to shame, historical setting, cinematic lighting\",\n      \"contentText\": \"The townsfolk, surprised and awestruck, obeyed her request for silence and respect.  One man, Peeping Tom, disobeyed...\"\n    },\n    {\n      \"start\": 20,\n      \"end\": 25,\n      \"imagePrompt\": \"Realistic illustration of a man peeking from a window, his face partially obscured by a curtain, a look of shock and fear on his visible features, historical setting\",\n      \"contentText\": \"Peeping Tom was punished for his indiscretion, forever memorializing the tale.\"\n    },\n    {\n      \"start\": 25,\n      \"end\": 30,\n      \"imagePrompt\": \"Realistic painting of Lady Godiva, riding away, serene, with the town in the background,  golden hour lighting, majestic scene, historical accuracy\",\n      \"contentText\": \"Lady Godiva's act of courage brought relief to her people, making her a legend for centuries to come.\"\n    }\n  ],\n  \"music\": {\n    \"type\": \"epic orchestral\",\n    \"mood\": \"dramatic\"\n  },\n  \"narration\": {\n    \"style\": \"authoritative and dramatic\"\n  }\n}\n```\n\n**To use this JSON:**\n\n1. **AI Image Generation:**  Use an AI art generator (like Midjourney, Dall-E 2, Stable Diffusion) and feed it the `imagePrompt` text for each segment to create the corresponding images.  Experiment with different generators and prompts to get the best results.\n2. **Video Editing:** Use video editing software (Premiere Pro, Final Cut Pro, DaVinci Resolve, etc.) to assemble the video. Import the generated images, add narration according to the `contentText`, and incorporate suitable music based on the `music` section specifications.\n\n\nRemember that the quality of the video will heavily depend on the quality of the AI-generated images and the skill of the video editor.  You may need to iterate on the image prompts to achieve the desired visual style.  Also, be aware of potential issues with AI-generated content regarding copyrights and usage rights.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  
  
  run();