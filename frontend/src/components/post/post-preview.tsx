import Image from "next/image";
import Link from "next/link";
import React from "react";

type SpotifyPreviewProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
};

export default function PostPreview({
  url,
  title,
  description,
  image,
  provider,
}: SpotifyPreviewProps) {
  const handleSpotifyClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
    window.open(url, "_ blank");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleSpotifyClick}
      onClick={handleSpotifyClick}
      className="border flex f rounded-xl hover:bg-gray-200 max-w-[600px]"
    >
      <Image
        src={image}
        width={100}
        height={100}
        alt="Spotify Song Image"
        className="rounded-l-xl w-[30%]"
      />
      <div className="flex flex-col p-3 sm:text-2xl  sm:justify-center">
        <h3 className="text-gray-500">
          {provider === "Spotify" && "open.spotify.com"}
        </h3>
        <h2 className="font-semibold">{title}</h2>
        <h4 className="text-gray-500">{description}</h4>
      </div>
    </div>
  );
}
