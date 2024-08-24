import Home from './components/Home.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';


function App() {

  // const navigate = useNavigate()

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
