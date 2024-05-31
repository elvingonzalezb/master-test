import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import RepositoryPage from "@/pages/RepositoryPage";
import InformationPage from "@/pages/InformationPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "./store/auth";
import { ROUTE_ROOT, ROUTE_REPOSITORY, ROUTE_INFORMATION, ROUTE_LOGIN } from '@/constants/route';

const App = () => {
  // From store check auth flag
  const isAuth = useAuthStore(state => state.isAuth)
  return (
    <BrowserRouter>    
      <Routes>
        {/** Route protected */}
        <Route element={<ProtectedRoute isAllowed={isAuth}/>}>
          <Route path={ROUTE_ROOT} element={<DashboardPage/>} />     
          <Route path={ROUTE_REPOSITORY} element={<RepositoryPage/>} />
          <Route path={ROUTE_INFORMATION} element={<InformationPage/>} />
        </Route>
        {/** Route public */}
        <Route path={ROUTE_LOGIN} element={<LoginPage/>} />   
      </Routes>
    </BrowserRouter>
  )
}

export default App;