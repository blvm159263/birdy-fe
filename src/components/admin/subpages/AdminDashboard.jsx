import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentAdminSubPage} from "../../../features/ui/uiSlice";
import AdminSubPageType from "../../../constants/AdminSubPageType";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentAdminSubPage(AdminSubPageType.DASHBOARD));
  })

  return (
    <div id='admin-dashboard'>
      dashboard
    </div>
  )
}