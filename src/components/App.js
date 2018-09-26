// Instructions:
// Some kind of search that you see fit which lets the user perform a search
// The user should get a list (with images if available) presenting the tv shows that matches the search query
// The user should be able to at least view the shows title and description
// Optional: Present the show’s seasons and episodes if a show is clicked

import React, { Component } from "react";
import "../styles/App.css";
import List from "./List";
import Header from "./Header";

// I have made a App class where I include information that is being used through out the application
class App extends Component {
  state = {
    tvShows: [],
    isLoaded: false,
    searchResult: [],
    episodes: [],
    tvShowId: 0,
    episodeId: 0,
    showEpisodes: false
  };

  componentDidMount() {
    this.onNewSearch();
  }

  _sortByRating = (a, b) => {
    const aRating = a.show ? a.show.rating.average : a.rating.average;
    const bRating = b.show ? b.show.rating.average : b.rating.average;

    if (aRating > bRating) {
      return -1;
    }
    if (aRating < bRating) {
      return 1;
    }
    return 0;
  };

  // Fetch search result from API based on user search field input
  onNewSearch = query => {
    let isSearch = true;
    let url = `http://api.tvmaze.com/search/shows?q=${query}`;
    if (!query) {
      isSearch = false;
      url = "http://api.tvmaze.com/shows";
    }
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (!isSearch) {
          this.setState({
            isLoaded: true,
            tvShows: json.sort(this._sortByRating)
          });
        } else {
          const filteredResult = json
            .sort(this._sortByRating)
            .slice(0, 3)
            .filter(r => !!r.show.rating.average);
          this.setState({ isLoaded: true, tvShows: filteredResult });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Fetch list of episodes based on tv-show ID
  toggleShowEpisodes = id => {
    if (
      !this.state.showEpisodes ||
      (this.state.showEpisodes && id !== this.state.tvShowId)
    ) {
      fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
        .then(response => response.json())
        .then(episodes => {
          this.setState({
            episodes: episodes,
            tvShowId: id,
            showEpisodes: true
          });
        });
    } else {
      this.setState({
        episodes: [],
        showEpisodes: false
      });
    }
  };

  // Here I put state based on list options value. This will be used later when I want to take out value from every episode
  // The value I took out is the URL from every episode which sends us to the url when clicked on.
  episodesOnChange = event => {
    window.location.href = event.target.value;
  };

  // Map through episodes array and display select list of episodes based on season and episode number
  // I had episode.id in value but that was a wrong way until
  // I noticed that I should have episode.url to go to the specific episode url instead of the episode id
  renderShowEpisodes = episodes => {
    const episodeList = episodes.map(episode => (
      <option value={episode.url} key={episode.id}>
        S{episode.season} E{episode.number}: {episode.name}
      </option>
    ));

    // If episode array is empty return nothing to prevent error
    if (this.state.episodes.length) {
      return (
        <select
          name="episodeId"
          value={this.state.episodeId}
          onChange={this.episodesOnChange}
        >
          <option name="episodeId" value="0">
            Episodes
          </option>
          {episodeList}
        </select>
      );
    }
  };

  render() {
    const { isLoaded, tvShows } = this.state;

    return (
      <div className="container">
        <Header onNewSearch={this.onNewSearch} />
        {isLoaded ? (
          <List
            // In List.js I compare a made up selectedId with the shows id and here we put this selectedId to tvShowId
            // We already send tvShowId with onClick function in List.js
            // showEpisodes is from the beginning set to false but when we push to show episodes it becomes true
            // In the beginning I only showEpisodes to true and then every button became red when you pushed one button.
            // After I put in comparison the series Id with the id that I want to click on and the problem was solved
            selectedId={this.state.tvShowId}
            tvShows={tvShows}
            onClick={this.toggleShowEpisodes}
            tvShowId={this.state.tvShowId}
            episodesList={this.renderShowEpisodes(this.state.episodes)}
            showEpisodes={this.state.showEpisodes}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default App;
