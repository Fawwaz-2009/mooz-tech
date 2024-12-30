import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full grid grid-cols-1 lg:grid-cols-2 lg:min-h-dvh lg:h-fit gap-3 items-center p-3">
      {/* Left side content */}
      <div className="border-2 rounded-lg border-primary/40 min-h-dvh h-fit md:min-h-0 md:h-full grid grid-rows-[1fr_auto] gap-3 p-3">
        {/* Main content card */}
        <div className="grid grid-rows-[auto_1fr] gap-3 border rounded-lg border-primary/40">
          <div className="p-3 flex justify-center">
            <Image src="/mooz-logo.jpg" alt="Mooz Logo" width={80} height={80} className="rounded-full bg-yellow-300" />
          </div>
          <div className="grid items-center">
            <div className="">
              <h1 className="text-[30vw] lg:text-[12vw] lg:leading-[0.8em] lg:mb-12 lg:mt-20 tracking-wider font-bold text-center font-bangers">HELLO!</h1>
              <p className="text-[6vw] lg:text-[2vw] px-8 mb-12 max-w-2xl mx-auto">
                I&apos;m Fawwaz, and I build things for the web. Through Mooz, I help people turn their exciting ideas into real projects.
              </p>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 gap-3">
          {/* <Link href="/tools" className="bg-white px-6 py-6 transition-all duration-300 group border rounded-lg border-primary/40 aspect-square lg:aspect-auto">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-3xl">🛠️</span>
              <span className="text-lg font-medium group-hover:text-blue-600 transition-colors">Tools I use</span>
            </div>
          </Link> */}

          <Button variant={"ghost"} asChild className="h-auto">
            <Link href="mailto:fawwaz@mooz.tech" target="_blank" rel="noopener noreferrer" className="bg-white px-6 py-6 transition-all duration-300 group border rounded-lg border-primary/40 aspect-square lg:aspect-auto">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-3xl">📞</span>
                <span className="text-lg font-medium">Contact me</span>
                {/* <Button variant={"outline"}>Contact me</Button> */}
              </div>
            </Link>
          </Button>
        </div>
      </div>

      {/* Right side image */}
      <div className="hidden lg:block w-full h-full">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image src="/fawwaz.png" alt="Fawwaz" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}
