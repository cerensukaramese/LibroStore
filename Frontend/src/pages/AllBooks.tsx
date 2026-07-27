import { useEffect, useState } from "react";
import BookCard from "../components/BookCard"
import Loader from "../components/Loader"
import { Book } from "../components/RecentlyAdded";
import axios from "axios";


const AllBooks = () => {
  const [Data, setData] = useState<Book[]>([]);
  useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get<{ status: string; data: Book[] }>(
            "/api/v1/get-all-books"
          );
          setData(response.data.data);
        } catch (error) {
          console.error("E", error);
        }
      };
      fetchBooks();
    }, []);
  return (
    <div className="bg-purple-400 h-auto px-12 py-8">
      <h4 className="text-3xl text-pink-50 px-4 py-4 font-semibold" >Tüm Kitaplar:</h4>
        {!Data && ( <div className="flex items-center justify-center my-8">
          <Loader />{" "}
        </div>  )}  
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data.map((item) => (
        <div key={item._id}>
            <BookCard data= {item} />{" "}
            
          </div>
        ))}        
        </div>  
    </div>
    
  )
}

export default AllBooks