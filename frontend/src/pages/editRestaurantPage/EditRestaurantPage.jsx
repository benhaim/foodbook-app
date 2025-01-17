import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import ImageUpload from "../../components/imageUpload/ImageUpload";

import { cities } from "../../assets/foodData";
import { BiImage } from "react-icons/bi";
import { Loader, Select } from "@mantine/core";

import "../editProfileUserPage/editProfileUserPage.css";

const EditRestaurantPage = () => {
  const navigate = useNavigate();
  const restaurantnameParams = useParams().restaurantname;

  // Declare state variables for storing form data
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantName, setRestaurantName] = useState(restaurantnameParams);
  const [restaurantCity, setRestaurantCity] = useState();
  const [restaurantInstagram, setRestaurantInstagram] = useState("");
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // e handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the form data to the database here
    try {
      setLoading(true);

      const data = new FormData();
      if (file) {
        data.set("profilePicture", file);
      }
      data.set("restaurantname", restaurantName);
      data.set("city", restaurantCity);
      data.set("instagram", restaurantInstagram);
      data.set("restaurantId", restaurant._id);

      await axios.put("/api/restaurants/" + restaurant._id, data);

      try {
        // window.location.reload(false);
        navigate("/restaurants");
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurant = async () => {
    const res = await axios.get(
      `/api/restaurants/?restaurantname=${restaurantnameParams}`
    );
    setRestaurant(res.data);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantnameParams]);

  // Render the form
  return (
    <>
      <NavBar />
      <form className='profile-edit-form' onSubmit={handleSubmit}>
        <label className='profile-edit-form__label'>
          Name:
          <input
            className='profile-edit-form__input'
            type='text'
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>City:</label>
        <Select
          data={cities}
          onChange={setRestaurantCity}
          style={{ width: "100%", margin: "auto", color: "dark.9" }}
          searchable
        />{" "}
        <br />
        <label className='profile-edit-form__label'>
          Instagram Link:
          <input
            className='profile-edit-form__input'
            type='text'
            value={restaurantInstagram}
            onChange={(e) => setRestaurantInstagram(e.target.value)}
          />
        </label>
        <br />
        <label
          className='profile-edit-form__label'
          onChange={(e) => setFile(e.target.files[0])}
        >
          Image:
          <div className='upload-image-div'>
            <label htmlFor='file' className='shareOption'>
              <BiImage fontSize={36} color={file ? "green" : "red"} />
              <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && (
              <div className='img-upload'>
                <ImageUpload file={file} setFile={setFile} />
              </div>
            )}
          </div>
        </label>
        <br />
        {errorMsg && <div className='error msg'>{errorMsg}</div>}
        <div className='center-div'>{loading && <Loader />}</div>
        <button className='profile-edit-form__button' type='submit'>
          Save
        </button>
      </form>
    </>
  );
};

export default EditRestaurantPage;
