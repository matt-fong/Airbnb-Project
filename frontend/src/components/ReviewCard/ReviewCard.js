import { useDispatch, useSelector } from "react-redux";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const dispatch = useDispatch();

  const createdAt = review?.createdAt;
  const date = new Date(createdAt).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="reviewCardContainer">

      <div className="reviewCardDataTop">

        {/* <div className="reviewCardUserPic"> */}
        {/* <i className="fas fa-user-circle fa-2xl" /> */}
        <img className='reviewCardUserPic' src='https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'></img>
        {/* </div> */}

        <div className="reviewCardTopRight">
          {/* <div className="reviewCardUserPic">
            <i className="fas fa-user-circle fa-2xl" />
          </div> */}

          <div className="reviewCardNameStar">

            {/* <div className='reviewCardStar'>
              <i className="fa-solid fa-star"></i>
              <div className='reviewCardRating'>{review.stars}</div>
            </div> */}

            <div className="reviewCardName">{review?.User?.firstName}</div>

          </div>

          <div className="reviewCardDate">{date}</div>

        </div>

      </div>


      <div className="reviewCardBottom">
        <div className='reviewCardStar'>
          <i className="fa-solid fa-star"></i>
          <div className='reviewCardRating'>{review.stars}:</div>
        </div>
        <div className="reviewCardReview">{review?.review}</div>
      </div>

    </div>
  );
}

export default ReviewCard;
