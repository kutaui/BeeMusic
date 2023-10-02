'use client';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { LOGIN_MUTATION, VALIDATE_JWT_MUTATION, LOGOUT_MUTATION } from '@/graphql/mutations/user-mutation';
import { AuthContext } from '@/providers';
import { deleteCookie, setCookie } from 'cookies-next';
import { validateUser } from '@/lib/validate-user';

export default function Home() {
    const [email, setEmail] = useState('o@gmail.com');
    const [password, setPassword] = useState('123');
    const [login] = useMutation(LOGIN_MUTATION);
    const [validateJwt, {loading, error}] = useMutation(VALIDATE_JWT_MUTATION);
    const [logout] = useMutation(LOGOUT_MUTATION);
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const validatedUser = await validateUser(validateJwt, user);
            console.log(validatedUser);
            if (!validatedUser || error) {
                deleteCookie('USER');
                setUser(null);
                await logout();
            }
        })();
    }, []);


    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const {data} = await login({
                variables: {
                    email,
                    password
                }
            });
            setCookie('USER', JSON.stringify(data.login));
            setUser(data.login);
        } catch (error) {
            console.error('Login error:', error);
            console.log('Error object:', error);
        }
    };

    return (
        <main className="">
            <div>
                <form
                    onSubmit={handleLogin}
                >
                    <input name={email} onChange={e => setEmail(e.target.value)}/>
                    <input name={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">login</button>
                </form>
            </div>
            {user && <h2>{user.email}</h2>}
        </main>
    );
}
