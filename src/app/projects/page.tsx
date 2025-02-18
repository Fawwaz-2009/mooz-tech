import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Play } from 'lucide-react';

const Navigation = () => (
    <nav className="mx-auto flex justify-center max-w-[1368px] items-center px-4 pt-12">    
      <Link href="/" className='p-[10px] bg-[#FFFFFF] bg-opacity-80 outline outline-1 outline-[#E5E5E5] rounded-full transition hover:bg-accent shadow-md'>
        <X className="w-8 h-8 stroke-2 opacity-40 stroke-[#0D1117]" />
      </Link>
    </nav>
  );

const Header = () => (
    <div className="flex w-full h-[259px] bg-[#F7F7F9]">

        {/* Title */}
        <div className="flex flex-col justify-end items-center gap-3 bottom-[30px] mx-auto z-10">
            <div className="flex flex-row gap-3">
                <h2 className='text-big-1 font-medium text-[#E15E36]'>&lt;h1&gt;</h2>
                <h2 className='text-big-1 font-semibold'>Code Lab</h2>
                <h2 className='text-big-1 font-medium text-[#E15E36]'>&lt;/h1&gt;</h2>
            </div>
            <p className='text-medium-1 font-regular text-[#707070] text-center pb-[30px]'>A collection of small-scale projects and experiments.</p>
        </div>
    </div>
)

const Card = () => (
    <div className='flex flex-row'>

        <div className="flex flex-col w-full rounded-[24px] overflow-hidden outline outline-1 outline-[#DEDEE0]">

            {/* Project Display */}
            <div className="w-full overflow-hidden style={{ paddingBottom: '56.25%' }}" >
                <img src="/replacer-image-medium.png" alt="Project Image" className='w-full h-full object-contain' />
            </div>

            {/* Projects */}
            <div className="flex flex-col justify-between py-[30px] px-8 bg-[#F9F9FA] gap-9">
                
                {/* Project Title */}
                <div className='flex flex-col gap-[6px]'>
                    {/* Published Date */}
                    <p className='text-medium-1 font-regular text-[#707070]'>Feb 08, 2025</p>

                    <div className='flex flex-col gap-2'>
                        <h3 className='text-big-4 font-semibold line-clamp-2 text-ellipsis'>The longest title that can be displayed is limited to 2 lines and the
                        </h3>
                        <p className='text-medium-1 font-regular text-[#707070] pb-8 line-clamp-3 overflow-hidden text-ellipsis break-words max-h-[89px]'>A comprehensive guide that bridges the gap between design and development, offering practical tips and insights to improve user interfaces without relying on a design background.</p>
                    </div>
                </div>
        
                <Link href="/projects/project-1">
                    <Button variant="outline" size="updatedSize" iconPosition="left" className='w-full' icon={<Play className='fill-black' />}>
                        Play
                    </Button>
                </Link>
            </div>
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
            <div className="mx-auto grid max-w-[1388px] grid-rows-2 grid-cols-3 justify-center px-4 pt-[72px] pb-16 gap-y-8 gap-x-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}