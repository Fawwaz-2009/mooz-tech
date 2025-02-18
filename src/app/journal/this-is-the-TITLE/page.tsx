import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Sparkle, ArrowRight, ArrowLeft, House } from 'lucide-react';

const Header = () => (
    <div className="flex w-full h-[259px] bg-[#F7F7F9] relative">

        {/* Line */}
        <div className="flex flex-col gap-[60px] absolute w-full z-0 top-16">
            <hr className="w-full border-2" />
            <hr className="w-full border-2" />
            <hr className="w-full border-2" />
        </div>

        {/* Navigation */}
        <div className="max-w-[840px] w-full flex flex-col justify-end items-start gap-[96px] px-5 bottom-[30px] mx-auto pb-[19px] z-10">
            
            {/* Navigation */}
            <Link href="/journal" className='hover:cursor-pointer group/back'>
                <div className="flex flex-row gap-3 items-center">
                    <ArrowLeft className='w-6 h-6 stroke-[#757B80] group-hover/back:stroke-[#E29628]'/>
                    <p className='text-medium-1 font-regular text-[#707070] text-center group-hover/back:font-medium group-hover/back:text-[#E29628]'>All journals</p>
                </div>
            </Link>

            {/* Breadcrumbs */}
            <div className="flex flex-row gap-3">
                <Link href="/">
                    <House className='stroke-[#707070] hover:fill-[#FBA72D] hover:stroke-[#E29628]'/>
                </Link>
                
                <p className='text-medium-1 font-regular text-[#707070] text-center'>/</p>

                <Link href="/journal" className='group/journal-link'>
                    <p className='text-medium-1 font-regular text-[#707070] text-center group-hover/journal-link:text-[#E29628] group-hover/journal-link:font-medium'>Journals</p>
                </Link>

                <p className='text-medium-1 font-regular text-[#707070] text-center'>/</p>
                <p className='text-medium-1 font-medium text-[#2F3133] text-center'>This is the TITLE</p>
            </div>
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

// Content
const Title = () => (
    <h1 className='text-big-0 font-semibold pb-4'>This is the TITLE</h1>
)

const SubTitle = () => (
    <p className="text-medium-2 font-regular text-[#707070] pb-3">For the title, padding bottom = 16px; for subheader, padding bottom = 12px</p>
)

const Date = () => (
    <div className="flex flex-row gap-2 py-3 w-full items-center border-t border-b border-[#DEDEE0]">
        <Sparkle className='w-8 h-8 fill-[#FBA72D] stroke-[#E29628]'/>
        <p className="text-medium-1 font-regular text-[#707070]">Feb 08, 2025</p>
    </div>
)

const SectionTitle = () => (
    <h2 className="text-big-2 font-semibold pb-8">The challenge: Creating a great API exploration environment</h2>
)

const Paragraph = () => (
    <p className="text-medium-1 font-regular text-[#707070] pb-4">Scale AI, a leader in AI-powered data solutions, was set to launch a groundbreaking new product. Recognizing that exceptional documentation could make or break developer adoption, Scale AI sought a solution that could provide an immersive, interactive experience for their API while maintaining brand consistency and reducing documentation overhead.</p>
)

const ListDecimal = () => (
    <div className='list-decimal'>
        <li className="text-medium-1 font-regular text-[#707070] pb-4">Providing developers with a hands-on way to explore and test API endpoints</li>
        <li className="text-medium-1 font-regular text-[#707070] pb-4">Providing developers with a hands-on way to explore and test API endpoints</li>
        <li className="text-medium-1 font-regular text-[#707070] pb-4">Providing developers with a hands-on way to explore and test API endpoints</li>
    </div>
)

const CallOut = () => (
    <div className="py-4 px-8 bg-[#FBA72D] bg-opacity-20 rounded-[8px]">
        <p className="text-medium-1 font-regular text-[#97641B] italic">"I lost the list of components that need to be added, so I'll make a callout instead"</p>
    </div>
)

export default function Home() {
    return (
        <div className="relative">
            <Header />

            {/* Content */}
            <div className="mx-auto grid max-w-[840px] grid-cols-1 justify-center px-5 pt-[72px] pb-16 gap-y-[64px]">

                {/* Head */}
                <div className="flex flex-col gap-9">
                    <div className="flex flex-col">
                        <Title />
                        <SubTitle />
                    </div>
                    
                    <Date />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-12">
                    <Paragraph />
                    <img src="/replacer-image-big.png" alt="Image" />
                    <CallOut />
                    {/* Section-1 */}
                    <div className="flex flex-col">
                        <SectionTitle />
                        <Paragraph />
                        <ListDecimal />
                        <Paragraph />
                    </div>
                    {/* Section-2 */}
                    <div className="flex flex-col">
                        <SectionTitle />
                        <Paragraph />
                        <ListDecimal />
                        <Paragraph />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col mx-auto grid-cols-1 justify-center px-4 bg-[#F7F7F9]">
                <div className="flex justify-center max-w-[884px] mx-auto w-full border-b border-[#C6C6C7]">
                    <h6 className="uppercase font-sans text-big-5 text-[#7C7C7D] font-bold pt-[72px] pb-14">More Stories You'll Enjoy</h6>
                </div>
                
                <div className="mx-auto grid max-w-[884px] grid-cols-1 justify-center pb-[96px]">
                    <Card />
                    <Card />
                    <Card />

                    {/* Back Navigation */}
                    <Link href="/journal">
                        <div className="flex flex-row">
                            {/* Arrow */}
                            <div className="flex justify-center items-center w-[120px] h-full py-5 border-b border-[#C6C6C7]">
                                <ArrowLeft className='h-10 w-10 stroke-1 opacity-40 stroke-[#0D1117]'/>
                            </div>

                            {/* Text */}
                            <div className="flex items-center px-8 border-b border-[#C6C6C7] w-full">
                                <p className='text-medium-1 font-regular text-[#707070]'>All journals</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}