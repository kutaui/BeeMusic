"use client";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { deleteCookie, setCookie } from "cookies-next";
import { useMutation } from "@apollo/client";
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  VALIDATE_JWT_MUTATION,
} from "@/graphql/mutations/user-mutation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { validateUser } from "@/lib/validate-user";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be longer than 6 characters" })
    .max(100),
});

function LoginForm() {
  const [login] = useMutation(LOGIN_MUTATION);
  const { setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await login({
        variables: {
          ...values,
        },
      });
      toast({
        title: "Login Successful",
        description: "Redirecting you to the home page.",
      });
      setCookie("USER", JSON.stringify(data.login));
      setUser(data.login);
      push("/home");
    } catch (error: any) {
      if (error.message === "Invalid Credentials.") {
        toast({
          title: "Error Signing In",
          description: "Invalid Credentials.",
        });
      } else {
        toast({
          title: "Error Signing In",
          description: "Something went wrong. Please try again.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[70%] mx-auto  "
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
              <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-black border-2 font-[Montserrat]">
                <Input
                  className=""
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 text-xs" />
            </FormItem>
          )}
        />
        <div className="absolute bottom-10 w-[70%]">
          <h3 className="flex items-center justify-center pb-3">
            Don't have an account ?
            <Link href="/register" className="pl-2 font-bold">
              Register
            </Link>
          </h3>
          <Button variant="formMB" type="submit" className="h-14 ">
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function LoginPage() {
  const [validateJwt, { error }] = useMutation(VALIDATE_JWT_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { user, setUser } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const validatedUser = await validateUser(validateJwt, user);
      console.log(validatedUser);
      if (!validatedUser || error) {
        deleteCookie("USER");
        setUser(null);
        await logout();
      } else {
        push("/home");
      }
    })();
  }, []);

  return (
    <>
      <div className="relative flex justify-center pb-10">
        <div className="font-[Montserrat] text-3xl flex flex-col items-start pt-[30%]">
          <h1 className="font-bold pb-2">Let's sign you in.</h1>
          <h2>We missed you!</h2>
        </div>
      </div>
      <LoginForm />
    </>
  );
}
