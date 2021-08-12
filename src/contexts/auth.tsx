import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>;
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth')
            const storageToken = await AsyncStorage.getItem('@RNAuth:token')

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser))
            }

            setTimeout(() => setLoading(false), 2000)
        }

        loadStorageData()
    }, [])

    async function signIn() {
        setLoading(true)

        const response = await auth.signIn()

        setUser(response.user)

        await AsyncStorage.setItem('@RNAuth', JSON.stringify(response.user))
        await AsyncStorage.setItem('@RNAuth:token', response.token)

        setTimeout(() => setLoading(false), 2000)
    }

    async function signOut() {
        await AsyncStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}

