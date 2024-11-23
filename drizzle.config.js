import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://ai-short-generator_owner:HNJshD9Ui1wG@ep-fancy-butterfly-a55ze3il.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require",
  },
});
