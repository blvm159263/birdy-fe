import React from "react"

function AdminUserManage() {
  return (
    <div className="py-10 h-screen bg-gray-300">
      <h1 className="text-2xl   mb-7 font-bold text-center">User Management</h1>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                UserID
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                001
              </th>
              <td class="px-6 py-4">Son</td>
              <td class="px-6 py-4">Customer</td>
              <td class="px-6 py-4">Active</td>
              <td className="">
                <button className="">Edit</button>
                <button className="ml-5">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUserManage
