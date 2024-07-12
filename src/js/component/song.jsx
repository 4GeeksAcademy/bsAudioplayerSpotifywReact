import React, { useEffect, useState } from "react";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
      })
      .then(console.log(songs));
  }, []);

    function playSong () {
        
    }
  return (
    <>
      <div className="container-fluid">
        <h1 className="header">Not Spotify...</h1>
        <div className="container-fluid p-0">
          <div id="songs" className="row p-0">
            {songs.map((song, index) => {
              return (
                <p key={index} className="songText songRow">
                  {song.id}: {song.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="footer fixed-bottom text-center">
          <button className="skipButtons border rounded border-0">
            <i className="fa solid fa-caret-left"></i>
          </button>
          {isPlaying ? (
            <button>pause</button>
          ) : (
            <button onClick={() => } className="bg-transparent border-0">
              <i className="fa solid fa-play" style={{ color: "white" }}></i>
            </button>
          )}
          <button className="skipButtons text-center border rounded border-0">
            <i className="fa solid fa-caret-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default Song;
