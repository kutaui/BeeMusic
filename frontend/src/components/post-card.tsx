import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostCardFooter from "@/components/post-card-footer";
import SpotifyPreview from "@/components/spotify-preview";

type PostCardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  provider: string;
};

export default function PostCard({
  url,
  title,
  description,
  image,
  provider,
}: PostCardProps) {
  return (
    <>
      <Card className="border-b-[1px] ">
        <CardHeader className="flex flex-row w-[80%]">
          <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl pl-2">@kutaui</CardTitle>
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
    </>
  );
}
