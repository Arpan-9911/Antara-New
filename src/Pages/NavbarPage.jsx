import React from 'react'
import DesktopNav from '../Components/Navbar/DesktopNav'
import MobileNav from '../Components/Navbar/MobileNav'
import { useEffect , useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { API_URL } from '../Functions/Constants'
const NavbarPage = () => {
      const navigate = useNavigate();
      const [alertMessage, setAlertMessage] = useState(null);
     const [width, setWidth] = useState(window.innerWidth);
     const [user , setUser] = useState([]);

     const breakpoint = 620;

      useEffect(() => {
       const handleWindowResize = () => setWidth(window.innerWidth)
       window.addEventListener("resize", handleWindowResize);
       return () => window.removeEventListener("resize", handleWindowResize);
     }, []);

     const authUser = async () => {
      // * Function to check if the user is verified or not 
      const token = localStorage.getItem('token');
       if(token){
      try{
        const response = await fetch(`${API_URL}/auth-user`, 
        
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            } ,
            method: 'GET'
        });
        const data = await response.json();
        if (response.status === 401) {
          navigate('/login');
        }
        setUser(data.data);
      }
      catch(error){
        console.error('Error:', error);
      }
    }}

     const showAlert = (message) => {
      setAlertMessage(message);
    };

     useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        authUser();
      const congratulationsShown = localStorage.getItem('congratulations-shown');
      if(congratulationsShown == 0 && user?.is_verified === true ){
            showAlert('🎉 Congratulations! Your account has been verified. 🎉');
            localStorage.setItem('congratulations-shown', 1);
       }
      }
     }, [navigate]);     

      useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
          // * Function to check if the user is verified or not
        }
      }, [navigate]);

  return (
     <>
     <Modal isOpen={!!alertMessage} onRequestClose={() => setAlertMessage(null)}
       className={`
       absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-skin p-8 rounded-lg flex flex-col items-center gap-2` }
      >
        <p className=''>{alertMessage}</p>
        <p>🎉 You can now participate in the events.🎉 </p>
      <Link to ={'/events'}>
      <button className='bg-brown text-white p-2 rounded-lg mt-4 w-20 '
         onClick={() => setAlertMessage(null)}>Close</button>
      </Link>
      </Modal>

     {width < breakpoint ? <MobileNav /> : <DesktopNav />}
          
     </>
  )
}

export default NavbarPage