import React from "react"
import { Rate } from 'antd';
import { useState } from "react";


function ReviewItem({ review }) {

console.log(review);
    return (
        <>
            <div id="review-1" className="my-5">
                <div className="flex">
                    <div className="h-10 w-10 mr-3">
                        <img src="/assets/images/shop_avar.png" alt="" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1>{review.fullName}</h1>
                        <div className="flex">
                            <Rate disabled value={review.rating} />
                        </div>
                    </div>
                </div>
                <p>
                    {review.comment}
                </p>
            </div>
        </>

    )



}

export default ReviewItem;