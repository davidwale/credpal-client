import { useEffect, useState } from "react";
import { GetUserService } from "../services/dashboard.services"
import Sidebar from "./sidebar"
import { Search, Power } from "lucide-react"
import { Logout } from "../services/auth.services";

const DashboardLayout = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => { 
    const getUser = async () => { 
      try {
        const user = await GetUserService();
        setEmail(user.data.email);
        setName(user.data.fullName);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }

    getUser();
  }
  , []);


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={Logout} className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Power className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">{email}</span>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                 {name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
