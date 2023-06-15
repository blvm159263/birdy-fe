import StoreCardList from "../components/store/StoreCardList";
import React, {useEffect, useState} from "react";
import shopApi from "../api/shopApi";
import {useSelector} from "react-redux";

export default function AllShopsPage() {
  const searchText = useSelector(state => state.search.searchText);
  const [oldSearchText, setOldSearchText] = useState(undefined);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    let isStillInPage = true;
    setOldSearchText(searchText);

    // Call search shop api
    shopApi.searchShopByName({name: searchText}).then((response) => {
      if(isStillInPage) {
        setShops(response.data);
        console.log(response.data);
      } else {
        console.log('Leave page, cancel load shop data');
      }
    }).catch((error) => console.log(error));

    return () => {
      isStillInPage = false;
    };
  }, [])

  return (
    <div id='AllShopsPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      {/* Search shop results */}
      {shops.length > 0 ? (<section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>All shop related to “<span className='text-orange-500'>{oldSearchText}</span>”</p>
        </div>
        <StoreCardList shops={shops}/>
      </section>) : ''}
    </div>
  )
}