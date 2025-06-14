"use client";

import { useRef, useEffect, useState } from "react";
import styles from "@/style/ListMusic.module.css";
import Spinner from "@/components/Loading/Spinner";
import PlayerControls from "@/components/Music/PlayerControls";
import { useScroll } from "@/components/Provider/ScrollContent";
import { useMusicPlayer } from "@/components/Provider/MusicPlayerContext";

export default function ListMusic() {
  const { playTrack, currentTrack, trackList, isReady, isLoading } =
    useMusicPlayer();
  const { isScrolledPast } = useScroll();
  const musicroll = isScrolledPast(3);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const toggle = () => setOpen((prev) => !prev);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    const html = document.documentElement;
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  if (!trackList.length) {
    return (
      <div className={styles.container}>
        <h3 className="text-c p-tb-1 fw-700">Music Tidak Tersedia.</h3>
      </div>
    );
  }

  return (
    <>
      <button
        ref={toggleRef}
        onClick={toggle}
        className={[
          styles.toggle,
          musicroll ? styles.scrolled : "",
          open ? styles.open : "",
        ].join(" ")}
      >
        {open ? "✘" : "🎧"}
      </button>
      <div
        ref={panelRef}
        className={[styles.container, open ? styles.open : ""].join(" ")}
      >
        <h3 className="text-c p-tb-1 fw-700 sticky top-0 b-black z-1000">
          Song Playlist ♫
        </h3>
        {trackList.map((music) => {
          const isCurrent = currentTrack && currentTrack._id === music._id;
          return (
            <div
              key={music._id}
              className={`${styles.list} ${isCurrent ? styles.lactive : ""}`}
              onClick={() => {
                if (!isCurrent) {
                  playTrack(music);
                }
              }}
            >
              <h4 className="fw-500 fs-09 sm-fs-08">{music.song}</h4>
              <p className="fs-07 c-hover-whites sm-fs-06">{music.artist}</p>
              {isCurrent &&
                (isLoading || !isReady ? <Spinner /> : <PlayerControls />)}
            </div>
          );
        })}
      </div>
    </>
  );
}
