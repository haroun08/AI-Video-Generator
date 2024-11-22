import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: 'postgresql://ai-short-generator_owner:HNJshD9Ui1wG@ep-fancy-butterfly-a55ze3il.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require',
  },
});
