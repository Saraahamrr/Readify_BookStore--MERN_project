import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "https://readify-production.up.railway.app/api/order/get-all-orders"
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`https://readify-production.up.railway.app/api/order/update-status/${orderId}`, {
        status: newStatus,
      });

      // Update UI instantly
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 vh-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="p-5 d-flex flex-column align-items-center">
        <h1 className="mb-4">All Orders</h1>

        <table className="m-3 table table-striped table-hover table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">User</th>
              <th scope="col">Books</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.username || "Unknown User"}</td>
                  <td>
                    {order.books.map((book) => (
                      <div key={book._id}>{book.title}</div>
                    ))}
                  </td>
                  <td>${order.totalPrice ? order.totalPrice.toFixed(2) : "N/A"}</td>

                  <td className="text-center">
                    <select
                      className="form-select text-center"
                      style={{ textAlignLast: "center", textAlign: "center" }}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="order placed">Order Placed</option>
                      <option value="completed">Completed</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
