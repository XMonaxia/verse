"use client";
import { useMusicPlayer } from "@/components/Provider/MusicPlayerContext";
import styles from "@/style/ListMusic.module.css";

export default function PlayerControls() {
  const { playing, prevTrack, nextTrack, toggle, currentTime, duration } =
    useMusicPlayer();
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  return (
    <div className="flex-col item-c p-t-1">
      <div className="w-80 h-6px border-custom radius-10 relative">
        <div
          className="h-100-persen radius-10 b-main-site-color trans-width-03"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex-center jus-between w-80 max-w-300 p-t-05">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevTrack();
          }}
          className={styles.buttonPlay}
        >
          ⏮
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className={styles.buttonPlay}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextTrack();
          }}
          className={styles.buttonPlay}
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
