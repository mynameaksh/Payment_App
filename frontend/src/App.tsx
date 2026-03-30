import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/signin" element={<Signin />} />
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/transfer" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
