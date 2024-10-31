/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
            console.log('Auth State Changed:', user);
        });
        return unsubscribe;
    }, []);
    const getUsers = async () => {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
        const usersData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setUsers(usersData);
    }

    const login = async (email, password) => {
        try {
            const colRef = collection(db, "users");
            const snapshot = await getDocs(colRef);
            const usersData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUsers(usersData);
            console.log(usersData);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = usersData.find((user) => {
                return user.email === email
            })

            console.log('User UID:', user.id);
            if (userData) {
                const token = await user.getIdToken();
                localStorage.setItem('token', token);
                console.log('User logged in:', user);
                return userCredential;
            }

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const [verificationSent, setVerificationSent] = useState(false);
    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = {
                uid: user.uid,
                email: user.email,
                created_at: new Date(user.metadata.creationTime).toLocaleString(),
                role: 'admin',
            };
            const docRef = await addDoc(collection(db, 'users'), userData);
            console.log("User added with ID: ", docRef.id);
            setUsers((prevUsers) => [...prevUsers, { ...userData, id: docRef.id }]);

            if (user) {
                // Send verification email
                await sendEmailVerification(user);
                setVerificationSent(true);
                console.log('User signed up:', user);
                console.log('Verification email sent.');
            }

            return userCredential;
        } catch (error) {
            console.error('Signup error:', error);
            setVerificationSent(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('token');
            console.log('User logged out');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const userId = 'pudHwpVz6h8YLjpRnLah';
    console.log(userId);


    const handleUpdateUser = async (updatedData) => {
        const userRef = doc(db, 'users', userId);
        console.log("Document reference path:", userRef.path);

        try {
            // Check if the document exists
            console.log(userId);
            const docSnap = await getDoc(userRef);
            if (!docSnap.exists()) {
                console.error("No such document!");
                return;
            }

            updatedData.email = newEmail;

            await updateDoc(userRef, updatedData);
            setUsers((prevTeachers) =>
                prevTeachers.map((teacher) =>
                    teacher.id === userId ? { ...teacher, ...updatedData } : teacher
                )
            );
            console.log("User updated successfully");
        } catch (error) {
            console.error("Error updating teacher: ", error);
        }
    };


    const handleUpdateEmailAndPassword = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            try {
                // Re-authenticate user
                await reauthenticateWithCredential(user, credential);

                // Prepare the updated data object
                const updatedData = {};

                // Update email
                if (newEmail) {
                    await updateEmail(user, newEmail);
                    await sendEmailVerification(user);
                    updatedData.email = newEmail;
                    setSuccess('Verification email sent to the new email. Please verify it before logging in.');
                }

                // Update password
                if (newPassword) {
                    await updatePassword(user, newPassword);
                    setSuccess('Password updated successfully!');
                }

                // Handle updating user data in Firestore
                await handleUpdateUser(updatedData);

                // Reset form fields
                setNewEmail('');
                setCurrentPassword('');
                setNewPassword('');
                setError('');

            } catch (err) {
                console.error(err);
                setError(`Failed to update: ${err.message}`);
                setSuccess('');
            }
        } else {
            setError('No user is currently signed in.');
        }
    };

    const value = {
        currentUser,
        loading,
        users,
        error,
        success,
        newEmail,
        newPassword,
        currentPassword,
        verificationSent,
        setCurrentUser,
        setLoading,
        setUsers,
        setError,
        setSuccess,
        setNewEmail,
        setNewPassword,
        setCurrentPassword,
        login,
        signup,
        logout,
        handleUpdateUser,
        handleUpdateEmailAndPassword,
        getUsers,
        userId
    };

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading ? (
                <>
                    {children}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </AuthContext.Provider>
    );
};
