import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./EditSpotModal.css";
import { editSpot } from "../../store/spots";
import { getAllSpots } from "../../store/spots";

function EditSpotForm({ onX }) {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) return null

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (name) data.name = name;
    if (price) data.price = price;
    if (lat) data.lat = lat;
    if (lng) data.lng = lng;
    if (description) data.description = description;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (country) data.country = country;

    setErrors([]);
    dispatch(editSpot(data, spot.id)).then(() => dispatch(getAllSpots()))
    // dispatch(getAllSpots())
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });

    onX()
  };


  return (
    <form className="editSpotForm" onSubmit={onSubmit}>
      <div className="editSpotErrorContainer">
        <ul>
          {Object.values(errors).map((error, i) => (
            <li className="editSpotError" key={i}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="editSpotInputContainer">
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        {/* <div className="editSpotInput">
          <input className="editSpotInputText"
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div> */}
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="editSpotInput">
          <input className="editSpotInputText"
            type="number"
            placeholder="$ Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className="editSpotSubmit" type="submit">
          Edit Spot
        </button>
      </div>
    </form>
  )

}

export default EditSpotForm;
