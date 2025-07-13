import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_WEB } from '../../../constants';
import './MyOrders.scss';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${URL_WEB}/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data.data || []);
            } catch (error) {
                console.log('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <div className="order-header">
                                <h3>Order #{order.id}</h3>
                                <span className={`status ${order.status}`}>{order.status}</span>
                            </div>
                            <div className="order-details">
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> ${order.total}</p>
                                <p><strong>Items:</strong> {order.items?.length || 0}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders; 