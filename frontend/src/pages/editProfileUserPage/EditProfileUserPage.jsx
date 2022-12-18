import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import NavMenu from "../../components/navMenu/NavMenu";
import ShareImageModal from "../../components/shareImageModal/ShareImageModal";
import Logo from "../../components/logo/Logo";

import "./editProfileUserPage.css";

// this page was partially built with ChatGPT :)
const EditProfileUserPage = () => {
  const [shareImageOpened, setShareImageOpened] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  console.log(currentUser);
  // Declare state variables for storing form data
  const [UserName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userInstagram, setUserInstagram] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [file, setFile] = useState(null);

  // e handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the form data to the database here
    try {
      const data = new FormData();
      data.set("profilePicture", file);
      data.set("userId", currentUser._id);

      await axios.put("/api/users/" + currentUser._id, data);
      localStorage.setItem("user", JSON.stringify(currentUser));

      try {
        // window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render the form
  return (
    <>
      <Logo />
      <div className='menu-div'>
        {" "}
        <button
          onClick={() => setShareImageOpened(true)}
          className='add-image-btn'
        >
          📷
        </button>
        <NavMenu />
        <ShareImageModal
          shareImageOpened={shareImageOpened}
          setShareImageOpened={setShareImageOpened}
        />
      </div>
      <form className='profile-edit-form' onSubmit={handleSubmit}>
        <label className='profile-edit-form__label'>
          Name:
          <input
            className='profile-edit-form__input'
            type='text'
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>
          Phone:
          <input
            className='profile-edit-form__input'
            type='text'
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>
          Instagram Link:
          <input
            className='profile-edit-form__input'
            type='text'
            value={userInstagram}
            onChange={(e) => setUserInstagram(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>
          Email:
          <input
            className='profile-edit-form__input'
            type='email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />
        <label className='profile-edit-form__label'>
          Image:
          <input
            className='profile-edit-form__input'
            type='file'
            accept='.png,.jpeg,.jpg,.jfif'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <br />
        <button className='profile-edit-form__button' type='submit'>
          Save
        </button>
      </form>
      <p>Change password</p>
    </>
  );
};

export default EditProfileUserPage;
