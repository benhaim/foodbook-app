import { Link } from "react-router-dom";

import axios from "axios";

import { IconEdit, IconEraser } from "@tabler/icons";
import noImage from "../../assets/noImage2.jpg";

import "./restaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/restaurants/${restaurant._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='restaurantCard'>
      <Link to={`/restaurant/${restaurant.restaurantname}`}>
        <img
          className='rightbarProfileImg'
          src={restaurant.profilePicture || noImage}
          alt=''
        />
        <div className='restaurantName'>{restaurant.restaurantname}</div>
      </Link>
      <Link
        to={`/editrestaurant/${restaurant.restaurantname}`}
        style={{ textDecoration: "none" }}
      >
        <span className='icon transform '>
          <IconEdit />
        </span>
      </Link>

      <span className='icon transform delete' onClick={deleteHandler}>
        <IconEraser />
      </span>
    </div>
  );
};

export default RestaurantCard;
