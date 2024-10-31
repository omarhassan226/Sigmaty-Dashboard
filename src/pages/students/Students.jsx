/* eslint-disable no-console */
import React, { useContext, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Typography,
    Grid,
    Menu,
    MenuItem
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { colors } from "../../colors/colors";
import { StudentsContext } from "../../contexts/StudenContext";

const Students = () => {
    const { students, setStudents } = useContext(StudentsContext)
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredRow, setHoveredRow] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleAvailable = (id) => {
        setStudents((prevTeachers) =>
            prevTeachers.map((teacher) =>
                teacher.id === id
                    ? {
                        ...teacher,
                        status: teacher.status === "لم يتم القبول" ? "تم القبول" : "لم يتم القبول"
                    }
                    : teacher
            )
        );
    };

    const filteredTeachers = students.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchQuery) ||
            teacher.email.toLowerCase().includes(searchQuery)
    );

    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedTeacherId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTeacher = () => {
        setStudents((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== selectedTeacherId));
        handleMenuClose();
    };

    return (
        <>
            <Typography variant="h4" component="h1" margin={2}>
                الطلاب
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
                        <Typography variant="h5">الطلاب</Typography>
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
                                <TableCell sx={{ textAlign: "right" }}>الاسم</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>البريد الالكتروني</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>رقم الهاتف</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>القسم</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>اسم المادة</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>السنة الدراسية</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>الطاقه</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>الحالة</TableCell>
                                <TableCell sx={{ textAlign: "right" }}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTeachers.map((teacher) => (
                                <TableRow
                                    key={teacher.id}
                                    onMouseEnter={() => setHoveredRow(teacher.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.name}</TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.email}</TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.phone}</TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.section}</TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        <span style={{ backgroundColor: colors.blue2, color: colors.blue, padding: '5px', borderRadius: '5px' }}>
                                            {teacher.subject}
                                        </span>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.academicYear}</TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>{teacher.category}</TableCell>
                                    <TableCell
                                        onClick={() => handleAvailable(teacher?.id)}
                                        style={{
                                            color:
                                                teacher.status === "تم القبول" ? colors.green : colors.pink
                                        }}
                                        sx={{
                                            fontWeight: "bold",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "8px",
                                                height: "8px",
                                                backgroundColor:
                                                    teacher.status === "تم القبول"
                                                        ? colors.green
                                                        : colors.pink,
                                                borderRadius: "50px"
                                            }}
                                        />
                                        <div
                                            style={{
                                                textAlign: "right",
                                                width: "70%",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {teacher.status}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right", padding: "0" }}>
                                        {hoveredRow === teacher.id && (
                                            <MoreHorizIcon
                                                onClick={(e) => handleMenuOpen(e, teacher.id)}
                                                sx={{ cursor: "pointer" }}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleDeleteTeacher}>حذف</MenuItem>
                    </Menu>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Students;
