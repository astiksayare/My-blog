
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";

import authService from "./appwrite/auth";
const App = () => {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect to check weather user has login or not.
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {

        if (userData){

          // disptach login
          dispatch(login({userData}))
        }else {

          //dispatch logout
          dispatch(logout())
        }

      })

      .catch((error) => {
        console.log("There is an error in the App.jsx file: "+error);
      })

      .finally(() => setLoading(false))

  }, [])

  return !loading ?
  // First Condition.
  (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )

  :
  // Else Second Condition.
  null
}

export default App;