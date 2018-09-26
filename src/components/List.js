import React from "react";
import SingleShow from "./SingleShow";

function List(props) {
  // Copies tvshows state instead of using the original
  let tvShows = [...props.tvShows];

  if (tvShows.length) {
    tvShows = tvShows.map(shows => {
      if (shows.show) {
        shows = shows.show;
      }
      // To change the button below I have chosen to make two variables
      // After that I set a if statement to each of them to be able to compare them
      // In the if statement I put two props that I have made up which I refer to in App.js
      let episodesButtonClassName = "btn btn-primary";
      let episodesButtonInnerText = "Episodes";
      // If showEpisodes is true and shows.id is = selectId (which I made up)
      // This means that we change attributes on the button for respective TV-show
      // We need shows.id for selecting the singular tv-shows
      if (props.showEpisodes && shows.id === props.selectedId) {
        episodesButtonClassName = "btn btn-danger";
        episodesButtonInnerText = "Episodes";
      }
      return (
        <div className="card" key={shows.id}>
          {/* Show the image only if it exists otherwise we get an error doing the search */}
          {shows.image && (
            <img
              src={shows.image.medium}
              alt={shows.name}
              className="card-img"
            />
          )}
          <p className="card-title">{shows.name}</p>
          <p className="card-rating">Rating {shows.rating.average}</p>
          <div className="card-body">
            {/* Given the button a className which is a variable above 
                and the same goes for the content below */}
            <button
              className={episodesButtonClassName}
              onClick={() => props.onClick(shows.id)}
            >
              {episodesButtonInnerText}
            </button>
            <br />
            {shows.id === props.tvShowId && <div>{props.episodesList}</div>}
            <SingleShow singleShow={shows} />
          </div>
        </div>
      );
    });
  }
  // This is a conditional rendering which means that if tvShows does not equal to empty brackets "[]" then show that which is in tvShows
  return <div className="card-wrapper">{tvShows !== [] && tvShows}</div>;
}

export default List;
