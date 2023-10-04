import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpotifyPreview from "@/components/spotify-preview";
import Image from "next/image";
import Link from "next/link";

function PostCardFooter() {
  return (
    <div className="flex justify-around w-full items-center">
      <Image
        src="/icons/heart.png"
        width={25}
        height="25"
        alt="Like Icon"
        className="h-6 w-auto"
      />
      <Image
        src="/icons/comment.png"
        width={25}
        height={25}
        alt="Comment Icon"
      />
    </div>
  );
}

type PostCardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
  username: string;
};

export default function PostCard({
  url,
  title,
  description,
  image,
  provider,
  username,
}: PostCardProps) {
  return (
    <Card className="border-b-[1px] ">
      <CardHeader className="flex flex-row w-[80%]">
        <Link
          passHref
          href={{
            pathname: "/[username]",
            query: { username: username },
          }}
          as={`/${username}`}
        >
          <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          passHref
          href={{
            pathname: "/[username]",
            query: { username: username },
          }}
          as={`/${username}`}
        >
          <CardTitle className="text-xl pl-2 w-full hover:underline">
            @{username}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="break-words">
        <SpotifyPreview
          provider={provider}
          url={url}
          image={image}
          description={description}
          title={title}
        />
      </CardContent>
      <CardFooter>
        <PostCardFooter />
      </CardFooter>
    </Card>
  );
}
