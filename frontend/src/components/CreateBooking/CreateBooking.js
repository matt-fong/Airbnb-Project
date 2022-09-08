import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './CreateBooking.css'
import { getAllUsers } from "../../store/users";
import { getBookingsByCurrentUser } from "../../store/bookings"
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { deleteBookingById } from "../../store/bookings";

const CreateBooking = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
  // const todayDate = (new Date()).toISOString().slice(0,10);
  // const [startDate, setStartDate] = useState(todayDate);
  // const [endDate, setEndDate] = useState(todayDate);
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => Object.values(state.bookings));

  // console.log('THIS IS BOOKINGS BY SPOT IDDDD', bookings)

  console.log('THIS IS ERRORS', errors)

  // console.log('THIS IS TODAYS DATE', todayDate)

  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0

  // const hello = bookings.find((booking) => new Date(booking.startDate).toISOString().split('T')[0] === startDate)
  // console.log('THIS IS STARTDATE', new Date(startDate))
  // console.log('THIS IS HELLO', hello)
  // console.log('THIS IS STARTDATENUM', startDateNum)
  // console.log('THIS IS ENDDATENUM', endDateNum)

  useEffect(() => {
    // dispatch(getBookingsByCurrentUser())
    dispatch(getBookingsBySpotId(spotId))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

    // setErrors([]);

    bookings.map((booking) => {
      let bookedStartDate = (new Date(booking?.startDate) - 0)
      let bookedEndDate = (new Date(booking?.endDate) - 0)

      if (startDateNum >= endDateNum) {
        setErrors({ error : 'endDate cannot be on or before startDate' })
      }

      if (startDateNum === bookedStartDate) {
        setErrors({ error : 'Must have different start date' })
      }

      if (startDateNum === bookedEndDate) {
        setErrors({ error : 'Must have different start date boyyyyy' })
      }

      if (endDateNum === bookedStartDate) {
        setErrors({ error : 'Must have different start date boyyyyy' })
      }

      if (endDateNum === bookedEndDate) {
        setErrors({ error : 'Must have different start date boyyyyy' })
      }

      if ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) {
        setErrors({ error : 'Cannot book during someone else booking' })
      }

      if ((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) {
        setErrors({ error : 'Cannot book during someone else booking' })
      }

      if ((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate)) {
        setErrors({ error : 'Cannot book during someone else booking' })
      }

      // if ((startDateNum < endDateNum) && (startDateNum !== bookedStartDate) && (startDateNum !== bookedEndDate) && (endDateNum !== bookedStartDate) && (endDateNum !== bookedEndDate) &&
      // ((startDateNum < bookedStartDate && endDateNum < bookedStartDate) || (startDateNum > bookedEndDate && endDateNum > bookedEndDate))) {
      //   dispatch(createNewBooking(spotId, data))
      //   history.push('/my-bookings')
      // }

      // if ((startDateNum < endDateNum) && (startDateNum !== bookedStartDate) && (startDateNum !== bookedEndDate) && (endDateNum !== bookedStartDate) && (endDateNum !== bookedEndDate) &&
      // !((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) && !((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) &&
      // !((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate))) {
      //   dispatch(createNewBooking(spotId, data)).then(() => history.push('/my-bookings'))
      // }

    })

    // if (errors.length === 0) {
    //   dispatch(createNewBooking(spotId, data))
    //   history.push('/my-bookings')
    // }

    dispatch(createNewBooking(spotId, data))
    // history.push('/my-bookings')
  };

  return (
    <div className="CreateBookingFormOutside">
      <div className='CreateBookingFormContainer'>
        <form className='CreateBookingform' onSubmit={handleSubmit}>
          <div className="CreateBookingErrorsContainer">
            <ul>
              {Object.values(errors).map((error, i) => (
                <li className="loginError" key={i}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="CreateBookingDiv">
            <input className="CreateBookingInputCheckin"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={todayDate}
              max={"9999-12-31"}
              />

            <input className="CreateBookingInputCheckout"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={todayDate}
              max="9999-12-31"
              />
          </div>

          <div className="CreateBookingGuest">
            <div className="CreateBookingGuestOne">Guests</div>
            <div className="CreateBookingGuestTwo">2 guests</div>
          </div>

          <div className="CreateBookingContainer">
            <input className="CreateBookingSubmit" type="Submit" defaultValue='Reserve' />
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateBooking;
