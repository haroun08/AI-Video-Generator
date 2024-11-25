AI Short Video Generator, developed with Next.js, Clerk as a cloud-based authentication service, ShadCN, Tailwind CSS, Neon, and frameworks like Remotion to create videos from a combination of captions, images, and audio.
- Gemini API Key for generating text scripts,
- Google API Key for text-to-speech services,
- Firebase API Key to store audio on Firebase Storage,
- Caption API Key for generating captions, which is unfortunately a paid service, so captions are not displayed in the videos,
- AI-generated images are sourced from services like Replicate, ChatGPT, and DALL·E, which are also paid, so the images will be fetched from our Drizzle database.
We use Neon for database services and are deploying the website on Netlify.

Below are some images of the application. You can see a demo on YouTube via this link:   https://youtu.be/UYzWxpZJmHo
Additionally, you can visit my official portfolio here:  : https://harounbarhoumi-portfolio.netlify.app

![alt text](<Capture d'écran 2024-11-25 014415.png>)
![alt text](<Capture d'écran 2024-11-25 014448.png>)
![alt text](<Capture d'écran 2024-11-25 014501.png>)
![alt text](<Capture d'écran 2024-11-25 014516.png>)
![alt text](<Capture d'écran 2024-11-25 014546.png>)
![alt text](<Capture d'écran 2024-11-25 014602.png>)
![alt text](<Capture d'écran 2024-11-25 014633.png>)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


