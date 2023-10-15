"use client";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input/input";
import Link from "next/link";
import { validateUser } from "@/lib/validate-user";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
  VALIDATE_JWT_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { AuthContext } from "@/components/providers";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  username: z
    .string()
    .min(3, { message: "Username must be longer than 3 character(s)" })
    .max(100),
  password: z
    .string()
    .min(6, { message: "Password must be longer than 6 character(s)" })
    .max(100),
});

function RegisterForm() {
  const [register] = useMutation(REGISTER_MUTATION);
  const { setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await register({
        variables: {
          ...values,
        },
      });
      toast({
        title: "Register Successful",
        description: "Redirecting you to the home page.",
      });
      setCookie("USER", JSON.stringify(data.register));
      setUser(data.register);
      push("/home");
    } catch (error: any) {
      if (error.message === "User with this email already exists.") {
        toast({
          title: "Error Registering",
          description: "This email is already in use.",
        });
      } else {
        toast({
          title: "Error Registering",
          description: "Something went wrong. Please try again.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[70%] mx-auto max-w-[700px]"
        aria-label="Register Form"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-black border-2 font-[Montserrat]">
                <Input
                  className=""
                  placeholder="Email"
                  type="email"
                  aria-label="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-black border-2 font-[Montserrat]">
                <Input
                  aria-label="Username"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-black border-2 font-[Montserrat] peer">
                <Input
                  placeholder="Password"
                  type="password"
                  aria-label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 text-xs" />
            </FormItem>
          )}
        />
        <div className="pt-8">
          <h3 className="flex items-center justify-center pb-3">
            Have an account?
            <Link href="/login" className="pl-2 font-bold">
              Login
            </Link>
          </h3>
          <Button variant="formMB" type="submit" className="h-14 ">
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function RegisterPage() {
  const { push } = useRouter();
  const [validateJwt] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt);
      if (validatedUser === "error") {
        return;
      }
      if (!validatedUser) {
        toast({
          title: "Something went wrong",
          description: "Please login again",
        });
        deleteCookie("USER");
        setUser(null);
        await logout();
        push("/");
      } else {
        getCookie("USER");
        push("/home");
      }
    })();
  }, [logout, push, setUser, validateJwt]);

  return (
    <>
      <div className="flex justify-center pb-10 max-w-[700px] mx-auto  ">
        <div className="font-[Montserrat] text-2xl sm:text-3xl flex flex-col items-start pt-[10%]">
          <h1 className="font-bold pb-2">Ready to jam with us?</h1>
          <h2>Welcome aboard!</h2>
        </div>
      </div>
      <RegisterForm />
    </>
  );
}
