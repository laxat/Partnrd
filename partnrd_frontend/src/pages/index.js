import React, {useEffect} from 'react';
import PrivateSection from './PrivateSection'; 
import PublicPages from './PublicPages';
import { useLocation } from "react-router-dom";

function Pages()
{
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    
    let isAuthenticated = false; 
    const token = sessionStorage.getItem("xrsf");
    if (token) {
      isAuthenticated = true;
  }
  
  

    return isAuthenticated ? <PrivateSection /> : <PublicPages />; 
}


export default Pages; 