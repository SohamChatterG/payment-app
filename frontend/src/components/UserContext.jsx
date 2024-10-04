import React, { createContext, useContext, useState,useEffect } from 'react';
// Create a Context
import axios from 'axios';
export const MyContext = createContext();

export const UserProvider = ({ children }) => {

  const [name,setName] = useState('')

    const fetchDetails = async function (){
      try{
        const details = await axios.get("http://localhost:3000/api/v1/user/details",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        const firstName = details.data.firstName[0].toUpperCase() + details.data.firstName.slice(1).toLowerCase();
        const lastName  = details.data.lastName[0].toUpperCase() + details.data.lastName.slice(1).toLowerCase();
        setName(firstName + " " + lastName);
        console.log('name -> ',name)
      } catch(e){
        console.log('error fetchhing details',e)
      }
    }

    fetchDetails();
  return (
      <MyContext.Provider value={{ name, setName }}>
          {children}
      </MyContext.Provider>
  );
};
