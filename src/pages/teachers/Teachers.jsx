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
    Button,
    Paper,
    Typography,
    Grid,
    Menu,
    MenuItem,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { colors } from "../../colors/colors";
import AddTeacherModal from "../../components/AddTeacherModel";
import { TeacherContext } from "../../contexts/TeachersContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const Teachers = () => {
    const { teachers, handleStatusChange, handleAddTeacher, handleUpdateTeacher } = useContext(TeacherContext)
    const { users } = useAuth()
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredRow, setHoveredRow] = useState(null);
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchQuery) ||
            teacher.email.toLowerCase().includes(searchQuery)
    );

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleMenuOpen = (event, teacher) => {
        if (teacher.status === "مفعل") {
            setAnchorEl(event.currentTarget);
            setSelectedTeacher(teacher);
            console.log(teacher.id);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
        handleMenuClose();
    };

    const handleEditTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setOpen(true);
        handleMenuClose();
    };

    const cellStyles = {
        textAlign: 'right',
        padding: '16px',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
    };

    const rightColumnStyles = {
        ...cellStyles,
        borderLeft: '1px solid rgba(224, 224, 224, 1)',
    };

    const generateRandomCode = (length = 6) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const [studentCount, setStudentCount] = useState(50);

    const handleCreateCode = async () => {
        const code = generateRandomCode();
        const message = `Your confirmation code is: ${code}`;
        const phoneNumber = selectedTeacher?.phone;

        // Construct WhatsApp URL
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Save confirmation code in Firestore
        try {
            await addDoc(collection(db, 'confirmationCodes'), {
                code: code,
                teacherId: selectedTeacher?.id,
                createdAt: new Date(),
            });

            await addDoc(collection(db, 'notifications'), {
                message,
                teacher: selectedTeacher,
                timestamp: new Date(),
            });

            console.log('Confirmation code saved:', code);
        } catch (error) {
            console.error('Error saving confirmation code:', error);
        }
    };

    return (
        <>
            <Typography variant="h4" component="h1" margin={2}>
                المعلمين
            </Typography>
            {
                users?.map((user) => {
                    return (
                        <Typography key={user.id}>{user.role}</Typography>
                    )
                })
            }
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
                        <Typography variant="h5">المعلمين</Typography>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 2,
                        }}
                    >
                        <Grid item xs={6} sm={6}>
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
                        <Grid
                            item
                            xs={6}

                            sm={6}
                            textAlign={"left"}
                            justifyContent={"space-between"}
                            sx={{}}
                        >
                            <Button
                                variant="contained"
                                sx={{ borderRadius: "50px", height: "100%" }}
                                onClick={handleOpen}
                            >
                                <AddIcon sx={{ margin: "0" }} />
                                أضف معلم جديد
                            </Button>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ textAlign: "right" }}>
                                <TableCell sx={{ textAlign: "right" }}>الاسم</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>
                                    البريد الالكتروني
                                </TableCell>
                                <TableCell sx={{ textAlign: "right" }}>رقم الهاتف</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>القسم</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>اسم المادة</TableCell>
                                <TableCell sx={{ textAlign: "right" }}>
                                    السنة الدراسية
                                </TableCell>
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
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.email}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.phone}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.department}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.subject}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {teacher.year + ' '}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => handleStatusChange(teacher?.id)}
                                        style={{
                                            color:
                                                teacher.status === 'مفعل' ? colors.green : colors.pink
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
                                                    teacher.status === "مفعل"
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
                                                onClick={(e) => handleMenuOpen(e, teacher)}
                                                sx={{ cursor: "pointer" }}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <AddTeacherModal
                        showPassword={showPassword}
                        handleClose={handleCloseModal}
                        handleClickShowPassword={handleClickShowPassword}
                        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                        showConfirmPassword={showConfirmPassword}
                        open={open}
                        handleAddTeacher={handleAddTeacher}
                        handleStatusChange={handleStatusChange}
                        initialData={selectedTeacher}
                        handleUpdateTeacher={handleUpdateTeacher}
                    />

                    <Menu
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleModalOpen}>إنشاء الكود</MenuItem>
                        <MenuItem onClick={() => handleEditTeacher(selectedTeacher)}>تعديل</MenuItem>
                    </Menu>

                    {/* Modal for Create Code */}
                    <Dialog open={openModal} onClose={handleModalClose} fullWidth>
                        <DialogTitle sx={{ fontWeight: 'bold' }}>إنشاء أكواد</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingBlock: '0' }}>
                            <Table sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '15px' }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={rightColumnStyles}>
                                            <Typography>المدرس:</Typography>
                                        </TableCell>
                                        <TableCell sx={cellStyles}>
                                            <Typography>{selectedTeacher?.name}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={rightColumnStyles}>
                                            <Typography>البريد الالكتروني:</Typography>
                                        </TableCell>
                                        <TableCell sx={cellStyles}>
                                            <Typography>{selectedTeacher?.email}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={rightColumnStyles}>
                                            <Typography>رقم الهاتف:</Typography>
                                        </TableCell>
                                        <TableCell sx={cellStyles}>
                                            <Typography>{selectedTeacher?.phone}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={rightColumnStyles}>
                                            <Typography>السنة الدراسية:</Typography>
                                        </TableCell>
                                        <TableCell sx={cellStyles}>
                                            <Typography>{selectedTeacher?.year}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <TextField
                                fullWidth
                                label="عدد الطلاب"
                                value={studentCount}
                                type="number"
                                onChange={(e) => setStudentCount(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions sx={{ padding: '24px' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: '50px', padding: '5px', fontSize: '22px' }}
                                onClick={handleCreateCode}
                            >
                                إنشاء
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Teachers;
