import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { colors } from "../../colors/colors";

const UpdateAdminCredentials = () => {
    const {
        handleUpdateEmailAndPassword,
        currentPassword,
        setCurrentPassword,
        newEmail,
        setNewEmail,
        newPassword,
        setNewPassword,
        error,
        success,
    } = useAuth();

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">تحديث الصفحة الشخصيه</Typography>
            <form onSubmit={handleUpdateEmailAndPassword}>
                <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="New Email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: "black",
                        "&:hover": { backgroundColor: colors.blue }
                    }}
                >
                    تحديث البيانات
                </Button>
            </form>
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="success" sx={{ mt: 2 }}>
                    {success}
                </Typography>
            )}
        </Box>
    );
};

export default UpdateAdminCredentials;
