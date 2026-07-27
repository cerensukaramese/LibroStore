import { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ bookId }: { bookId: string }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(`/api/v1/review/${bookId}`);
            setReviews(response.data.data);
        };
        fetchReviews();
    }, [bookId]);

    const submitReview = async () => {
        await axios.post('/api/v1/review', { ...newReview, bookId }, { headers });
        setNewReview({ rating: 0, comment: '' });
    };

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map((review) => (
                <div key={review._id}>
                    <p>Rating: {review.rating}</p>
                    <p>Comment: {review.comment}</p>
                </div>
            ))}
            <div>
                <input
                    type="number"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                    placeholder="Rating (1-5)"
                />
                <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Write a comment"
                />
                <button onClick={submitReview}>Submit Review</button>
            </div>
        </div>
    );
};

export default Review;
