import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearFeed } from "../store/feedSlice";

const FeedCard = ({ feedData }) => {
  // console.log(feedData);
  const { _id, firstName, lastName, photoUrl, about, gender, age } = feedData;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(clearFeed(_id));
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm p-2">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <div>
            {gender} - {age}
          </div>
          {about && <p>{about}</p>}
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
