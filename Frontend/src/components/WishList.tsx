import  { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  url: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/v1/get-wish', { headers });
        setWishlist(response.data.data.books || []);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId: string) => {
    try {
      await axios.post(
        '/api/v1/remove-wish', 
        { bookId }, 
        { headers }
      );
      setWishlist(wishlist.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <div className="p-6 bg-purple-400 min-h-screen">
      <h2 className="font-semibold text-2xl text-pink-100 mb-6">İstek Listen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((book) => (
          <div key={book._id} className="bg-purple-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={book.url} 
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="text-pink-100">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm">{book.author}</p>
                  <p className="text-sm">₺{book.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
        {wishlist.length === 0 && (
          <p className="text-pink-100 col-span-full text-center">
            İstek listeniz boş
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;