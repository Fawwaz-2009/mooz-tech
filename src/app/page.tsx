import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, MessageCircle } from "lucide-react";

const Navigation = () => (
  <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
    <Link href="/">
      <img src="/mooz-logo2.jpg" alt="Logo" className="h-16 w-auto rounded-full" />
    </Link>
    <Button asChild>
      <Link href="https://cal.com/fawwaz/dev">Book a call</Link>
    </Button>
  </nav>
);

const Hero = () => (
  <div className="flex flex-col gap-4">
    <h1 className="text-left w-80 md:w-auto md:text-center font-mono text-3xl md:text-5xl font-light leading-normal">
      I develop <span className="font-bold">minimalist</span> but <span className="font-bold">mighty</span> apps for the web,{" "}
      <span className="font-bold">FAST</span>.
    </h1>
  </div>
);

const ProfileCard = () => (
  <div className="rounded-3xl bg-[#f7f7f9] p-6 pb-7 relative shadow-md">
    <div className="flex flex-col gap-4 md:grid md:grid-rows-2 items-between h-full">
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <img src="/fawwaz-avatar.png" alt="Avatar" className="h-16 w-16 rounded-full bg-orange-300" />
          <h2 className="text-2xl font-bold">Fawwaz Alharbi</h2>
          <p className="text-gray-600">Builder of apps, based in Bali</p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-green-600">Available</span>
          </div>
        </div>
      </div>
      <p className="text-xl text-gray-700 mt-4">
        {` Hi I'm the guy behind Mooz and with 9+ years of turning complex problems into elegant solutions, I build products that excite me—and hopefully
        you too. Let's connect if you're nearby! 🌊`}
      </p>
    </div>
  </div>
);

const WritingsCard = () => (
  <div className="h-80 w-full rounded-3xl bg-red-200 overflow-hidden relative md:col-span-2 shadow-md">
    <img src="/writings-2.png" alt="" className="h-full w-full object-cover brightness-[0.75]" />
    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-4">
      <h3 className="text-2xl font-bold text-white">Writings</h3>
      <p className="text-white">My thoughts on building products</p>
    </div>
  </div>
);

const BooksCard = () => (
  <div className="h-80 w-full rounded-3xl bg-[#f2f2f2] overflow-hidden relative shadow-md">
    <div className="relative w-full h-48 flex justify-center">
      <div className="absolute transform rotate-[-8deg] translate-y-4 translate-x-4">
        <Image src="/books/fooled-by-randomness.png" alt="Fooled by Randomness" width={140} height={180} className="rounded shadow-lg" />
      </div>
      <div className="absolute transform translate-x-8 rotate-[-4deg]">
        <Image src="/books/this-is-marketing.png" alt="This is Marketing" width={140} height={180} className="rounded shadow-lg" />
      </div>
      <div className="absolute transform rotate-[4deg] -translate-y-2 -translate-x-2">
        <Image src="/books/sprint.png" alt="Sprint" width={140} height={180} className="rounded shadow-lg" />
      </div>
      <div className="absolute transform rotate-[-4deg] translate-y-2 translate-x-2">
        <Image src="/books/refactoring-ui.png" alt="Refactoring UI" width={140} height={180} className="rounded shadow-lg" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-4">
      <h3 className="text-2xl font-bold">Books</h3>
      <p>{`Books I've read and recommend`}</p>
    </div>
  </div>
);

const LovableAppsCard = () => (
  <div className="h-80 w-full rounded-3xl bg-red-200 overflow-hidden relative shadow-md">
    <img src="/love-apps.jpg" alt="" className="h-full w-full object-cover brightness-[0.75]" />
    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-4">
      <h3 className="text-2xl font-bold text-white">Lovable Apps</h3>
      <p className="text-white">(coming)</p>
    </div>
  </div>
);

const BookCallCard = () => (
  <Link href="https://cal.com/fawwaz/dev" target="_blank" rel="noopener noreferrer" className="h-96 rounded-3xl bg-yellow-200 relative shadow-md">
    <p className="text-4xl font-semibold text-center pt-20 font-mono">Book a call with me</p>
    <div className="absolute bottom-0 w-full flex justify-center h-48 pb-8">
      <img src="/cal.png" alt="Calendar" className="h-48 w-auto" />
    </div>
  </Link>
);

const ContactCard = () => (
  <div className="h-96 rounded-3xl bg-slate-200 grid gird-cols-1 items-center justify-center text-center shadow-md">
    <div className="flex flex-col gap-10 items-center">
      <p className="text-4xl font-semibold font-mono">Contact Me</p>
      <p className="text-muted-foreground text-2xl">fawwaz@mooz.tech</p>
      <ul className="flex gap-4 w-full justify-between w-60">
        <li>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:fawwaz@mooz.tech">
              <Mail className="!h-7 !w-7" />
            </a>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/fawwaz-mooz">
              <Linkedin className="!h-7 !w-7" />
            </a>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://wa.me/6281234567890">
              <MessageCircle className="!h-7 !w-7" />
            </a>
          </Button>
        </li>
      </ul>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-center gap-24 md:gap-32 p-4 pt-20 md:pt-40">
        <Hero />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,2fr]">
          <ProfileCard />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
            <WritingsCard />
            <BooksCard />
            <LovableAppsCard />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BookCallCard />
          <ContactCard />
        </div>

        <div className="flex items-center justify-center gap-4 py-20">
          <h2 className="text-4xl md:text-7xl font-light">Thank you</h2>
          <span className="text-4xl md:text-6xl">🙏</span>
        </div>
      </div>
    </div>
  );
}
