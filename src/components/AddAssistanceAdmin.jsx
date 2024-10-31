import React, { useContext, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PermissionsContext } from '../contexts/Permissions';
import { useAuth } from '../contexts/AuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

const inputStyles = {
    '& .MuiOutlinedInput-root': {
        '& input': {
            padding: '8px',
        },
    },
};

const selectStyles = {
    '& .MuiSelect-select': {
        padding: '8px',
    },
};

const AddAssistanceAdmin = ({
    open,
    handleClose,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword
}) => {
    const { signup } = useAuth()
    const { handleAddPermission } = useContext(PermissionsContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "يرجى إدخال الاسم";
        if (!email) {
            newErrors.email = "يرجى إدخال البريد الإلكتروني";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
        }
        if (!phone) newErrors.phone = "يرجى إدخال رقم الهاتف";
        if (!selectedPage) newErrors.selectedPage = "يرجى اختيار الصفحة";
        if (!password) newErrors.password = "يرجى إدخال كلمة المرور";
        if (!confirmPassword) {
            newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "كلمات المرور غير متطابقة";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        validateForm();
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const newAdminData = {
                name,
                email,
                phone,
                selectedPage,
                password,
            };
            handleAddPermission(newAdminData);
            await signup(email, password)
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-admin-modal"
            aria-describedby="modal-for-adding-admin"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" textAlign="right" mb={2}>
                    اضافة ادمن مساعد
                </Typography>

                <TextField
                    fullWidth
                    label="أدخل الأسم"
                    margin="normal"
                    variant="outlined"
                    placeholder="أدخل الأسم"
                    sx={inputStyles}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    fullWidth
                    label="البريد الإلكتروني"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    sx={inputStyles}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    label="رقم الهاتف"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">🇪🇬 +20</InputAdornment>
                        ),
                    }}
                    placeholder="أدخل رقم الهاتف"
                    sx={inputStyles}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    // onBlur={() => handleBlur('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />

                <FormControl fullWidth margin="normal" sx={selectStyles}>
                    <InputLabel>اختيار الصفحة المراد اختيار ادمن لها</InputLabel>
                    <Select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        onBlur={() => handleBlur('selectedPage')}
                        error={!!errors.selectedPage}
                    >
                        <MenuItem value="">
                            <em>اختر الصفحة</em>
                        </MenuItem>
                        <MenuItem value="page1">صفحة 1</MenuItem>
                        <MenuItem value="page2">صفحة 2</MenuItem>
                    </Select>
                    {errors.selectedPage && <Typography color="error">{errors.selectedPage}</Typography>}
                </FormControl>

                <TextField
                    fullWidth
                    label="كلمة المرور"
                    margin="normal"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={inputStyles}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <TextField
                    fullWidth
                    label="تأكيد كلمة المرور"
                    margin="normal"
                    variant="outlined"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="أعد إدخال كلمة المرور"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={inputStyles}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: '50px' }}
                    onClick={handleSubmit}
                >
                    اضافة ادمن مساعد
                </Button>
            </Box>
        </Modal>
    );
};

export default AddAssistanceAdmin;
