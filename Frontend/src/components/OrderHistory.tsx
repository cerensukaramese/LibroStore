import  { useState, useEffect } from 'react'
import axios from 'axios'

interface Order {
  _id: string;
  date: string;
  total: number;
  status: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/get-order-history", {
          headers,
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className='px-12 min-h-screen bg-purple-400 py-8'>
      <div className='bg-purple-700 p-8 rounded'>
        <h2 className='text-3xl text-pink-200'>Sipariş Geçmişi</h2>
        <div className='mt-8 flex flex-col gap-4'>
          {orders.map((order) => (
            <div key={order._id} className='bg-purple-600 p-4 rounded'>
              <div className='text-pink-100'>
                <p>Sipariş No: {order._id}</p>
                {/* <p>Tarih: {new Date(order.date).toLocaleDateString()}</p> */}
                {/* <p>Tutar: ₺{order.total}</p> */}
                <p>Durum: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory