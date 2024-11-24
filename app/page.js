import { Button } from "@/components/ui/button";
import { SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1>Hatoun Barhoumi</h1>
      <Link href={'/dashboard'}>go To gadhboard</Link>
    </div>
  );
}
