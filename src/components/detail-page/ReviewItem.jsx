import React from "react"
import { Rate } from 'antd';
import { useState } from "react";


function ReviewItem({ review }) {

    return (
        <>
            <div id="review-1" className="my-5">
                <div className="flex">
                    <div className="h-10 w-10 mr-3">
                        <img style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectfFit:  'cover',
                        }} 
                        src={review.avatarUrl} alt="" />
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