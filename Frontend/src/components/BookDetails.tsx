import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { Book } from "./RecentlyAdded";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaRegBookmark, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { MdOutlineDelete } from "react-icons/md";

const BookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<{ userId: string, rating: number, comment: string }[]>([]);
  const [newReview, setNewReview] = useState(""); 
  const [newRating, setNewRating] = useState<number | null>(null); 
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get<{ status: string; data: Book }>(
          `/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);

  
        const reviewResponse = await axios.get<{ data: { userId: string, rating: number, comment: string }[] }>(
          `/api/v1/get-review/${id}`
        );
        setReviews(reviewResponse.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put("/api/v1/adding-favourite", {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("/api/v1/add-cart", {}, { headers });
    alert(response.data.message);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRating(Number(event.target.value));
  };

  const handleSubmitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newReview.trim() || !newRating) {
      alert("Review and rating are required.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/v1/add-review`,
        { bookId: id, rating: newRating, comment: newReview },
        { headers }
      );
      alert(response.data.message);

     
      setReviews([
        ...reviews,
        { userId: localStorage.getItem("id") || "", rating: newRating, comment: newReview },
      ]);
      setNewReview(""); 
      setNewRating(null); 
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <Loader />;
  if (!data) return <div>Book not found</div>;
  const handleWishlist = async () => {
    try {
      const response = await axios.post(
        "/api/v1/add-wish",
        { bookId: id },
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist");
    }
  };


  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-purple-400 h-[88vh] flex flex-col md:flex-row gap-8">
          <div className="lg:w-3/6 w-full">
            <div className="flex justify-around h-[80vh] w-4/6 p-12 rounded bg-purple-600">
              <img
                src={data.url}
                alt={data.title}
                className="h-[95%] lg:h[80vh] px-6 object-cover rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500"
                    onClick={handleFavourite}
                  >
                    <FaHeart /> <span className="ms-4 block lg:hidden">Favoriler</span>
                  </button>
                  <button
                    className="bg-purple-800 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart /> <span className="ms-4 block lg:hidden">Sepete Ekle</span>
                  </button>
                  <button
                    className="bg-pink-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center justify-center"
                    onClick={handleWishlist}
                  >
                    <FaRegBookmark /> <span className="ms-4 block lg:hidden">İstek Listesi</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 ">
                  <button className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500">
                    <FaEdit /> <span className="ms-4 block lg:hidden">Düzenle</span>
                  </button>
                  <button className="bg-white rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-pink-300 flex items-center justify-center">
                    <MdOutlineDelete />
                    <span className="ms-4 block lg:hidden">Kitabı Sil</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="justify-center items-center p-10 w-3/6">
            <h1 className="text-4xl text-pink-100 font-semibold">{data.title}</h1>
            <p className="text-pink-100 mt-1">{data.author}</p>
            <p className="mt-4 text-pink-100 text-4xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-pink-100 ">
              <GrLanguage className="me-3 text-pink-100 text-3xl font-semibold" /> {data.language}
            </p>
            <p className="mt-4 text-pink-50 font-semibold text-3xl">₺ {data.price}</p>

            <div className="mt-6 text-pink-100">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              {reviews.length === 0 ? (
                <p>Henüz inceleme yok:( </p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="mt-4">
                    <p><strong>Rating:</strong> {review.rating}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                  </div>
                ))
              )}

              {isLoggedIn && (
                <form onSubmit={handleSubmitReview} className="mt-6">
                  <div>
                    <label className="block text-pink-100">Rating (1-5):</label>
                    <input
                      type="number"
                      value={newRating || ""}
                      onChange={handleRatingChange}
                      min="1"
                      max="5"
                      className="p-2 mt-2 w-full rounded bg-purple-600 text-white"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-pink-100">Review:</label>
                    <input
                      type="text"
                      value={newReview}
                      onChange={handleReviewChange}
                      className="p-2 mt-2 w-full rounded bg-purple-600 text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-purple-800 text-white p-3 rounded-full"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-purple-400 flex justify-center items-center">
          <Loader />
        </div>
      )}
       {!data && (
        <div className="h-screen bg-purple-400 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default BookDetails;
