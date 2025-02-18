import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Sparkle, ArrowRight } from 'lucide-react';

const Navigation = () => (
    <nav className="mx-auto flex justify-center max-w-[1368px] items-center px-4 pt-12">    
      <Link href="/" className='p-[10px] bg-[#FFFFFF] bg-opacity-80 outline outline-1 outline-[#E5E5E5] rounded-full transition hover:bg-accent shadow-md'>
        <X className="w-8 h-8 stroke-2 opacity-40 stroke-[#0D1117]" />
      </Link>
    </nav>
  );

const Header = () => (
    <div className="flex w-full h-[259px] bg-[#F7F7F9] relative">

        {/* Line */}
        <div className="flex flex-col gap-[60px] absolute w-full z-0 top-16">
            <hr className="w-full border-2" />
            <hr className="w-full border-2" />
            <hr className="w-full border-2" />
        </div>

        {/* Title */}
        <div className="flex flex-col justify-end items-center gap-3 bottom-[30px] mx-auto z-10">
            <h2 className='text-big-1 font-semibold'>Thoughts & Insights</h2>
            <p className='text-medium-1 font-regular text-[#707070] text-center pb-[30px]'>Lessons, ideas, and insights from building products.</p>
        </div>
    </div>
)

const Card = () => (
    <Link href="/journal/this-is-the-TITLE">
        <div className='flex flex-row'>
            {/* Project-Left */}
            <div className="flex flex-row gap-6 px-8 py-6 border-b border-[#C6C6C7] w-full">
                {/* Project Display */}
                <div className="min-w-[193px] h-[145px] rounded-[12px] overflow-hidden mt-2">
                    <img src="/replacer-image-small.png" alt="Project Image" className='w-full h-full object-contain' />
                </div>
                {/* Projects */}
                <div className="flex flex-col justify-between gap-8">
        
                    {/* Project Title */}
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-big-3 font-semibold max-h-9 line-clamp-1'>Refactoring UI</h3>
                        <p className='text-medium-1 font-regular text-[#707070] pb-8 line-clamp-3 max-h-[90px]'>A comprehensive guide that bridges the gap between design and development, offering practical tips and insights to improve user interfaces without relying on a design background.</p>
                    </div>
        
                    <div className='flex flex-row gap-2 items-center'>
                        <Sparkle className='fill-[#FBA72D] stroke-[#E29628] stroke-1 h-8 w-8'/>
                        <p className='text-medium-1 font-regular text-[#707070]'>Feb 08, 2025</p>
                    </div>
                </div>
            </div>
        
            {/* Arrow */}
            <div className="flex justify-center items-center w-[120px] border-b border-[#C6C6C7]">
                <ArrowRight className='h-10 w-10 stroke-1 opacity-40 stroke-[#0D1117]'/>
            </div>
        </div>
    </Link>
)

export default function Home() {
    return (
        
        <div className="relative">
            <Header />
            
            <div className="top-0 absolute w-full z-40">
                <Navigation />
            </div>

            {/* Cards */}
            <div className="mx-auto grid max-w-[1048px] grid-cols-1 justify-center px-4 pt-[72px] pb-16">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}