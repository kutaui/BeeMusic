'use client';
import Image from 'next/image';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email'}),
    password: z.string().min(6, {message:"Password must be longer than 6 character(s)"}).max(100)
});


function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[70%] mx-auto  ">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-gray-400 border-2">
                                <Input className="" placeholder="Email" type="email" {...field} />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs"/>
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl className="rounded-xl placeholder:text-gray-500 text-lg h-12 border-gray-400 border-2">

                                <Input className="" placeholder="Password" type="password" {...field} />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs"/>

                        </FormItem>

                    )}
                />
                <div className="absolute bottom-10 w-[70%]">
                    <h3 className="flex items-center justify-center pb-3">Don't have an account ? <Link href="/register" className="pl-2 font-bold"> Register</Link></h3>
                    <Button variant="formMB" type="submit" className="h-14 ">Sign In</Button>
                </div>
            </form>
        </Form>
    );
}


export default function LoginPage() {
    return (
        <>
            <div className="relative flex justify-center pb-10">
                <Link href="/" className="font-bold w-[12%] max-w-[60px] h-10 mt-[5%] absolute left-10"> <Image width={40} height={40} src="/icons/return.png" alt="Go back icon"
                                                                                                                className="w-full"/></Link>

                <div className="font-[Montserrat] text-3xl flex flex-col items-start pt-[30%]">
                    <h1 className="font-bold pb-2">Let's sign you in.</h1>
                    <h2>We missed you!</h2>
                </div>
            </div>
            <LoginForm/>
        </>
    );
}