'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION, VALIDATE_JWT_MUTATION } from '@/graphql/mutations/user-mutation';
import { useRouter } from 'next/navigation';
import { validateUser } from '@/lib/validate-user';
import { deleteCookie, getCookie } from 'cookies-next';
import { toast } from '@/components/ui/use-toast';

export default function Try() {
    const [validateJwt, {error}] = useMutation(VALIDATE_JWT_MUTATION);
    const [logout] = useMutation(LOGOUT_MUTATION);
    const {user, setUser} = useContext(AuthContext);
    const {push} = useRouter();

    useEffect(() => {
        (async () => {
            const validatedUser = await validateUser(validateJwt, user);
            if (!validatedUser || error) {
                toast({
                    title: 'Something went wrong',
                    description: 'Please login again',
                })
                deleteCookie('USER');
                setUser(null);
                await logout();
            }
        })();
    }, []);


    return (
        <main className="">
            hide
        </main>
    );
}