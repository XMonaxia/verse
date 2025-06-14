"use server";
import { getMusic } from "@/lib/config/axios";
import { ReactNode } from "react";
import { MusicPlayerProvider } from "./MusicPlayerContext";

export default async function MusicWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const rawData = await getMusic();
  const formattedData = rawData.map((track) => ({
    ...track,
    _id: track._id.toString(),
  }));

  return (
    <MusicPlayerProvider initialTracks={formattedData}>
      {children}
    </MusicPlayerProvider>
  );
}
