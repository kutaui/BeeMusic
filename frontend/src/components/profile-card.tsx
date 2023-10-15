import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import avatarMap from "@/lib/avatars";

type ProfileCardProps = {
  username: string;
  avatar: string;
};

export default function ProfileCard({ username, avatar }: ProfileCardProps) {
  const userAvatar = avatarMap[avatar];
  return (
    <div className="flex flex-col items-center p-4  border-b">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={userAvatar}
          alt={`${username}'s Avatar`}
          className=""
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold ">@{username}</h2>
    </div>
  );
}
