import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrder.css";

export default function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
           axios.defaults.withCredentials = true;
           const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
       
           const response = await axios.get("http://localhost:3000/api/order/get-order-history", {
             body: { id: userId } // Send user ID in headers
           });
       
           setOrderHistory(response.data.data);
           console.log('res',response.data.data);
         } catch (error) {
           console.log("Error fetching order history:", error);
         } finally {
           setLoading(false);
         }
       };
       

    fetchData();
  }, []);

  return (
    <>
      {loading && <p className="loading-text">Loading...</p>}

      {!loading && orderHistory?.length === 0 && (
        <div className="order-container">
          <div className="order-content">
            <h1 className="no-history-text">No Order History</h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961219.png"
              alt="No Orders"
              className="no-history-image"
            />
          </div>
        </div>
      )}

         {!loading && orderHistory?.length > 0 && (
            <div className="history-container">
               <h1 className="history-title">Your Order History</h1>
               <ul className="order-list">
                  {orderHistory.map((order, index) => (
                     <li key={index} className="order-item">
                        <p className='order-det'>
                           Order Details: <br />
                           <span className='det'>
                              {order.books.map((item) => item.title).join(' - ')}

                           </span>                        </p>
                        <p className='order-det'>
                           Total: <br />
                           <span className='det'>
                              ${order.totalPrice}

                           </span>
                        </p>
                        <hr />
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </>
   );
}
