import React, { createContext, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeacher = async () => {
        try {
            const colRef = collection(db, "student");
            const snapshot = await getDocs(colRef);
            const teachersData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setStudents(teachersData);
        } catch (err) {
            setError(`Failed to fetch packages: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id) => {
        const teacherRef = doc(db, 'student', id);
        const teacher = students.find((teacher) => teacher.id === id);

        if (teacher) {
            const newStatus = teacher.status === "قيد التفعيل" ? "مفعل" : "قيد التفعيل";

            try {
                await updateDoc(teacherRef, { status: newStatus });

                // Update local state
                const updatedTeachers = students.map((t) =>
                    t.id === id ? { ...t, status: newStatus } : t
                );
                setStudents(updatedTeachers);

                console.log(`Status updated to: ${newStatus}`);
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };

    const handleAddTeacher = async (teacherData) => {
        try {
            const docRef = await addDoc(collection(db, 'student'), teacherData);
            console.log("student added with ID: ", docRef.id);
            setStudents((prevTeachers) => [...prevTeachers, { ...teacherData, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding student: ", error);
        }
    };

    const handleUpdateTeacher = async (id, updatedData) => {
        const teacherRef = doc(db, 'student', id);

        try {
            await updateDoc(teacherRef, updatedData);
            setStudents((prevTeachers) =>
                prevTeachers.map((teacher) =>
                    teacher.id === id ? { ...teacher, ...updatedData } : teacher
                )
            );
            console.log("student updated successfully");
        } catch (error) {
            console.error("Error updating teacher: ", error);
        }
    };

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
        fetchTeacher();
    }, []);

    return (
        <StudentsContext.Provider value={{ students, loading, error, setStudents, handleStatusChange, handleAddTeacher, handleUpdateTeacher }}>
            {children}
        </StudentsContext.Provider>
    );
};
