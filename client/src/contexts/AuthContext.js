import { createContext, useState, useEffect, useContext } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase"


export const AuthContext = createContext()

export const useAuthContext = () => {
	return useContext(AuthContext)
}

export function AuthProvider({children}) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, res => {
			res ? setUser(res) : setUser(null)
			setLoading(false)
			setError('')
		})
		return unsubscribe
	}, [])

	const signUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
		.catch((err) => setError(err.message))
	}

	const signIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
		.catch((err) => setError(err.message))
	}

	const logout = () => {
		signOut(auth)
	}

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}

	const value = {
		user,
		signUp,
		signIn,
		logout,
		forgotPassword,
		error
	}

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
