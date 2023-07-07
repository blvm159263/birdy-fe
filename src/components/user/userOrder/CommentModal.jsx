import { useState } from "react"
import { ExclamationCircleFilled } from "@ant-design/icons"

function CommentModal({ onConfirm, onCancel }) {
  const [comment, setComment] = useState("")

  const handleConfirm = () => {
    onConfirm(comment)
    setComment("")
  }

  const handleCancel = () => {
    onCancel()
    setComment("")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Enter Comment</h2>
          <ExclamationCircleFilled className="text-red-500" />
        </div>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
