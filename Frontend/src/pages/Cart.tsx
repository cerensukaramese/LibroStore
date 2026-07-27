import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface CartItem {
  _id: string;
  title: string;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/v1/get-user-cart", {
          headers,
        });
        setCartItems(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (bookId: string) => {
    try {
      await axios.delete(`/api/v1/remove-from-cart/${bookId}`, {
        headers,
      });
      setCartItems(cartItems.filter((item) => item._id !== bookId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price , 0);
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post("/api/v1/place-order",{order: cartItems},{headers})
      alert(response.data.message)
      navigate("/profile/orderhistory")
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className='px-12 min-h-screen bg-purple-400 py-8'>
      <div className='bg-purple-700 p-8 rounded'>
        <h2 className='text-3xl text-pink-200'>Sepetim</h2>
        <div className='mt-8 flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div key={item._id} className='bg-purple-600 p-4 rounded flex justify-between items-center'>
              <div className='text-pink-100'>
                <p className='text-lg'>{item.title}</p>
                <p>Fiyat: ₺{item.price}</p>
              </div>
              <div>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          {cartItems.length > 0 && (
            <div className='text-right text-pink-100 text-xl font-bold'>
              Toplam: ₺{calculateTotal()}
              <button className='bg-purple-600 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-purple-300'
              onClick={placeOrder}>
                Sipariş Ver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
