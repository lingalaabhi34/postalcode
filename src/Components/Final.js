import axios from "axios";
import React, { useEffect, useState } from "react";
// Import statements...

const Final = ({ pincode }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(null);

    // Function to fetch data based on pincode
    const fetchData = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const postData = response.data[0].PostOffice;
            setData(postData);
            setError(null);
        } catch (error) {
            setError("Error fetching data. Please try again later.");
            setData([]);
        }
    };

    // Fetch data when pincode changes
    useEffect(() => {
        if (pincode && pincode.length === 6) {
            fetchData(pincode);
        } else if (pincode) {
            setError("Pincode must be 6 digits.");
            setData([]);
        }
    }, [pincode]);

    const filterData = () => {
        return data.filter(item => item.Name.toLowerCase().includes(filter.toLowerCase()));
    };

    return (
        <div>
            <h1>Pincode: {pincode}</h1>
            {error && <p>{error}</p>}
            <h2>Message: {data ? data.length : 0} Pincodes found</h2>
            <input placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <div className="card">
            {data && data.length > 0 ? (
              
                filterData().map((item, index) => (
                    <div key={item.Name} className="cardsize"> 
                    <p>Name: {item.Name}</p>
                    <p>Branch Type: {item.BranchType}</p>
                    <p>Delivery Status: {item.DeliveryStatus}</p>
                    <p>District: {item.District}</p>
                    <p>State: {item.State} </p>
                    </div>
                   
                ))
            ) : (
                <p>No data available</p>
            )}</div>
        </div>
    );
};

export default Final;
