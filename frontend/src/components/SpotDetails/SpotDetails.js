import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import './SpotDetails.css'
import { getAllSpots } from "../../store/spots";
import ReviewCard from "../ReviewCard/ReviewCard";
import { getAllUsers } from "../../store/users";
import CreateBooking from "../CreateBooking/CreateBooking";
import EditSpotModal from "../EditSpot/EditSpotModal";
import { deleteSpot } from "../../store/spots";
import CreateReviewModal from "../CreateReview/CreateReviewModal";
import CreateImageModal from "../CreateImage/CreateImageModal";
import ViewImagesModal from "../ViewImages/ViewImagesModal";
import MapContainer from "../Maps";
import userimage from './userimage.png'

const SpotDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const todayDate = (new Date()).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { spotId } = useParams();
  const { ownerId } = useParams()

  const users = useSelector(state => (state.users));
  const spots = useSelector((state) => (state.spots));

  const spot = spots[spotId]
  const spotOwner = users[ownerId]

  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));

  const bookings = useSelector((state) => Object.values(state.bookings));

  const userBookings = bookings?.filter((booking) => booking?.userId === sessionUser?.id)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
    dispatch(getReviewsBySpotId(spotId)).then(() => setIsLoadedd(true))
    dispatch(getAllUsers())
  }, [ dispatch, spotId ]);

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
    history.push('/my-spots')
  };

  if (!isLoaded) return null
  if (!isLoadedd) return null

  let createReview;

  if (sessionUser && !(spot?.ownerId === sessionUser.id) && userBookings?.length > 0) {
    createReview = (
      <div className='spotDetailCreateReview'>
        {<CreateReviewModal />}
      </div>
    );
  }

  let spotDetailHeaderInfo;

  if (sessionUser && spot?.ownerId === sessionUser.id) {
    spotDetailHeaderInfo = (
      <div className='spotDetailContainer'>
        <div className="spotDetailInfo">
          <i className="fa-solid fa-star"></i>
          {spot?.avgRating} {` · `} {reviews.length} {`reviews`}
          <div className="spotDetailNumReview"></div>
          {` · `}
          <div className="spotDetailLocation">{spot?.city}, {spot?.state}, {spot?.country}</div>
        </div>
        <div className="testing"><CreateImageModal /></div>
        <div className="spotDetailEditReview"><EditSpotModal /></div>
        <button className="spotDetailDeleteButton" onClick={() => handleDelete(spot?.id)}>Delete</button>
      </div>
    )
  } else {
    spotDetailHeaderInfo = (
      <div className='spotDetailContainer'>
        <div className="spotDetailInfoPartTwo">
          <i className="fa-solid fa-star"></i>
          {spot?.avgRating} {` · `} {reviews.length} {`reviews`}
          <div className="spotDetailNumReview"></div>
          {` · `}
          <div className="spotDetailLocation">{spot?.city}, {spot?.state}, {spot?.country}</div>
        </div>
      </div>
    )
  }

  let currentBooking;

  if (sessionUser) {
    currentBooking = (
      <div className="spotDetailCheckBookings">
        <NavLink to={`/current-bookings/${spotId}`}>Check current bookings</NavLink>
      </div>
    )
  }

  let dateDiffInt;

  if (isNaN((new Date(endDate) - new Date(startDate)) / 86400000) || ((new Date(endDate) - new Date(startDate)) / 86400000) < 0) {
    dateDiffInt = 0;
  } else {
    dateDiffInt = (new Date(endDate) - new Date(startDate)) / 86400000
  }

  const image1 = (spot?.Images?.[1]?.url) || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  const image2 = (spot?.Images?.[2]?.url) || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  const image3 = (spot?.Images?.[3]?.url) || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  const image4 = (spot?.Images?.[4]?.url) || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'

  let spotPicture;
  if (spot?.Images?.length >= 5) {
    spotPicture = (
      <div className='spotDetailPictureContainer'>

          <div className="spotDetailPictureLeft">
            <img className='spotDetailMainImage' onClick={() => setShowModal(true)} src={spot?.Images?.[0]?.url} alt='Spot Detail'/>
          </div>

          <div className="spotDetailPictureRight">

            <div className='spotDetailPictureColumnOne'>

              <div className='spotDetailPictureOne-container'>
                <img className='spotDetailPictureOne' onClick={() => setShowModal(true)} src={image1} alt='firstpic'/>
              </div>

              <div className='spotDetailPictureTwo-container'>
                <img className='spotDetailPictureTwo' onClick={() => setShowModal(true)} src={image2} alt='secondpic'/>
              </div>

            </div>

            <div className='spotDetailPictureColumnTwo'>

              <div className='spotDetailPictureThree-container'>
                <img className='spotDetailPictureThree' onClick={() => setShowModal(true)} src={image3} alt='thirdpic'/>
              </div>

              <div className='spotDetailPictureFour-container'>
                <img className='spotDetailPictureFour' onClick={() => setShowModal(true)} src={image4} alt='fourthpic'/>

              </div>


              <div><ViewImagesModal spot={spot} showModal={showModal} setShowModal={setShowModal}/></div>
              <div className="spotDetailPhotos" onClick={() => setShowModal(true)}>
                <i className="spotDetailListIcon fa-solid fa-list"></i>
                <div>Show all photos</div>
              </div>

            </div>

          </div>

        </div>
    )
  } else {
    spotPicture = (
      <div className='spotDetailOnePicture'>

        <div className="spotDetailOneImage-container">
          <img className='spotDetailOneImage' onClick={() => setShowModal(true)} src={spot?.Images?.[0]?.url} alt='mainpic'/>

        </div>

        <div><ViewImagesModal spot={spot} showModal={showModal} setShowModal={setShowModal}/></div>

        <div className="spotDetailPhotosTwo" onClick={() => setShowModal(true)}>
          <i className="spotDetailListIcon fa-solid fa-list"></i>
          <div>Show all photos</div>
        </div>
      </div>
    )
  }

  return isLoaded && (
    <div className='spotDetailContainer'>
      <div className="spotDetailInnerContainer">


        <div className='spotDetailHeaderContainer'>
          <div className='spotDetailName'>{spot?.name}</div>
          {spotDetailHeaderInfo}
        </div>

        {spotPicture}


        <div className='spotDetailBodyContainer'>
          <div className='spotDetailListing'>

            <div className='spotDetailHostContainer'>

              <div className="spotDetailHostLeft">
                <div className="spotDetailHostedBy">Entire home hosted by {spotOwner?.firstName}{' '}{spotOwner?.lastName}</div>
                <div className="spotDetailSpecs">
                  <div className="spotDetailSpecsGuest">2 guests</div>
                  <div className="spotDetailSpecsBedroom">{` · `}1 bedroom</div>
                  <div className="spotDetailSpecsBed">{` · `}1 bed</div>
                  <div className="spotDetailSpecsBath">{` · `}1 bath</div>
                </div>
              </div>

              <div className="spotDetailHostRight">
                <img className='spotDetailOwnerIcon' src={userimage} alt='Owner Icon'></img>
              </div>

            </div>

            <div className='spotDetailHighlightContainer'>

              <div className="spotDetailHighlightOne">
                <i className="fa-solid fa-door-open fa-xl spot-detail-icons"></i>
                <div className="selfCheckout">
                  <div className="spotDetailHighlightUppertext">Self check-in</div>
                  <div className="spotDetailHighlightUndertext">Check yourself in with the keypad.</div>
                </div>
              </div>

              <div className="spotDetailHighlightTwo">
                <i className="fa-solid fa-medal fa-xl spot-detail-icons"></i>
                <div>
                  <div className="spotDetailHighlightUppertext">{`${spotOwner?.firstName} is a Superhost`}</div>
                  <div className="spotDetailHighlightUndertext">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                </div>
              </div>

              <div className="spotDetailHighlightThree">
                <i className="fa-solid fa-calendar fa-xl spot-detail-icons"></i>
                <div>
                  <div className="spotDetailHighlightUppertext">Free cancellation for 48 hours.</div>
                  {/* <div className="spotDetailHighlightUndertext">undertext</div> */}
                </div>
              </div>

            </div>

            <div className="spotDetailDescription">{spot?.description}</div>
          </div>


          <div className="spotDetailBodyRight">

            <div className='spotDetailPriceContainer'>

              <div className="spotDetailBoxOne">
                <div className="spotDetailPrice">
                  <div className='spotPriceAmount'>{`$${spot?.price}`}</div>
                  <div className='spotNight'>night</div>
                </div>
                <div className="spotDetailReview">
                  <i className="fa-solid fa-star"></i>
                  {spot?.avgRating} {` · `} {reviews.length} {`reviews`}
                </div>
              </div>

              <div className="spotDetailBoxTwo">
                  <CreateBooking setStartDate={setStartDate} setEndDate={setEndDate} todayDate={todayDate} startDate={startDate} endDate={endDate}/>
              </div>

              <div className="spotDetailBoxThree">
                You won't be charged yet
              </div>

              <div className="spotDetailBoxFour">
                <div className="spotDetailFeeOne">
                  <div className="spotDetailFeeDescription">{`$100 x ${dateDiffInt} nights`}</div>
                  <div className="spotDetailFeeNumber">${dateDiffInt * spot?.price}</div>
                </div>

                <div className="spotDetailFeeTwo">
                  <div className="spotDetailFeeDescription">Cleaning fee</div>
                  <div className="spotDetailFeeNumber">Free</div>
                </div>

                <div className="spotDetailFeeThree">
                  <div className="spotDetailFeeDescription">Service fee</div>
                  <div className="spotDetailFeeNumber">Free</div>
                </div>
              </div>

              <div className="spotDetailBoxFive">
                <div className='spotDetailTotalDescription'>Total before taxes</div>
                <div className='spotDetailTotalPrice'>${dateDiffInt * spot?.price}</div>
              </div>

            </div>

            {currentBooking}

          </div>

        </div>

        <div className="spotDetailReviewContainer">
          <div className="spotDetailReviewHeader">
            <div className="spotDetailReviewInfo">
              <i className="fa-solid fa-star"></i>
              {spot?.avgRating} {` · `} {reviews.length} {`reviews`}
            </div>
          </div>

          <div className="spotDetailReviewName">Reviews</div>

          <div>{createReview}</div>

          <div className="spotDetailReviewCardsContainer">
            <div className="spotDetailReviewCards">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

        </div>

        <div className="spotDetailMapContainer">

          <div className="spotDetailMapHeader">Where you'll be</div>
          <div className="spotDetailMapLocation">{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>

          <div className="spotDetailMap">
            <MapContainer lat={spot?.lat} lng={spot?.lng}/>
          </div>

        </div>


      </div>
    </div>
  )
}

export default SpotDetails;
