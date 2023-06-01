import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

// Components
import Layout from "./layouts/Layout"
import HomePage from "./pages/HomePage"
import NoPage from "./pages/NoPage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import DetailItemPage from "./pages/DetailItemPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" >
            <Route path=":searchType/:page" element={<SearchPage />} />
          </Route>
          <Route path="/detail-item/:id" element={<DetailItemPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
