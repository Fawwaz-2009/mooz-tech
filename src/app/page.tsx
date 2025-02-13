import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Mail, Linkedin, MessageCircle, BookOpenText, MoveUpRight, CodeXml, LibraryBig } from 'lucide-react';

const Navigation = () => (
  <nav className="mx-auto flex max-w-[1368px] items-center justify-between px-4 pt-12">    
    <Link href="/" className='p-[5px] bg-[#FFFFFF] bg-opacity-80 outline outline-1 outline-[#E5E5E5] rounded-full'>
      <img src="/mooz-face.png" alt="Logo" className="h-10 w-auto rounded-full" />
    </Link>

    <Button asChild className='shadow-md'>
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
        {` Hi I'm the guy behind  and with 9+ years of turning complex problems into elegant solutions, I build products that excite me—and hopefully
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
      <p className="text-2xl text-muted-foreground">fawwaz@.tech</p>
      <ul className="flex w-60 w-full justify-between gap-4">
        <li>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:fawwaz@.tech">
              <Mail className="!h-7 !w-7" />
            </a>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/fawwaz-">
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
  <div className="flex flex-col w-full h-full gap-6 px-8 py-7 bg-[#f7f7f9] rounded-big outline outline-1 outline-[#DEDEE0]">

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
    <p className="text-medium-1 text-gray-400 font-regular">Hi I'm the guy behind .</p>
    <p className="text-medium-1 text-gray-400 font-regular">I have 9+ years of turning complex problems into elegant solutions.</p>
    <p className="text-medium-1 text-gray-400 font-regular">I develop minimalist, but mighty apps for the web fast</p>
    <p className="text-medium-1 text-gray-400 font-regular">I build products that excite me—and hopefully you too.</p>
    <p className="text-medium-1 text-gray-400 font-regular">Let's connect if you're nearby! 🌊</p>

  </div>
)

const ContactCard2 = () => (
  <div className="flex flex-col w-full h-full gap-4 px-8 py-[27px] bg-[#f7f7f9] rounded-big outline outline-1 outline-[#DEDEE0]">
    {/* Header */}
    <div className="text-small-3 text-gray-400 pl-2 py-2">CONNECT THROUGH</div>

    {/* Link */}
    <div className="grid grid-rows-2 grid-flow-col  gap-x-[20px] gap-y-[16px]">
      
      {/* Email */}
      <div className="flex flex-col gap-[10px] px-5 pt-4 pb-[10px] bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/gmail.png" alt="Gmail" className="h-10 w-10" />
        
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-small-1 text-gray-400">Email</p>

          <Link href="/" legacyBehavior>
            <a className="p-[5px] bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0]">
              <MoveUpRight className='w-4 h-4 stroke-2 opacity-40 stroke-[#0D1117]'/>
            </a>
          </Link>

        </div>
      </div>

      {/* LinkedIn */}
      <div className="flex flex-col gap-[10px] px-5 pt-4 pb-[10px] bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/linkedin.png" alt="LinkedIn" className="h-10 w-10" />
        
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-small-1 text-gray-400">LinkedIn</p>

          <Link href="/" legacyBehavior>
            <a className="p-[5px] bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0]">
              <MoveUpRight className='w-4 h-4 stroke-2 opacity-40 stroke-[#0D1117]'/>
            </a>
          </Link>
        </div>
      </div>

      {/* Cal */}
      <div className="flex flex-col gap-[10px] px-5 pt-4 pb-[10px] bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/cal.png" alt="Cal.com" className="h-10 w-10" />
        
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-small-1 text-gray-400">Cal.com</p>

          <Link href="/" legacyBehavior>
            <a className="p-[5px] bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0]">
              <MoveUpRight className='w-4 h-4 stroke-2 opacity-40 stroke-[#0D1117]'/>
            </a>
          </Link>
        </div>
      </div>
      
      {/* WhatsApp */}
      <div className="flex flex-col gap-[10px] px-5 pt-4 pb-[10px] bg-[#FEFEFE] rounded-small outline outline-1 outline-[#F0F0F0] shadow-sm">
        <img src="/channel/whatsapp.png" alt="WhatsApp" className="h-10 w-10" />
        
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-small-1 text-gray-400">WhatsApp</p>

          <Link href="/" legacyBehavior>
            <a className="p-[5px] bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0]">
              <MoveUpRight className='w-4 h-4 stroke-2 opacity-40 stroke-[#0D1117]'/>
            </a>
          </Link>
        </div>
      </div>

    </div>
  </div>
)

const WritingsCard2 = () => (
  <div className="flex flex-col h-full outline outline-1 outline-[#DEDEE0] rounded-big overflow-clip">
    {/* Header */}
    <div className="flex flex-row gap-2 w-full items-center px-8 py-[27px] bg-[#E9F5FF] border-b-[2px] border-[#D2DDE5]">
      <BookOpenText className='h-6 w-6 stroke-dark-blue stroke-[1.5px]' />
      <p className='text-small-3 font-sans font-semibold uppercase text-dark-blue'>Journal on Building Product</p>
    </div>

    {/* Content */}
    <div className="w-full h-full min-h-[238px] bg-[#F7F7F9] relative">

      {/* Line */}
      <div className="flex flex-col w-full gap-[51px] pt-[51px]">
        <hr className="w-full border-2" />
        <hr className="w-full border-2" />
        <hr className="w-full border-2" />
        <hr className="w-full border-2" />
      </div>

      {/* Image */}
      <img src="/writings/hand.png" alt="Hand" className="absolute top-3 left-9" />

      {/* Icon */}
      <Link href="/" legacyBehavior>
        <a className="absolute bottom-4 left-4 p-2 bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0]">
          <MoveUpRight className='w-6 h-6 stroke-2 opacity-40 stroke-[#0D1117]'/>
        </a>
      </Link>

    </div>
  </div>
)

const Projects = () => (
  <div className="flex flex-col h-full outline outline-1 outline-[#DEDEE0] rounded-big overflow-clip">
    {/* Header */}
    <div className="flex flex-row gap-2 w-full items-center px-8 py-[27px] bg-[#FEF0F1] border-b-[2px] border-[#F1E4E5] z-20">
      <CodeXml className='h-6 w-6 stroke-dark-red stroke-[1.5px]' />
      <p className='text-small-3 font-sans font-semibold uppercase text-dark-red'>Interactive Projects Collection</p>
    </div>

    {/* Content */}
    <div className="w-full h-full min-h-[571px] bg-white relative">

      {/* Icon */}
      <Link href="/" legacyBehavior>
        <a className="absolute bottom-4 left-4 p-2 bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0] z-20">
           <MoveUpRight className='w-6 h-6 stroke-2 opacity-40 stroke-[#0D1117]'/>
        </a>
      </Link>

      {/* Image */}
      <img src="/projects/code-bg.png" alt="Moon" className="absolute top-[74px] max-w-none left-1/2 transform -translate-x-1/2" />
      <img src="/projects/moon.png" alt="Moon" className="absolute bottom-[-24px] max-w-none left-1/2 transform -translate-x-1/2" />
      <img src="/projects/mountain.png" alt="Mountain" className="absolute bottom-0 max-w-none left-1/2 transform -translate-x-1/2" />
      <img src="/projects/rocket.png" alt="Rocket" className="absolute bottom-[-105px] left-1/2 transform -translate-x-1/2" />
      <img src="/projects/forest.png" alt="Forest" className="absolute bottom-0 max-w-none left-1/2 transform -translate-x-1/2" />
    </div>
  </div>
)

const BooksCard2 = () => (
  <div className="flex flex-col h-full bg-[#f7f7f9] outline outline-1 outline-[#DEDEE0] rounded-big overflow-clip">
    {/* Header */}
    <div className="flex flex-row gap-2 w-full items-center px-8 py-[27px]">
      <LibraryBig className='h-6 w-6 stroke-dark-gray stroke-[1px]' />
      <p className='text-small-3 font-sans font-reglar uppercase text-dark-gray'>Recommended Books</p>
    </div>

    {/* Content */}
    <div className="w-full h-full min-h-[238px] bg-[#F7F7F9] relative">

      {/* Icon */}
      <Link href="/" legacyBehavior>
        <a className="absolute bottom-4 left-4 p-2 bg-[#ffffff] bg-opacity-50 rounded-full outline outline-2 outline-[#DEDEE0] z-20">
          <MoveUpRight className='w-6 h-6 stroke-2 opacity-40 stroke-[#0D1117]'/>
        </a>
      </Link>

      {/* Rainbow BG */}
      <img src="/rainbow.png" alt="rainbow" className='absolute w-full opacity-20' />

      {/* Books-Image */}
      <div className="flex flex-row absolute bottom-[-64px] right-[-241px] z-0">
        <img src="/books-display/book-01.png" alt="Book-1" className='rotate-[-15deg]' />
        <img src="/books-display/book-02.png" alt="Book-2" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-03.png" alt="Book-3" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-04.png" alt="Book-4" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-05.png" alt="Book-5" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-06.png" alt="Book-6" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-07.png" alt="Book-7" className='rotate-[-15deg] -ml-[115px]' />
        <img src="/books-display/book-08.png" alt="Book-8" className='rotate-[-15deg] -ml-[115px]' />
      </div>
    </div>
  </div>
)

const Logo = () => (
  <div className="flex items-center justify-center relative w-full h-full min-h-[315px] bg-[#FFDC1C] outline outline-4 outline-[#E5C619] rounded-big overflow-clip">
    <img src="/mooz-logo-backdrop.png" alt="" className='absolute max-w-none rotate-[15deg]'/>
    <img src="/mooz-wordmark.png" alt="" className='z-20'/>
  </div>
)

const UpdateInfo = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[328px] outline-dashed outline-[6px dashed 4px] outline-[#DCDCDD] rounded-big overflow-clip">
    <p className='text-medium-2 font-regular text-[#B3B3B3] text-center]'>A new update is coming soon..</p>
  </div>
)

export default function Home() {
  return (
    <div className="">
      <div className="fixed w-full z-40">
        <Navigation />
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-[1368px] grid-cols-1 justify-center px-4 pt-[174px] pb-16">
        
        {/* Card */}
        <div className="grid xl:grid-cols-3 xl:grid-rows-3 gap-5">
          <div className="xl:row-span-2">
            <ProfileCard2 />
          </div>
          
          <div className="xl:col-span-2">
            <BooksCard2 />
          </div>
          
          <div>
            <Logo />
          </div>
          
          <div className="xl:row-span-2">
            <Projects />
          </div>

          <div>
            <ContactCard2 />
          </div>

          <div>
            <WritingsCard2 />
          </div>
        
          <div className="xl:col-span-3">
            <UpdateInfo />
          </div>
        </div>        
      </div>
    </div>
  );
}
