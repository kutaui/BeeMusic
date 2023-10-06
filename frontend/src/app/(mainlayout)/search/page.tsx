"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries/user-query";
import Link from "next/link";

function ProfileCard() {}

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { data }: { data: { users: User[] } | undefined } = useQuery(GET_USERS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = data?.users?.filter((user: User) => {
    return user.username.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <main>
      <Input placeholder="Search Users" onChange={handleSearch} />
      {searchInput &&
        filteredUsers?.map((user: User) => (
          <Link
            key={user.username}
            passHref
            href={{
              pathname: "/[username]",
              query: { username: user.username },
            }}
            as={`/${user.username}`}
          >
            <div>
              <p>{user.username}</p>
            </div>
          </Link>
        ))}
      {filteredUsers && !filteredUsers.length && <p>No users found</p>}
    </main>
  );
}
