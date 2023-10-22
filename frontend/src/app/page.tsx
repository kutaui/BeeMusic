"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { validateUser } from "@/lib/validate-user";
import { toast } from "@/components/ui/use-toast";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import {
  LOGOUT_MUTATION,
  VALIDATE_JWT_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { AuthContext } from "@/components/providers";




function Navbar() {
  const { push, refresh } = useRouter();
  const [validateJwt] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt);
      if (!validatedUser || validatedUser === "error") {
        deleteCookie("USER");
        setUser(null);
      }
    })();
  }, [logout, push, refresh, setUser, validateJwt]);
  return (
    <nav className="flex justify-around items-center pt-4 ">
      <div className="flex items-center">
        <Image src="/icons/bee-icon.png" width={50} height={50} alt="asd" />
        <h3 className="pl-3 text-2xl sm:text-4xl font-semibold font-[Montserrat]">
          <span className="text-orange-500">B</span>ee
          <span className="text-orange-500">M</span>usic
        </h3>
      </div>
      <Link passHref href="/login">
        <Button size="sm" className="border border-black">
          Login
        </Button>
      </Link>
    </nav>
  );
}

const App = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[900px] mx-auto w-full pt-10 space-y-10 pb-10  ">
        <section className="w-[80%] mx-auto space-y-8 h-auto flex flex-col items-center [&>p]:w-[80%]">
          <h1 className="text-3xl font-bold font-[Montserrat] ">
            Share your favorite music with the world
          </h1>
          <p className="text-lg font-serif ">
            Discover a world of music like never before. BeeMusic is a dedicated
            space where you can share and explore the songs that resonate with
            you. Join our buzzing community and let your musical soul take
            flight!
          </p>
          <Link passHref href="/register">
            <Button
              variant="round"
              className="bg-orange-500 border-white hover:text-orange-500 hover:border-orange-500"
            >
              Get Started
            </Button>
          </Link>
          <h3 className="text-xl font-bold font-[Montserrat] text-orange-600">
            What is BeeMusic?
          </h3>
          <p className="text-lg font-serif">
            BeeMusic is your personal stage to showcase the tunes that strike a
            chord in your heart. Share the songs you love, discover hidden gems,
            and connect with fellow music enthusiasts. It&apos;s your playlist,
            your way.
          </p>
        </section>
        <div className="flex justify-center ">
          <Image
            src="/landing/Screenshot_2.png"
            width={300}
            height={500}
            alt="asd"
          />
        </div>
        <section className="w-[80%] mx-auto space-y-4 h-auto flex flex-col items-center [&>*>span]:font-bold ">
          <h4 className="text-xl font-bold font-[Montserrat] text-orange-600">
            Why BeeMusic?
          </h4>
          <p>
            <span>🎵 Discover & Explore:</span> Dive into a vast array of
            musical genres and discover the latest hits or timeless classics.
          </p>
          <p>
            <span> 🔍 Find Your Tribe:</span> Connect with fellow music lovers
            who share your taste and passion for great tunes.
          </p>
          <p>
            <span> 🌟 Curated Experience:</span> Tailored playlists and
            recommendations just for you, based on your musical preferences.
          </p>
          <p>
            <span> 🎉 Community Engagement:</span> Like, comment, and share your
            favorite tracks, sparking engaging conversations around the music
            you adore.
          </p>
          <h3 className="font-bold font-[Montserrat]">
            Ready to <span className="italic pr-1 text-orange-500">🐝Bee </span>{" "}
            a Part of It?
          </h3>
          <Link passHref href="/register">
            <Button
              variant="round"
              className="bg-orange-500 border-white hover:text-orange-500 hover:border-orange-500"
            >
              Start Sharing now
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default App;
