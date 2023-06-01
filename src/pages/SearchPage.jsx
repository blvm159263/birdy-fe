import { faChevronLeft, faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import ProductCardList from '../components/product/ProductCardList'
import StoreCard from '../components/store/StoreCard'

export default function SearchPage() {

  return (
    <div id='searchPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      <section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>cage</span>”</p>
          <Link to="/search" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></Link>
        </div>
        <StoreCard/>
      </section>
      <section className='container mx-auto mt-6'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Search result for “<span className='text-orange-500'>cage</span>”</p>
          <Link to="/search" className='text-orange-500 text-lg font-semibold'><FontAwesomeIcon className='mr-2' icon={faFilter} />Filter</Link>
        </div>
        <div className='sortByMenu flex justify-between items-center bg-gradient-to-r from-sky-500 to-blue-500 p-4 rounded-sm mb-6 text-xs md:text-base'>
          <div className='flex items-center flex-wrap gap-2'>
            <p>Sort by</p>
            <button className='bg-orange-500 py-1 px-4 rounded-sm text-white'>Relevent</button>
            <button className='bg-white py-1 px-4 rounded-sm'>Newest</button>
            <select className='bg-white py-1 px-4 rounded-sm focus:outline-0'>
              <option selected>Price</option>
              <option>Price: highest first</option>
              <option>Price: lowest first</option>
            </select>
          </div>
          <div className='flex items-center'>
            <p className='font-semibold'>1/8</p>
            <div className='ml-4'>
              <button className='bg-white w-6 h-6 md:w-8 md:h-8 border border-neutral-300 rounded-sm text-neutral-300'><FontAwesomeIcon icon={faChevronLeft} size='xs'/></button>
              <button className='bg-white w-6 h-6 md:w-8 md:h-8 border border-neutral-300 rounded-sm'><FontAwesomeIcon icon={faChevronRight} size='xs'/></button>
            </div>
          </div>
        </div>
        <ProductCardList/>
        <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
          <FontAwesomeIcon icon={faChevronLeft}/>
          <Link className='block px-2 bg-orange-500 rounded-sm text-white'>1</Link>
          <Link className='block px-2 rounded-sm '>2</Link>
          <Link className='block px-2 rounded-sm '>3</Link>
          <Link className='block px-2 rounded-sm '>4</Link>
          <Link className='block px-2 rounded-sm '>5</Link>
          <Link className='block px-2 rounded-sm '>6</Link>
          <Link className='block px-2 rounded-sm '>7</Link>
          <Link className='block px-2 rounded-sm '>8</Link>
          <FontAwesomeIcon icon={faChevronRight}/>
        </div>
      </section>
    </div>
  )
}
