import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Home=({setpincode})=>{
    const navigate=useNavigate();
    const [code,setcode] =useState("");
    const number=(e)=>{
setcode(e.target.value);
    }
    const postalcode=(e)=>{
e.preventDefault();
console.log(code);
if(code.length<=5){
    alert("pincode must be 6 numbers")
}
else{setpincode(code);
    setcode("");
    navigate("/Output");}
    }
    return(<div>
       
        <form onSubmit={postalcode}>
        <h1>Enter Pincode</h1>
<input  placeholder="Pincode" onChange={number} value={code} className="textfield" type="number"/>
<button type="submit">Lookup</button>
</form>


    </div>)
}
export default Home