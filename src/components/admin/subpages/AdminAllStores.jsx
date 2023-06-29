import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentAdminSubPage} from "../../../features/ui/uiSlice";
import AdminSubPageType from "../../../constants/AdminSubPageType";

export default function AdminAllStores() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentAdminSubPage(AdminSubPageType.ALL_STORES));
  })

  return (
    <div id='admin-all-stores'>
      all stores
    </div>
  )
}