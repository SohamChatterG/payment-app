import { useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./UserContext";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const { name, setName } = useContext(MyContext);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                // Retrieve first and last name from MyContext
                const [firstName, lastName] = name.split(" "); // Assuming name is in "First Last" format
                
                // Filter out the user whose name matches the context name
                const filteredUsers = response.data.user.filter(user => 
                    !(user.firstName.toLowerCase() === firstName.toLowerCase() && user.lastName.toLowerCase() === lastName.toLowerCase())
                );

                setUsers(filteredUsers);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }, [filter, name]); // Add name to dependencies to re-fetch if it changes

    const getCurrentUserId = () => {
        return localStorage.getItem("userId");
    };

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input 
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.length === 0 ? (
                    <div>No users found.</div>
                ) : (
                    users.map(user => <User key={user._id} user={user} />)
                )}
            </div>

        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName[0].toUpperCase()}{user.firstName.slice(1).toLowerCase()} {user.lastName[0].toUpperCase()}{user.lastName.slice(1).toLowerCase()}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button 
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }} 
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}
