import { Outlet } from "react-router"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"


function App() {

  return (
    < >
    <Navbar />
    <div className="min-h-[calc(100vh-70px)]">
      <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default App
