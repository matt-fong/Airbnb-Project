import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import './EditReview.css'

const EditReview = ({ onX, reviewId }) => {
  const reviews = useSelector(state => state.reviews);
  // const { reviewId } = useParams();
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory()

  const [review, setreview] = useState(reviews[reviewId]?.review);
  const [stars, setStars] = useState(reviews[reviewId]?.stars);
  const [errors, setErrors] = useState([]);


  // might not need this
  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const data = {};
    if (review) data.review = review;
    if (stars) data.stars = stars;

    let errors = [];

    if (review.length > 255 || review.length < 10) {
      errors.push( "Review must be between 10 to 255 Characters!" );
    }

    setErrors(errors)

    if(review.length <= 255 && review.length >= 10) {
      dispatch(editReview(data, reviewId)).then(() => dispatch(getReviewsByCurrentUser()))
      // history.push(`/spots/${spotId}/${spot?.Spot.ownerId}`)
      onX()
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="createReviewErrorContainer">
          <div className="createReviewError">
            {(errors).map((error, i) => (
              <div className="errorMessageContainer" key={i}>
                <i class="fa-solid fa-exclamation exclamation-point"></i>
                <div className="errorMessage">{error}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="createReviewInputContainer">
          <div className="createReviewInput">
            <input className="createReviewInputText"
              type="text"
              placeholder="Review Message"
              value={review}
              onChange={(e) => setreview(e.target.value)}
              required
            />
          </div>
          <div className="createReviewInput">
            <input className="createReviewInputText"
              placeholder="Stars"
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div>
          <button className="createReviewSubmit" type="submit">Edit Review</button>
          {/* <button className="createReviewSubmit" onClick={() => { onX() }}>Go Back</button> */}
        </div>
      </form>
    </>
  );
}

export default EditReview;
