import React from "react";

const FeedCard = ({feedData}) => {
    // console.log(feedData);
    const {firstName, lastName, photoUrl, about, gender, age} = feedData;
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm p-2">
        <figure>
          <img
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <div>{gender} - {age}</div>
          {about && <p>{about}</p>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
