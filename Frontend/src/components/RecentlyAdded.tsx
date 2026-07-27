import axios from "axios";
import { useEffect, useState } from "react"
import BookCard from "./BookCard";
import Loader from "./Loader";

export interface Book {
    _id: string;
    url: string;
    title: string;
    author: string;
    price: number;
    desc: string;
    language: string;
    createdAt: string;
    updatedAt: string;
}

const RecentlyAdded = () => {
    const [Data, setData] = useState<Book[]>([]);
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get<{ status: string; data: Book[] }>(
              "/api/v1/get-recent-books"
            );
            setData(response.data.data);
          } catch (error) {
            console.error("Error fetching recent books:", error);
          }
        };
        fetchBooks();
      }, []);
  return (
    <div className="mt-8 px-4 ">
        <h4 className="text-3xl text-pink-100">Son Eklenen Kitaplar</h4>
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

export default RecentlyAdded