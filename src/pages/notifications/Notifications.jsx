/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TextField,
    Paper,
    Typography,
    Grid,
    Avatar,
    TableHead,
    TableRow,
    Box,
} from "@mui/material";
import { colors } from "../../colors/colors";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const teachersData = [
    {
        id: 1,
        name: "محمد خليل",
        email: "mohamed@gmail.com",
        phone: "010464646464",
        status: 'تم تسجيل 4 حصص'
    },
    {
        id: 2,
        name: "محمد خليل",
        email: "mohamed@gmail.com",
        phone: "010464646464",
        status: 'تم تسجيل 8 حصص'
    },
    {
        id: 3,
        name: "عمر خليل",
        email: "mohamed@gmail.com",
        phone: "010464646464",
        status: 'تم تسجيل 10 حصص'
    },
    {
        id: 4,
        name: "خالد خليل",
        email: "mohamed@gmail.com",
        phone: "010464646464",
        status: 'تم تسجيل 12 حصه'
    }
];

const Notifications = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState([]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredNotifications = notifications.filter(
        (notification) =>
            notification.message.toLowerCase().includes(searchQuery)
    );

    useEffect(() => {
        const fetchNotifications = async () => {
            const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            const notificationsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(notificationsData);
        };

        fetchNotifications();
    }, []);


    return (
        <>
            <Typography variant="h4" component="h1" margin={2}>
                الاشعارات
            </Typography>
            <Paper
                sx={{
                    padding: 2,
                    width: "100%",
                    backgroundColor: "#edf4ff",
                    height: "100%"
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">الاشعارات</Typography>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 2
                        }}
                    >
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "100%",
                                        borderRadius: "50px"
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "10px"
                                    },
                                    "&:hover .MuiOutlinedInput-root": {
                                        borderColor: "#1976d2"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        borderColor: colors.blue
                                    }
                                }}
                                variant="outlined"
                                fullWidth
                                placeholder="بحث..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ textAlign: "right" }}>
                                <TableCell sx={{ textAlign: "right" }}>الصوره</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>الاسم</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>
                                    البريد الالكتروني
                                </TableCell>
                                <TableCell sx={{ textAlign: "right" }}>رقم الهاتف</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>الاشعار</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>الوقت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {filteredNotifications.map((notification) => (
                                // <Box key={notification.id} sx={{ marginBottom: 2 }}>
                                <>
                                    <TableRow sx={{ backgroundColor: colors.lightBlue }}>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            <Avatar />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            {notification.teacher?.name}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            {notification.teacher?.email}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            {notification.teacher?.phone}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            {notification.message}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            {notification.timestamp.toDate().toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                </>
                                // </Box>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Notifications;
