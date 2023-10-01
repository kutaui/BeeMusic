'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers';
import { useMutation } from '@apollo/client';
import { VALIDATE_JWT_MUTATION } from '@/graphql/mutations/user-mutations';
import { useRouter } from 'next/navigation';
import { validateUser } from '@/utils/validate-user';
import { getCookie } from 'cookies-next';

export default function Try() {
    const {push} = useRouter();
    const {user, setUser} = useContext(AuthContext);
    const [validateJwt] = useMutation(VALIDATE_JWT_MUTATION);
    console.log('homepage', user);

    useEffect(() => {
        (async () => {
            try {
                const isTokenValid = await validateUser(validateJwt, user);
                if (!isTokenValid) {
                    push('/auth');
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        })();
    }, []);

    return (
        <main className="">
            <h2>{user.email && 'working'}</h2>
        </main>
    );
}