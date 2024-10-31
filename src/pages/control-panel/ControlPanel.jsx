import React, { useContext, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    CircularProgress,
    Menu,
    MenuItem,
    IconButton,
    Avatar,
} from "@mui/material";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { colors } from "../../colors/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ControlPanel = () => {
    Chart.register(...registerables);
    const { logout } = useAuth()

    const navigate = useNavigate()

    const totalCodes = 11.5;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        console.log("Profile Clicked");
        navigate('/profile')
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        console.log("Logout Clicked");
        logout()
        navigate('/login')
        handleMenuClose();
    };

    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={180}
                    sx={{
                        color: colors.lightBlue,
                        position: 'absolute',
                    }}
                />
                <CircularProgress
                    variant="determinate"
                    value={70}
                    size={180}
                    sx={{
                        color: colors.blue,
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" component="div" color="textSecondary">
                        {`${totalCodes}k`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">لوحة التحكم</Typography>
                <div>
                    <IconButton onClick={handleMenuClick}>
                        <Avatar>
                            <MoreVertIcon />
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleProfileClick}>الصفحة الشخصية</MenuItem>
                        <MenuItem onClick={handleLogoutClick}>تسحيل الخروج</MenuItem>
                    </Menu>
                </div>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ color: 'black' }}>معلمين النخبه</div>
                            <div style={{ color: colors.blue }}>11.01%-</div>
                        </div>
                        <Typography variant="h4" >40</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ color: 'black' }}>معلمين مشتركين</div>
                            <div style={{ color: colors.blue }}>11.01%-</div>
                        </div>
                        <Typography variant="h4" >200</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ color: 'black' }}>مشاهدات الحصص</div>
                            <div style={{ color: 'red' }}>3.01%-</div>
                        </div>
                        <Typography variant="h4" >25.1k</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ color: 'black' }}>الطلاب</div>
                            <div style={{ color: colors.blue }}>11.01%+</div>
                        </div>
                        <Typography variant="h4">1k</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="subtitle2">الأكواد</Typography>
                        <Line
                            data={{
                                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                                datasets: [
                                    {
                                        label: 'Dataset 1',
                                        data: [10, 20, 15, 25, 30, 35, 40],
                                        fill: false,
                                        borderColor: '#36A2EB',
                                    },
                                    {
                                        label: 'Dataset 2',
                                        data: [5, 15, 10, 20, 25, 30, 35],
                                        fill: false,
                                        borderColor: '#4BC0C0',
                                    },
                                ],
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>عدد الحصص</Typography>
                        <Doughnut
                            data={{
                                datasets: [
                                    {
                                        data: [200, 300],
                                        backgroundColor: ['#36A2EB', '#4BC0C0'],
                                    },
                                ],
                                labels: ['تم مشاهدة', 'لم يتم المشاهدة'],
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '50px' }}>
                        <Typography variant="subtitle2" sx={{ textAlign: 'right', width: '100%', fontWeight: 'bold', fontSize: '18px' }}>الأكواد المباعة</Typography>
                        <CircularProgressWithLabel value={totalCodes} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="subtitle2">الطلاب</Typography>
                        <Bar
                            data={{
                                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                                datasets: [
                                    {
                                        label: 'Dataset 1',
                                        data: [10, 20, 15, 25, 30, 35, 40],
                                        backgroundColor: '#36A2EB',
                                    },
                                    {
                                        label: 'Dataset 2',
                                        data: [5, 15, 10, 20, 25, 30, 35],
                                        backgroundColor: '#4BC0C0',
                                    },
                                ],
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ControlPanel;
