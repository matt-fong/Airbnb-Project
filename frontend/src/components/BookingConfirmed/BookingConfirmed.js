import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { getBookingsByCurrentUser } from "../../store/bookings"
import './BookingConfirmed.css'

const BookingConfirmed = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
  const { spotId } = useParams();
  const { bookingId } = useParams();
  console.log('THIS IS SPOTID', spotId)
  console.log('THIS IS BOOKINGID', bookingId)

  const spots = useSelector((state) => (state.spots));

  const spot = spots[spotId]

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => (state.bookings));
  console.log('THIS IS BOOKINGS', bookings)
  const currentBooked = bookings[bookingId]
  console.log('THIS IS CURRENT BOOKED', currentBooked)

  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0

  useEffect(() => {
    dispatch(getBookingsByCurrentUser())
    // dispatch(getBookingsBySpotId(spotId))
    // validations()
  }, [ startDateNum, endDateNum ]);

  return (
    <div className="booking-confirmed-container">
      <div className="booking-confirmed-inner-container">
        <div className="booking-confirmed-image">IMAGE</div>
        <div className="booking-confirmed-detail-container">
          <div className="booking-confirmed-check-container">
            <div className="booking-confirmed-checkin">CHECK IN</div>
            <div className="booking-confirmed-checkout">CHECKOUT</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
