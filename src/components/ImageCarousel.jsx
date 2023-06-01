import { Carousel } from 'antd';
import React from 'react';

export default function ImageCarousel({ imageUrls, autoSlide = true, autoSlideInterval = 5000 }) {
    // const [current, setCurrent] = useState(0);

    // const prev = () => setCurrent((current) => (current === 0 ? imageUrls.length - 1 : current - 1))
    // const next = () => setCurrent((current) => (current === imageUrls.length - 1 ? 0 : current + 1))

    // useEffect(() => {
    //     if(!autoSlide) return;
    //     const slideInterval = setInterval(next, autoSlideInterval);

    //     return () => clearInterval(slideInterval);
    // })

    return (
        <div className='rounded-lg overflow-hidden'>
            <Carousel autoplay={autoSlide}>
                {imageUrls.map((imageUrl) => (
                    <div key={imageUrl} className='h-[450px]'>
                        <img alt="bird ad" className='w-full h-full object-cover' src={imageUrl}/>
                    </div>
                ))}
            </Carousel>
        </div>
        // <div className='carousel overflow-hidden relative'>
        //     <div className='flex duration-200 bg-red-200' style={{transform: `translateX(-${current * 100}%)`}}>
        //         {imageUrls.map((imageUrl) => (
        //             <img alt="..." className='object-cover w-full' src={imageUrl}/>
        //         ))}
        //     </div>
        //     <div className='absolute inset-0 flex items-center justify-between p-4'>
        //         <button onClick={prev} className='rounded-full text-white hover:bg-neutral-200 hover:text-neutral-700 w-12 h-12 duration-200'><FontAwesomeIcon icon={faChevronLeft} size='xl'/></button>
        //         <button onClick={next} className='rounded-full text-white hover:bg-neutral-200 hover:text-neutral-700 w-12 h-12 duration-200'><FontAwesomeIcon icon={faChevronRight} size='xl'/></button>
        //     </div>
        //     <div className='absolute bottom-0 right-0 left-0'>
        //         <div className='flex items-center justify-center gap-2 pb-4'>
        //             {imageUrls.map((imageUrl, i) => (
        //                 <div key={imageUrl} className={`w-8 h-2 rounded-sm duration-200 ${current === i ? "bg-sky-500" : "bg-orange-500"}`}></div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    )
}
