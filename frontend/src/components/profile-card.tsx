import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileCardProps = {
  username: string;
};

export default function ProfileCard({ username }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center p-4 border-t ">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className=""
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold ">@{username}</h2>
    </div>
  );
}
