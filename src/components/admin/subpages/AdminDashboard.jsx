import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentAdminSubPage} from "../../../features/ui/uiSlice";
import AdminSubPageType from "../../../constants/AdminSubPageType";
import SalesChart from "../dashboard/SalesChart";
import AdminIncomeSection from "../dashboard/AdminIncomeSection";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentAdminSubPage(AdminSubPageType.DASHBOARD));
  })

  return (
    <div id='admin-dashboard' className='p-2'>
      <div className='rounded shadow bg-white p-4'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <SalesChart/>
        <AdminIncomeSection/>
      </div>
    </div>
  )
}