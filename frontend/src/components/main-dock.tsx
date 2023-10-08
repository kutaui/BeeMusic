"use client";
import Image from "next/image";
import Link from "next/link";
import CreatePost from "@/components/post/create-post";
import { useMutation } from "@apollo/client";
import {
  LOGOUT_MUTATION,
  VALIDATE_JWT_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { validateUser } from "@/lib/validate-user";
import { toast } from "@/components/ui/use-toast";
import { deleteCookie } from "cookies-next";
import { AuthContext } from "@/providers";

export default function MainDock() {
  const { push, refresh } = useRouter();
  const [validateJwt] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { user, setUser } = useContext(AuthContext);

  const onLogoutHandler = async () => {
    await logout();
    push("/");
  };

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt);
      if (!validatedUser || validatedUser === "error") {
        toast({
          title: "Something went wrong",
          description: "Please login again",
        });
        deleteCookie("USER");
        setUser(null);
        await logout();
        refresh();
      }
    })();
  }, [logout, push, refresh, setUser, validateJwt]);

  return (
    <div className="fixed bottom-0 p-5  border-t w-full bg-white">
      <div className="flex justify-around">
        <CreatePost />
        <Link href={"/search"} passHref>
          <Image
            src="/icons/search.png"
            alt="Make a post icon"
            width={25}
            height={25}
          />
        </Link>
        <Image
          src="/icons/logout.png"
          alt="Search a user icon"
          width={25}
          height={25}
          onClick={onLogoutHandler}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
