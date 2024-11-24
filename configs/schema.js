import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
})

export const VideoData = pgTable('videoData',{
    id: serial('id').primaryKey(),
    script: varchar('script').notNull().array(),  
    audioFileUrl: varchar('audioFileUrl').notNull(),
    captions: varchar('captions').notNull().array(),  
    imageList: varchar('imageList').array(),  
    createdBy: varchar('createdBy').notNull(),
})