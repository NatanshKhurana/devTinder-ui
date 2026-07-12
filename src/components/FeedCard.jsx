import React from "react";

const FeedCard = ({feedData}) => {
    console.log(feedData);
    const {firstName, lastName, photoUrl, skills} = feedData;
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm p-2">
        <figure>
          <img
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          {skills.length === 0 ? <p>
            No skills !
          </p> : <p>Skills : {skills.join(", ")}</p>}
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
