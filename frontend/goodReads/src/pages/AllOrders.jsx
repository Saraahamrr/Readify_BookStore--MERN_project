import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
// import "./AllOrders.css"; 

export default function AllOrders() {
    const [allOrders, setAllOrders] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:3000/api/order/get-all-orders");
                setAllOrders(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container-fluid py-4">
            {!allOrders ? (
                <div className="d-flex align-items-center justify-content-center w-100 vh-100">
                    <Loader />
                </div>
            ) : (
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
                                        <td>{order.user?.name || "Unknown User"}</td>
                                        <td>
                                            {order.books.map((book) => (
                                                <div key={book._id}>{book.title}</div>
                                            ))}
                                        </td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}