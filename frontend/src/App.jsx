import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Signup } from "./pages/SignUp.jsx";
import { SendMoney } from "./pages/sendMoney.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Signin } from "./pages/Signin.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin></Signin>}> </Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/send" element={<SendMoney></SendMoney>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App


