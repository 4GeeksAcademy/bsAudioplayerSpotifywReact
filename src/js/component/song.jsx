import React, { useEffect, useState, useRef } from "react";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const baseURL = "https://playground.4geeks.com";
  var audioRef = useRef();

  useEffect(() => {
    fetch(baseURL + "/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
      });
  }, []);

  useEffect(() => {
    audioRef.play();
    if (isPlaying) {
      audioRef.play();
      setIsPlaying(true);
    } else {
      audioRef.pause();
      setIsPlaying(false);
    }
    console.log("here: " + audioRef.src);
  }, [currentlyPlaying, isPlaying]);

  function playSong(song) {
    setIsPlaying(true);
    setCurrentlyPlaying(baseURL + song.url);
    setCurrentSong(song);
  }

  function handleLeft() {
    if (currentSong.id == songs[0].id) {
      setCurrentSong(songs[songs.length - 1]);
      const index = songs.length - 1;
      audioRef.src = baseURL + songs[index].url;
      setCurrentlyPlaying(baseURL + songs[index].url);
      setIsPlaying(true);
      audioRef.play();
    } else {
      const index = currentSong.id - 1;
      audioRef.src = baseURL + songs[index - 1].url;
      setCurrentlyPlaying(baseURL + songs[index - 1].url);
      setCurrentSong(songs[index - 1]);
      setIsPlaying(true);
      audioRef.play();
    }
  }

  function handleRight() {
    if (currentSong.id == songs.length) {
      setCurrentSong(songs[0]);
    } else {
      const index = currentSong.id + 1;
      audioRef.src = baseURL + songs[index + 1].url;
      setCurrentlyPlaying(baseURL + songs[index + 1].url);
      setCurrentSong(songs[index + 1]);
      setIsPlaying(true);
      audioRef.play();
    }
  }
  return (
    <>
      <div className="container-fluid">
        <audio ref={(e) => (audioRef = e)} src={currentlyPlaying}></audio>
        <h1 className="header px-5">Not Spotify...</h1>
        <div className="container-fluid p-0">
          <div id="songs" className="row p-0">
            {songs.map((song, index) => {
              return (
                <p
                  onClick={() => playSong(song)}
                  key={index}
                  className="songText songRow"
                >
                  {" "}
                  {song.id}: {song.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="footer fixed-bottom text-center">
          <button
            className="skipButtons border rounded border-0"
            onClick={() => handleLeft()}
          >
            <i className="fa solid fa-caret-left"></i>
          </button>
          {isPlaying ? (
            <button
              onClick={() => {
                setIsPlaying(false);
              }}
              className="bg-transparent border-0"
            >
              <i className="fa solid fa-pause" style={{ color: "white" }}></i>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPlaying(true);
              }}
              className="bg-transparent border-0"
            >
              <i className="fa solid fa-play" style={{ color: "white" }}></i>
            </button>
          )}
          <button
            className="skipButtons text-center border rounded border-0"
            onClick={() => handleRight()}
          >
            <i className="fa solid fa-caret-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default Song;
