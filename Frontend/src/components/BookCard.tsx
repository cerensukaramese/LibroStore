import { Link } from "react-router-dom";
import { Book } from "./RecentlyAdded";
import axios from "axios";

interface BookCardProps {
  data: Book;
  favourite?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.delete(
      "/api/v1/remove-favourite",
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <>
      <div className="bg-purple-700 rounded p-4 flex flex-col">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="bg-purple-500 rounded flex items-center justify-center">
            <img src={data.url} alt={data.title} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-pink-100 font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-pink-100 font-semibold">{data.author}</p>
          <p className="mt-2 text-pink-50 font-semibold text-xl">
            ₺ {data.price}
          </p>
        </Link>
        {favourite && (
          <button
            className="bg-purple-400 text-base px-4 py-2 border border-pink-100 text-pink-50 rounded "
            onClick={handleRemoveBook}
          >
            Favorilerden Kaldır
          </button>
        )}
      </div>
    </>
  );
};

export default BookCard;
