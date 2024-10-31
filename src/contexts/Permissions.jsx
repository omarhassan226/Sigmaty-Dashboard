import React, { createContext, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPermissions = async () => {
        try {
            const colRef = collection(db, "permissions");
            const snapshot = await getDocs(colRef);
            const permissionsData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPermissions(permissionsData);
        } catch (err) {
            setError(`Failed to fetch packages: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // const handleStatusChange = async (id) => {
    //     const permissionsRef = doc(db, 'permissions', id);
    //     const permission = permissions.find((permission) => permission.id === id);

    //     if (permission) {
    //         const newStatus = permission.status === "لم يتم القبول" ? "مفعل" : "قيد التفعيل";

    //         try {
    //             await updateDoc(permissionsRef, { status: newStatus });

    //             // Update local state
    //             const updatedTeachers = permission.map((t) =>
    //                 t.id === id ? { ...t, status: newStatus } : t
    //             );
    //             setPermissions(updatedTeachers);

    //             console.log(`Status updated to: ${newStatus}`);
    //         } catch (error) {
    //             console.error("Error updating document: ", error);
    //         }
    //     }
    // };

    const handleAddPermission = async (permissionData) => {
        try {
            const docRef = await addDoc(collection(db, 'permissions'), permissionData);
            console.log("Teacher added with ID: ", docRef.id);
            setPermissions((prevTeachers) => [...prevTeachers, { ...permissionData, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding teacher: ", error);
        }
    };

    // const handleUpdateTeacher = async (id, updatedData) => {
    //     const teacherRef = doc(db, 'teachers', id);

    //     try {
    //         await updateDoc(teacherRef, updatedData);
    //         setPermissions((prevTeachers) =>
    //             prevTeachers.map((teacher) =>
    //                 teacher.id === id ? { ...teacher, ...updatedData } : teacher
    //             )
    //         );
    //         console.log("Teacher updated successfully");
    //     } catch (error) {
    //         console.error("Error updating teacher: ", error);
    //     }
    // };

    // show 1 object by id 
    // const docRef = doc(db, 'packages', "3eYnVtBOnROtIOLedA6Z")
    // onSnapshot(docRef, (doc) => {
    //     console.log(doc.data(), doc.id);
    // })

    // to show all the data
    // const teachersCollectionRef = collection(db, 'teachers')
    // onSnapshot(teachersCollectionRef, (snapshot) => {
    //     const teachersData = snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //     }));
    //     console.log(teachersData);
    // });

    useEffect(() => {
        fetchPermissions();
    }, []);

    return (
        <PermissionsContext.Provider value={{ fetchPermissions, loading, error, permissions, handleAddPermission }}>
            {children}
        </PermissionsContext.Provider>
    );
};
