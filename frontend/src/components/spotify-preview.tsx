import Image from "next/image";

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
  return (
    <a href={url}>
      <div className="border flex f rounded-xl">
        <Image
          src={image}
          width={100}
          height={100}
          alt="Spotify Song Image"
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
    </a>
  );
}
