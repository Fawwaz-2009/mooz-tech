import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

const Navigation = () => (
    <nav className="mx-auto flex justify-center max-w-[1368px] items-center px-4 pt-12">    
      <Link href="/" className='p-[10px] bg-[#FFFFFF] bg-opacity-80 outline outline-1 outline-[#E5E5E5] rounded-full transition hover:bg-accent shadow-md'>
        <X className="w-8 h-8 stroke-2 opacity-40 stroke-[#0D1117]" />
      </Link>
    </nav>
  );

const Header = () => (
    <div className="flex w-full h-[259px] bg-[#F7F7F9]">
        <div className="flex flex-col justify-end items-center gap-3 bottom-[30px] mx-auto">
            <h2 className='text-big-1 font-semibold'>Must-Read Books</h2>
            <p className='text-medium-1 font-regular text-[#707070] text-center pb-[30px]'>A curated list of books I've read and hightly recommend.</p>
        </div>
    </div>
)

const Card = () => (
    <div className="flex flex-row gap-6 px-8 py-[30px] bg-[#F9F9FA] outline outline-1 outline-[#F7F7F7] rounded-[32px]">

        {/* Books Display */}
        <div className="max-w-[206px] h-fit rounded-[4px] overflow-hidden">
            <img src="/books/refactoring-ui.png" alt="Dune" />
        </div>

        {/* Book */}
        <div className="flex flex-col justify-between">
            {/* Book Title */}
            <div className='flex flex-col gap-2'>
                <h3 className='text-big-3 font-semibold'>Refactoring UI</h3>
                <p className='text-medium-1 font-regular text-[#707070] pb-8'>A comprehensive guide that bridges the gap between design and development, offering practical tips and insights to improve user interfaces without relying on a design background.</p>
            </div>
            
            <Link href="/"><Button variant='outline' size="updatedSize" className='w-fit'>Start Reading</Button></Link>
        </div>
    </div>
)

export default function Home() {
    return (
        
        <div className="relative">
            <Header />
            
            <div className="top-0 absolute w-full z-40">
                <Navigation />
            </div>

            {/* Cards */}
            <div className="mx-auto grid max-w-[1048px] grid-cols-1 justify-center px-4 pt-[72px] pb-16 gap-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}