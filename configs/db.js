import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); 

const sql = neon('postgresql://ai-short-generator_owner:HNJshD9Ui1wG@ep-fancy-butterfly-a55ze3il.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require');


export const db = drizzle({ client: sql });
