import React from "react";
import ProductReportCard from "./ProductReportCard";

export default function ProductReportList({reports}) {
  return (
    <div className='productRequestList grid grid-cols-1 xl:grid-cols-2 gap-2'>
      {reports.map((report) => (<ProductReportCard key={report.product.id} report={report}/>))}
    </div>
  )
}