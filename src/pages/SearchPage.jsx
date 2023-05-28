import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import StoreCardList from '../components/store/StoreCardList'

export default function SearchPage() {
  return (
    <div id='searchPage' className='bg-neutral-100'>
      <div className='flex justify-center py-6'>
        <Link to="/search" className='text-xl font-bold uppercase active text-sky-500'>All</Link>
        <span className='text-neutral-400 text-xl font-bold mx-8'>/</span>
        <Link to="/search" className='text-xl font-bold uppercase'>Bird</Link>
        <span className='text-neutral-400 text-xl font-bold mx-8'>/</span>
        <Link to="/search" className='text-xl font-bold uppercase'>Accessories</Link>
        <span className='text-neutral-400 text-xl font-bold mx-8'>/</span>
        <Link to="/search" className='text-xl font-bold uppercase'>Decor</Link>
      </div>
      <section className='container mx-auto'>
        <div className='flex justify-between'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>cage</span>”</p>
          <Link to="/search" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></Link>
        </div>
        <StoreCardList/>
      </section>
    </div>
  )
}
