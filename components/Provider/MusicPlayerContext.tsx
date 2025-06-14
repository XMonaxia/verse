"use client";

import { MusicTypes } from "@/model/Music";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

type MusicPlayerContextType = {
  playing: boolean;
  currentTrack: MusicTypes;
  isReady: boolean;
  playTrack: (track: MusicTypes) => void;
  toggle: () => void;
  trackList: MusicTypes[];
  nextTrack: () => void;
  prevTrack: () => void;
  currentTime: number;
  duration: number;
  isLoading: boolean;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

export const MusicPlayerProvider = ({
  children,
  initialTracks,
}: {
  children: React.ReactNode;
  initialTracks: MusicTypes[];
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackList] = useState<MusicTypes[]>(initialTracks);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const currentTrack = trackList[currentIndex] as MusicTypes;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isReady) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) =>
          toast.error(`Togle Error: ${err}`, {
            style: {
              background: "rgb(255, 0, 0)",
              color: "rgb(240, 240, 240)",
              borderRadius: "0 10px 0 10px",
            },
            duration: 5000,
            icon: "🎧",
          })
        );
    }
  };

  const playTrack = useCallback(
    (track: MusicTypes) => {
      const index = trackList.findIndex((t) => t._id === track._id);
      const audio = audioRef.current;
      if (!audio || index === -1) return;
      if (
        trackList[currentIndex]?._id === track._id &&
        audio.src === track.src
      ) {
        return;
      }
      toast.success(`Memutar lagu: ${track.song}, Dari ${track.artist}`, {
        style: {
          background: "rgb(0, 70, 70)",
          color: "rgb(240, 240, 240)",
          borderRadius: "0 10px 0 10px",
        },
        duration: 5000,
        icon: "🎧",
      });
      setCurrentIndex(index);
      setIsLoading(true);
      setIsReady(false);
      audio.src = track.src;
      audio.load();
      const handleCanPlay = () => {
        audio
          .play()
          .then(() => {
            setPlaying(true);
            setIsLoading(false);
            setIsReady(true);
            setDuration(audio.duration);
          })
          .catch((err) => {
            toast.error(`Gagal memutar audio: ${err}`, {
              style: {
                background: "rgb(255, 0, 0)",
                color: "rgb(240, 240, 240)",
                borderRadius: "0 10px 0 10px",
              },
              duration: 5000,
              icon: "🎧",
            });
            setIsLoading(false);
            setIsReady(false);
          });
        audio.removeEventListener("canplay", handleCanPlay);
      };
      audio.addEventListener("canplay", handleCanPlay);
    },
    [trackList, currentIndex]
  );
  const changeTrack = useCallback(
    (direction: "next" | "prev") => {
      if (!trackList.length || currentIndex === -1) return;
      let newIndex = currentIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % trackList.length;
      } else {
        newIndex = currentIndex === 0 ? trackList.length - 1 : currentIndex - 1;
      }
      playTrack(trackList[newIndex]);
    },
    [currentIndex, trackList, playTrack]
  );
  const nextTrack = useCallback(() => changeTrack("next"), [changeTrack]);
  const prevTrack = useCallback(() => changeTrack("prev"), [changeTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !("mediaSession" in navigator) || !isReady) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.song,
      artist: currentTrack.artist,
      album: "Verse Album",
      artwork: [
        {
          src: currentTrack.image || "/naliverse/naliverse.webp",
          sizes: "512x512",
          type: "image/jpg",
        },
      ],
    });
    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
      setPlaying(true);
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
      setPlaying(false);
    });
    navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();
    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [currentTrack, isReady, nextTrack, prevTrack]);
  return (
    <MusicPlayerContext.Provider
      value={{
        playing,
        currentTrack,
        isReady,
        playTrack,
        toggle,
        trackList,
        nextTrack,
        prevTrack,
        currentTime,
        duration,
        isLoading,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("Gagal Mengambil List Lagu");
  }
  return context;
};
