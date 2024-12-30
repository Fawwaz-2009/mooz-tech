import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side content */}
        <div className="space-y-8">
          {/* Main content card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="mb-4">
              <Image
                src="/mooz-logo.png"
                alt="Mooz Logo"
                width={60}
                height={60}
                className="rounded-full bg-yellow-300"
              />
            </div>
            <h1 className="text-6xl font-bold mb-6 italic">HELLO!</h1>
            <p className="text-xl">
              I&apos;m Fawwaz, and I build things for the web.
            </p>
            <p className="text-xl mt-4">
              Through Mooz, I help people turn their exciting ideas into real projects.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-6">
            <Link 
              href="/tools"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="text-3xl">🛠️</span>
                <span className="text-lg font-medium group-hover:text-blue-600 transition-colors">
                  Tools I use
                </span>
              </div>
            </Link>

            <Link 
              href="/contact"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="text-3xl">📞</span>
                <span className="text-lg font-medium group-hover:text-blue-600 transition-colors">
                  Contact me
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden md:block">
          <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden">
            <Image
              src="/fawwaz.png"
              alt="Fawwaz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
