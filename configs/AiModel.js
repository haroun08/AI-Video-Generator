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
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
       
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
  
