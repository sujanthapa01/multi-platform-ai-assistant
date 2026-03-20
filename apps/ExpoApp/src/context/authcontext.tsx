import { createContext,useContext,useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider=({children})=>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userpost, setUserPost] = useState(null);


  
}