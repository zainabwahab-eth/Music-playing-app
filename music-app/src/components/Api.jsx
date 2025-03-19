import styles from "./api.module.css";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import playIcon from "../assets/play-icon.svg";
import play from "../assets/play.png";
import stop from "../assets/stop.png";
import pause from "../assets/pause.png";
import { Howl } from "howler";

function Api() {
  fetch("https://robo-music-api.onrender.com/music/my-api")
    .then((res) => res.json())
    .then((data) => console.log(data));

  const API_URL = "https://robo-music-api.onrender.com/music/my-api";
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchSongs = function () {
      axios.get(API_URL).then((res) => setSongs(res.data));
    };
    fetchSongs();
  }, []);

  const playSong = function (song) {
    if (sound) {
      sound.stop();
    }

    const newSound = new Howl({
      src: [song.songUrl],
    });

    setSound(newSound);
    setCurrentSong(song);
    newSound.play();
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.songs}>
          {songs.map((song) => (
            <div key={song.id} className={styles.song}>
              <img
                className={styles.img}
                src={song.songImage}
                alt={song.songTitle}
              />
              {song.songTitle} - {song.artistName}
              <button onClick={() => playSong(song)}>
                <img src={play} />
              </button>
            </div>
          ))}
          <div className={styles.nowPlaying}>
            {currentSong && <h3>Now Playing: {currentSong.songTitle}</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Api;
