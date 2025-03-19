import styles from "./api.module.css";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import play from "../assets/play.svg";
import stop from "../assets/stop.svg";
import pause from "../assets/pause.svg";
import { Howl } from "howler";

function Api() {
  const API_URL = "https://robo-music-api.onrender.com/music/my-api";
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsPlaying(true);
  };

  const stopSong = function () {
    if (sound) {
      sound.stop();
      setIsPlaying(false);
      setCurrentSong(null);
    }
  };

  const pauseSong = function (song) {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Your Music</h2>
        </div>

        <div className={styles.songs}>
          {songs.map((song) => (
            <div key={song.id} className={styles.song}>
              <img
                className={styles.imgCntn}
                src={song.songImage}
                alt={song.songTitle}
              />
              <div className={styles.detailsCntn}>
                <h2 className={styles.title}>{song.songTitle.trim()}</h2>
                <p className={styles.artist}>{song.artistName}</p>
              </div>

              <button className={styles.button} onClick={() => playSong(song)}>
                <img src={play} />
              </button>
            </div>
          ))}
        </div>
        <div>
          {currentSong ? (
            <div className={styles.nowPlaying}>
              <div className={styles.playContent}>
                <h3>Now Playing</h3>
                <span>
                  {currentSong.artistName} - {currentSong.songTitle}{" "}
                </span>
              </div>
              <div className={styles.buttonCntn}>
                <button
                  className={styles.button}
                  onClick={isPlaying ? pauseSong : () => playSong(currentSong)}
                >
                  <img src={isPlaying ? pause : play} />
                </button>

                <button
                  className={styles.button}
                  onClick={() => stopSong(currentSong)}
                >
                  <img src={stop} />
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Api;
