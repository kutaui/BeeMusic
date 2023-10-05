import Image from "next/image";
import Link from "next/link";
import React from 'react';

type SpotifyPreviewProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
};

export default function SpotifyPreview({
  url,
  title,
  description,
  image,
  provider,
}: SpotifyPreviewProps) {
  const handleSpotifyClick = (event: React.ChangeEvent<EventTarget>) => {
    event.stopPropagation();
  };

  return (
    <Link href={url} target="_blank" onClick={handleSpotifyClick} passHref>
      <div className="border flex f rounded-xl hover:bg-gray-200">
        <Image
          src={image}
          width={100}
          height={100}
          alt="Spotify Song Image"
          placeholder="empty"
          className="rounded-tl-xl rounded-bl-xl"
        />
        <div className="flex flex-col p-3">
          <h3 className="text-gray-500">
            {provider === "Spotify" && "open.spotify.com"}
          </h3>
          <h2 className="font-semibold">{title}</h2>
          <h4 className="text-gray-500">{description}</h4>
        </div>
      </div>
    </Link>
  );
}
