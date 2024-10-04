import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users } from "../components/User";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [name,setName] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance", err);
      }
    };

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
      } catch(e){
        console.log('error fetchhing details',e)
      }
    }

    fetchBalance();
    fetchDetails();
  }, []);

  return (
    <div>
      <Appbar page="History" onClick={() => navigate("/history")} />
      <div className="m-8 text-3xl font-bold">{name}</div>
      <div className="m-8">
        <div className="text-2xl font-bold">Balance: {balance !== null ? `₹${balance.toFixed(2)}` : "Loading..."}</div>
        <Users />
      </div>
    </div>
  );
};

