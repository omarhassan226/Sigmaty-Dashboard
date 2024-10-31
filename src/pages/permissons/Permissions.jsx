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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { colors } from "../../colors/colors";
import AddAssistanceAdmin from "../../components/AddAssistanceAdmin";
import { PermissionsContext } from "../../contexts/Permissions";

const Permissions = () => {
    const { permissions } = useContext(PermissionsContext)
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredPermissions = permissions.filter(
        (permission) =>
            permission.name?.toLowerCase().includes(searchQuery) ||
            permission.email?.toLowerCase().includes(searchQuery)
    );

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () => {
        setOpenModal(false);
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

    return (
        <>
            <Typography variant="h4" component="h1" margin={2}>
                الصلاحيات
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
                        <Typography variant="h5">الصلاحيات</Typography>
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

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            textAlign={"left"}
                            justifyContent={"space-between"}
                            sx={{ paddingLeft: "0 !important" }}
                        >
                            <Button
                                variant="contained"
                                sx={{ borderRadius: "50px", height: "100%" }}
                                onClick={handleOpen}
                            >
                                <AddIcon sx={{ margin: "0" }} />
                                اضافة ادمن مساعد
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
                                <TableCell sx={{ textAlign: "right" }}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPermissions.map((permission) => (
                                <TableRow key={permission.id}>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {permission.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {permission.email}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "right" }}>
                                        {permission.phone}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <AddAssistanceAdmin
                        showPassword={showPassword}
                        handleClose={handleClose}
                        handleClickShowPassword={handleClickShowPassword}
                        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                        showConfirmPassword={showConfirmPassword}
                        open={open}
                    />
                </TableContainer>
            </Paper>
        </>
    );
};

export default Permissions;
