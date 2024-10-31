import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (await login(email, password)) {
                navigate('/control-panel');
            } else {
                setError('Admins Only!')
            }
        } catch (err) {
            setError("Failed to log in: Password or Email is not correct");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: { md: '30%', xs: '90%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="logo.svg" alt="" width={'50%'} />
                    <Typography variant="h6">Welcome to Sigmaty</Typography>
                    <Typography variant="body2" sx={{ opacity: '0.5' }}>Login to your dashboard</Typography>
                </Box>
                <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'right' }} onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant="body2" sx={{ cursor: 'pointer' }}>Forget Password?</Typography>
                    <Button
                        onClick={handleSubmit}
                        sx={{ backgroundColor: 'black', color: 'white', width: '100%', '&:hover': { backgroundColor: 'black' } }}
                        disabled={loading}
                    >
                        {loading ? <Typography sx={{ color: 'white' }}>Logging in... </Typography> : "LOG IN"}
                        Login
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
