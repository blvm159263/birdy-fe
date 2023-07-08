import React from "react"
import productApi from "../../api/productApi"
import ReviewItem from "./ReviewItem"
import { useState, useEffect } from "react"
import { Pagination } from "antd"

function Review({ product }) {
  const [reviews, setReviews] = useState([])
  const [pageReview, setPageReview] = useState(1)
  const [totalReview, setTotalReview] = useState(0)

  useEffect(() => {
    if (product.id) {
      console.log(pageReview)
      productApi
        .getProductReview(product.id, { page: pageReview - 1 })
        .then((response) => {
          setReviews(response.data[0])
          setTotalReview(response.data[1])
        })
        .catch((error) => console.log(error))
    }
  }, [pageReview, product.id])

  const getOtherPage = (current) => {
    setPageReview(current)
    console.log(pageReview)
  }

  return (
    <div className="bg-white col-span-12 lg:col-span-4 p-4 lg:p-8 rounded-md shadow">
      <h1 className="text-2xl font-bold text-left mb-5">Reviews</h1>
      <div id="reviews" style={{ height: "70%" }}>
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
      <div className=" justify-center items-center pt-10">
        <Pagination
          simple
          current={pageReview}
          total={totalReview}
          pageSize={3}
          onChange={getOtherPage}
        />
      </div>
    </div>
  )
}

export default Review
