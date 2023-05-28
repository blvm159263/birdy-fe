import React from 'react'
import Carousel from '../components/Carousel'
import ProductCardList from '../components/product/ProductCardList'

const imageUrls = [
  "https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg",
  "https://e1.pxfuel.com/desktop-wallpaper/194/463/desktop-wallpaper-fantasy-fractal-flower-art-1920x1080-fantasy-flower.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99nbZE_adEaQrWW8NhpXS8c9wBCv3n7qAhMct2z42rKysIvQvAmasokp1Uhj9sRQMBUU&usqp=CAU"
]

export default function HomePage() {
  return (
    <div id="homePage" className=''>
        <section className='container mx-auto flex flex-col pb-12'>
          <div className='flex justify-center py-6'>
            <img className='h-6' src="/assets/images/logo-orange.png" alt="logo" />
            <h1 className='font-bold text-2xl mx-4'><span className='text-sky-500'>Browse</span> Now</h1>
          </div>
          <Carousel imageUrls={imageUrls}/>
        </section>
        <section className='bg-neutral-100'>
          <div className='container mx-auto flex flex-col px-2 lg:px-0'>
            <div className='flex justify-center py-6'>
              <img className='h-6' src="/assets/images/logo-orange.png" alt="logo" />
              <h1 className='font-bold text-2xl mx-4'><span className='text-orange-500'>Feature</span> Product</h1>
            </div>
            <ProductCardList/>
            <button className='self-center rounded-sm bg-orange-500 text-white px-4 py-1 block mx-auto my-10'>SEE MORE</button>
          </div>
        </section>
        <section className='bg-gradient-to-tr from-sky-400 to-blue-500'>
         <div className='container mx-auto flex flex-col px-2 lg:px-0 py-4 pb-12'>
            <div className='flex flex-col justify-center items-center py-6'>
              <h1 className='text-white font-bold text-2xl mx-4'><span className='text-orange-500'>Keep</span> in <span className='text-orange-500'>Touch</span></h1>
              <p className='my-8 text-white'>Subscribe to our weekly newsletter and receive exclusive offers on products you love!</p>
              <div className='flex rounded-sm overflow-hidden w-full max-w-lg'>
                <input className='p-2 px-6 w-full' type='text' placeholder='Email Address'/>
                <button className='bg-orange-500 p-2 px-6 font-bold text-xs'>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
