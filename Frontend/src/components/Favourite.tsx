import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { Book } from "./RecentlyAdded"; 

const Favourite = () => {
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]); 

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "/api/v1/get-favourites",
          { headers }
        );
        setFavouriteBooks(response.data.favourites); 
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetchFavourites();
  }, []);

  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {favouriteBooks.length > 0 ? (
        favouriteBooks.map((book) => (
          <BookCard key={book._id} data={book} favourite= {true} /> 
        ))
      ) : (
        <p className="text-center text-xl font-semibold">
          Henüz Favorilerinde Kitap Yok :(
        </p>
      )}
    </div>
  );
};

export default Favourite;
