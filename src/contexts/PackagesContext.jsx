import React, { createContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const PackagesContext = createContext();

export const PackagesProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPackages = async () => {
        try {
            const colRef = collection(db, "packages");
            const snapshot = await getDocs(colRef);
            const packagesData = snapshot.docs.reverse().map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPackages(packagesData);
        } catch (err) {
            setError(`Failed to fetch packages: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    // const docRef = doc(db, 'packages', "3eYnVtBOnROtIOLedA6Z")
    // onSnapshot(docRef, (doc) => {
    //     console.log(doc.data(), doc.id);
    // })

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <PackagesContext.Provider value={{ packages, loading, error, setPackages }}>
            {children}
        </PackagesContext.Provider>
    );
};
