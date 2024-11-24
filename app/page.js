'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to-blue-500 text-white px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to the AI Video Generator App
        </h1>
        <p className="text-lg md:text-xl">
          This application is proudly developed by{" "}
          <span className="text-yellow-300 font-semibold">
            Haroun Barhoumi
          </span>.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="https://harounbarhoumi-portfolio.netlify.app" target="_blank">
            <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black">
              Visit My Portfolio
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="w-full md:w-auto bg-white hover:bg-gray-100 text-blue-500">
              Explore the Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
