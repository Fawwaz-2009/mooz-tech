import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Mail, Linkedin, MessageCircle } from 'lucide-react';

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
    <h1 className="w-80 text-left font-mono text-3xl font-light leading-normal md:w-auto md:text-center md:text-5xl">
      I develop <span className="font-bold underline">minimalist</span> but <span className="font-bold">mighty</span> apps for the web, <span className="font-bold">FAST</span>.
    </h1>
  </div>
);

const ProfileCard = () => (
  <div className="relative rounded-3xl bg-[#f7f7f9] p-6 pb-7 shadow-md">
    <div className="items-between flex h-full flex-col gap-4 md:grid md:grid-rows-2">
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
      <p className="mt-4 text-xl text-gray-700">
        {` Hi I'm the guy behind Mooz and with 9+ years of turning complex problems into elegant solutions, I build products that excite me—and hopefully
        you too. Let's connect if you're nearby! 🌊`}
      </p>
    </div>
  </div>
);

const WritingsCard = () => (
  <Link href="/writings" className="relative h-80 w-full overflow-hidden rounded-3xl bg-red-200 shadow-md">
    <img src="/writings-2.png" alt="" className="h-full w-full object-cover brightness-[0.75]" />
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4">
      <h3 className="text-2xl font-bold text-white">Writings</h3>
      <p className="text-white">My thoughts on building products</p>
    </div>
  </Link>
);

const books = [
  {
    title: 'Refactoring UI',
    description:
      'A comprehensive guide that bridges the gap between design and development, offering practical tips and insights to improve user interfaces without relying on a design background.',
    ImageSrc: '/books/refactoring-ui.png',
    amazonUrl: 'https://www.refactoringui.com/',
  },
  {
    title: 'This Is Marketing',
    description:
      "Seth Godin's insightful book that redefines marketing, emphasizing the importance of empathy, connection, and making meaningful change over traditional advertising tactics.",
    ImageSrc: '/books/this-is-marketing.png',
    amazonUrl: 'https://www.amazon.com/dp/0525540830',
  },
  {
    title: 'Fooled by Randomness',
    description:
      "Nassim Nicholas Taleb's exploration of the hidden role of chance in life and markets, challenging the perception of skill and luck in the world of finance and beyond.",
    ImageSrc: '/books/fooled-by-randomness.png',
    amazonUrl: 'https://www.amazon.com/dp/0812975219',
  },
  {
    title: 'Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days',
    description:
      'Authored by Jake Knapp, this book introduces the design sprint process, a unique five-day method for solving tough problems, proven at more than 100 companies.',
    ImageSrc: '/books/sprint.png',
    amazonUrl: 'https://www.amazon.com/Sprint-Solve-Problems-Test-Ideas/dp/150112174X',
  },
  {
    title: 'Zag: The Number One Strategy of High-Performance Brands',
    description: "Marty Neumeier's guide on radical differentiation, providing 17 steps for designing difference into your brand to outmaneuver the competition.",
    ImageSrc: '/books/zag.png',
    amazonUrl: 'https://www.amazon.com/Zag-Number-Strategy-High-Performance-Brands/dp/0321426770',
  },
  {
    title: 'The Mom Test: How to Talk to Customers and Learn If Your Business is a Good Idea When Everyone is Lying to You',
    description: "Rob Fitzpatrick's practical guide on how to effectively communicate with customers to validate business ideas without being misled.",
    ImageSrc: '/books/the-mom-test.png',
    amazonUrl: 'https://www.amazon.com/Mom-Test-Customers-Business-Everyone/dp/1492180742',
  },
  {
    title: 'Dune',
    description: "Frank Herbert's science fiction masterpiece set on the desert planet Arrakis, exploring themes of politics, religion, and human nature.",
    ImageSrc: '/books/dune.png',
    amazonUrl: 'https://www.amazon.com/Dune-Frank-Herbert/dp/0441172717',
  },
  {
    title: 'The Brand Gap: How to Bridge the Distance Between Business Strategy and Design',
    description: "Marty Neumeier's essential primer on brand-building, illustrating how to close the gap between business strategy and design.",
    ImageSrc: '/books/the-brand-gap.png',
    amazonUrl: 'https://www.amazon.com/Brand-Gap-Distance-Business-Strategy/dp/0321348109',
  },
];

const BooksCard = () => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="relative h-80 w-full cursor-pointer overflow-hidden rounded-3xl bg-[#f2f2f2] shadow-md transition-colors hover:bg-[#e8e8e8]">
        <div className="relative flex h-48 w-full justify-center">
          {[...books].reverse().map((book, index) => (
            <div
              key={book.title}
              className={`absolute transform ${
                index === 0 ? 'translate-x-4 translate-y-4 rotate-[-8deg]' : index === 1 ? 'translate-x-8 rotate-[-4deg]' : '-translate-x-2 -translate-y-2 rotate-[4deg]'
              }`}
            >
              <img src={book.ImageSrc} alt={book.title} className="h-[180px] w-[140px] rounded object-cover shadow-lg" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4">
          <h3 className="text-2xl font-bold">Books</h3>
          <p>{`Books I've read and recommend`}</p>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl">Recommended Books</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-8">
        {books.map((book) => (
          <div key={book.title} className="flex flex-col gap-6 rounded-xl bg-slate-50 p-6 md:flex-row">
            <div className="h-64 w-full flex-shrink-0 md:flex md:w-48 md:items-center md:justify-center">
              <img src={book.ImageSrc} alt={book.title} className="h-full w-auto rounded-lg object-cover shadow-md" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">{book.title}</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">{book.description}</p>
              <div className="mt-auto">
                <Button asChild>
                  <Link href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                    Read it
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const ChallengesCard = () => (
  <Link href="/micro-wonders" className="group relative h-80 w-full overflow-hidden rounded-3xl bg-purple-200 shadow-md">
    <div className="absolute inset-0 flex items-center justify-center text-9xl">
      <span className="duration-500 group-hover:animate-pulse">🔮 </span>
    </div>
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4">
      <h3 className="text-2xl font-bold text-white">Micro Wonders</h3>
      <p className="text-white">A fun and creative space for your interactive experiments</p>
    </div>
  </Link>
);

const LovableAppsCard = () => (
  <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-red-200 shadow-md">
    <img src="/love-apps.jpg" alt="" className="h-full w-full object-cover brightness-[0.75]" />
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4">
      <h3 className="text-2xl font-bold text-white">Lovable Apps</h3>
      <p className="text-white">(coming)</p>
    </div>
  </div>
);

const BookCallCard = () => (
  <Link href="https://cal.com/fawwaz/dev" target="_blank" rel="noopener noreferrer" className="relative h-96 rounded-3xl bg-yellow-200 shadow-md">
    <p className="pt-20 text-center font-mono text-4xl font-semibold">Book a call with me</p>
    <div className="absolute bottom-0 flex h-48 w-full justify-center pb-8">
      <img src="/cal.png" alt="Calendar" className="h-48 w-auto" />
    </div>
  </Link>
);

const ContactCard = () => (
  <div className="gird-cols-1 grid h-96 items-center justify-center rounded-3xl bg-slate-200 text-center shadow-md">
    <div className="flex flex-col items-center gap-10">
      <p className="font-mono text-4xl font-semibold">Contact Me</p>
      <p className="text-2xl text-muted-foreground">fawwaz@mooz.tech</p>
      <ul className="flex w-60 w-full justify-between gap-4">
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
            <a href="https://wa.me/6287784281688">
              <MessageCircle className="!h-7 !w-7" />
            </a>
          </Button>
        </li>
      </ul>
    </div>
  </div>
);

// Updated

const ProfileCard2 = () => (
  <div className="flex flex-col w-full gap-6 px-8 py-7 bg-[#f7f7f9] rounded-big outline outline-1 outline-[#DEDEE0]">

    {/* First Row */}
    <div className="flex flex-row justify-between align-center items-start w-full">

      {/* Avatar */}
      <img src="/fawwaz-avatar.png" alt="Avatar" className="h-16 w-16 rounded-full bg-orange-300" />

      {/* Badge & Time */}
      <div className="flex flex-col h-full justify-around items-end gap-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-green-600 font-medium">Based in Bali</span>
        </div>
        <span className="text-gray-600 text-small-2 font-medium">8:27pm</span>
      </div>
    </div>

    {/* Second Row */}
    <h2 className="text-big-1 font-medium">
      Fawwaz Alharbi<span className="text-gray-300">—Builder of Apps</span>
    </h2>

    {/* Line */}
    <hr className="w-full" />

    {/* Last Row */}
    <p className="text-medium-1 text-gray-400 font-regular">Hi I'm the guy behind Mooz.</p>
    <p className="text-medium-1 text-gray-400 font-regular">I have 9+ years of turning complex problems into elegant solutions.</p>
    <p className="text-medium-1 text-gray-400 font-regular">I develop minimalist, but mighty apps for the web fast</p>
    <p className="text-medium-1 text-gray-400 font-regular">I build products that excite me—and hopefully you too.</p>
    <p className="text-medium-1 text-gray-400 font-regular">Let's connect if you're nearby! 🌊</p>

  </div>
)

const ContactCard2 = () => (
  <div className="flex flex-col w-full gap-4 px-8 py-[30px] bg-[#f7f7f9] rounded-big outline outline-1 outline-[#DEDEE0]">
    {/* Header */}
    <div className="text-small-3 text-gray-400 pl-2 py-2">CONNECT THROUGH</div>

    {/* Link */}
    <div className="grid grid-rows-2 grid-flow-col  gap-x-[20px] gap-y-[16px]">
      
      {/* Email */}
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/gmail.png" alt="Gmail" className="h-12 w-12" />
        
        <div className="flex flex-row w-full justify-between align-center">
          <p className="text-small-1 text-gray-400">Email</p>
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
          <g filter="url(#filter0_b_4441_7035)">
          <rect x="-0.000488281" y="0.875" width="30" height="30" rx="15" fill="white" fill-opacity="0.5"/>
          <rect x="0.832845" y="1.70833" width="28.3333" height="28.3333" rx="14.1667" stroke="#DEDEE0" stroke-width="1.66667"/>
          <g opacity="0.4" clip-path="url(#clip0_4441_7035)">
          <g clip-path="url(#clip1_4441_7035)">
          <path d="M19.1257 11.7507L10.8752 20.0012" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3345 11.7092L19.1265 11.7498L19.1681 17.5418" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </g>
          <defs>
          <filter id="filter0_b_4441_7035" x="-13.3338" y="-12.4583" width="56.6667" height="56.6667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.66667"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4441_7035"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4441_7035" result="shape"/>
          </filter>
          <clipPath id="clip0_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          <clipPath id="clip1_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          </defs>
          </svg>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/linkedin.png" alt="LinkedIn" className="h-12 w-12" />
        
        <div className="flex flex-row w-full justify-between align-center">
          <p className="text-small-1 text-gray-400">LinkedIn</p>
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
          <g filter="url(#filter0_b_4441_7035)">
          <rect x="-0.000488281" y="0.875" width="30" height="30" rx="15" fill="white" fill-opacity="0.5"/>
          <rect x="0.832845" y="1.70833" width="28.3333" height="28.3333" rx="14.1667" stroke="#DEDEE0" stroke-width="1.66667"/>
          <g opacity="0.4" clip-path="url(#clip0_4441_7035)">
          <g clip-path="url(#clip1_4441_7035)">
          <path d="M19.1257 11.7507L10.8752 20.0012" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3345 11.7092L19.1265 11.7498L19.1681 17.5418" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </g>
          <defs>
          <filter id="filter0_b_4441_7035" x="-13.3338" y="-12.4583" width="56.6667" height="56.6667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.66667"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4441_7035"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4441_7035" result="shape"/>
          </filter>
          <clipPath id="clip0_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          <clipPath id="clip1_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          </defs>
          </svg>
        </div>
      </div>

      {/* Cal */}
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/cal.png" alt="Cal.com" className="h-12 w-12" />
        
        <div className="flex flex-row w-full justify-between align-center">
          <p className="text-small-1 text-gray-400">Cal.com</p>
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
          <g filter="url(#filter0_b_4441_7035)">
          <rect x="-0.000488281" y="0.875" width="30" height="30" rx="15" fill="white" fill-opacity="0.5"/>
          <rect x="0.832845" y="1.70833" width="28.3333" height="28.3333" rx="14.1667" stroke="#DEDEE0" stroke-width="1.66667"/>
          <g opacity="0.4" clip-path="url(#clip0_4441_7035)">
          <g clip-path="url(#clip1_4441_7035)">
          <path d="M19.1257 11.7507L10.8752 20.0012" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3345 11.7092L19.1265 11.7498L19.1681 17.5418" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </g>
          <defs>
          <filter id="filter0_b_4441_7035" x="-13.3338" y="-12.4583" width="56.6667" height="56.6667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.66667"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4441_7035"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4441_7035" result="shape"/>
          </filter>
          <clipPath id="clip0_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          <clipPath id="clip1_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          </defs>
          </svg>
        </div>
      </div>
      
      {/* WhatsApp */}
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/whatsapp.png" alt="WhatsApp" className="h-12 w-12" />
        
        <div className="flex flex-row w-full justify-between align-center">
          <p className="text-small-1 text-gray-400">WhatsApp</p>
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
          <g filter="url(#filter0_b_4441_7035)">
          <rect x="-0.000488281" y="0.875" width="30" height="30" rx="15" fill="white" fill-opacity="0.5"/>
          <rect x="0.832845" y="1.70833" width="28.3333" height="28.3333" rx="14.1667" stroke="#DEDEE0" stroke-width="1.66667"/>
          <g opacity="0.4" clip-path="url(#clip0_4441_7035)">
          <g clip-path="url(#clip1_4441_7035)">
          <path d="M19.1257 11.7507L10.8752 20.0012" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3345 11.7092L19.1265 11.7498L19.1681 17.5418" stroke="#0D1117" stroke-width="1.64329" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </g>
          <defs>
          <filter id="filter0_b_4441_7035" x="-13.3338" y="-12.4583" width="56.6667" height="56.6667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.66667"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4441_7035"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4441_7035" result="shape"/>
          </filter>
          <clipPath id="clip0_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          <clipPath id="clip1_4441_7035">
          <rect width="20" height="20" fill="white" transform="translate(4.99951 5.875)"/>
          </clipPath>
          </defs>
          </svg>
        </div>
      </div>

    </div>
  </div>
)


export default function Home() {
  return (
    <div className="">
      <Navigation />
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-center gap-24 p-4 pt-20 md:gap-32 md:pt-40">
        <Hero />
        <ProfileCard2 />
        <ContactCard2 />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,2fr]">
          <ProfileCard />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
            <WritingsCard />
            <ChallengesCard />
            <BooksCard />
            <LovableAppsCard />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BookCallCard />
          <ContactCard />
        </div>

        <div className="flex items-center justify-center gap-4 py-20">
          <h2 className="text-4xl font-light md:text-7xl">Thank you</h2>
          <span className="text-4xl md:text-6xl">🙏</span>
        </div>
      </div>
    </div>
  );
}
