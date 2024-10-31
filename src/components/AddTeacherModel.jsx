import React, { useContext, useEffect, useState } from 'react';
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
import { colors } from '../colors/colors';
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

const buttonStyles = {
    borderColor: 'gray',
    color: 'gray',
    width: '50%',
};

const AddTeacherModal = ({
    open,
    handleClose,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleAddTeacher,
    handleUpdateTeacher,
    initialData,
}) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [name, setName] = useState(initialData ? initialData.name : '');
    const [email, setEmail] = useState(initialData ? initialData.email : '');
    const [phone, setPhone] = useState(initialData ? initialData.phone : '');
    const [department, setDepartment] = useState(initialData ? initialData.department : '');
    const [subject, setSubject] = useState(initialData ? initialData.subject : '');
    const [package1, setPackage1] = useState(initialData ? initialData.package : '');
    const [selectedGrades, setSelectedGrades] = useState(initialData ? initialData.year : []);
    const [status, setStatus] = useState(initialData ? initialData.status : 'قيد التفعيل');
    const [password, setPassword] = useState(initialData ? initialData.password : '');
    const [confirmPassword, setConfirmPassword] = useState(initialData ? initialData.confirmPassword : '');
    const [errors, setErrors] = useState({});
    const { signup } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'الاسم مطلوب';
        if (!email) newErrors.email = 'البريد الإلكتروني مطلوب';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
        if (!phone) newErrors.phone = 'رقم الهاتف مطلوب';
        if (!department) newErrors.department = 'القسم مطلوب';
        if (!subject) newErrors.subject = 'اسم المادة مطلوب';
        if (!package1) newErrors.package = 'الباقة مطلوبة';
        if (!password) newErrors.password = 'كلمة المرور مطلوبة';
        else if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        if (password !== confirmPassword) newErrors.confirmPassword = 'كلمات المرور لا تتطابق';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleYearSelect = (year) => {
        setSelectedGrades((prev) => {
            if (prev.includes(year)) {
                return prev.filter((item) => item !== year);
            } else {
                return [...prev, year];
            }
        });
    };

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setPhone(initialData.phone);
            setDepartment(initialData.department);
            setSubject(initialData.subject);
            setPackage1(initialData.package);
            setSelectedGrades(initialData.year);
            setStatus(initialData.status);
            setPassword(initialData.password);
        }
    }, [initialData]);

    const handleSubmit = async () => {
        if (!validate()) return;
        const teacherData = {
            name,
            email,
            phone,
            department,
            subject,
            year: selectedGrades,
            package: package1,
            status,
            password,
            confirmPassword
        };

        if (initialData) {
            handleUpdateTeacher(initialData.id, teacherData);
        } else {
            handleAddTeacher(teacherData);
        }
        await signup(email, password)
        handleClose();
    };

    const handleAvailable = (option) => {
        setSelectedOption(option);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-teacher-modal"
            aria-describedby="modal-for-adding-teacher"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" textAlign="right" mb={2}>
                    {initialData ? "تعديل المعلم" : "إضافة معلم جديد"}
                </Typography>

                <TextField
                    fullWidth
                    label="اسم المدرس"
                    margin="normal"
                    variant="outlined"
                    placeholder="أدخل اسم المدرس"
                    sx={inputStyles}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    error={!!errors.phone}
                    helperText={errors.phone}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <FormControl fullWidth margin="normal" sx={{ ...selectStyles, width: '50%' }}>
                        <InputLabel>القسم</InputLabel>
                        <Select
                            error={!!errors.department}
                            value={department}
                            onChange={(e) => {
                                setDepartment(e.target.value);
                                setSelectedGrades([]);
                            }}
                        >
                            <MenuItem value="">
                                <em>اختر القسم</em>
                            </MenuItem>
                            <MenuItem value="قسم 1">قسم 1</MenuItem>
                            <MenuItem value="قسم 2">قسم 2</MenuItem>
                            <MenuItem value="قسم 3">قسم 3</MenuItem>
                            <MenuItem value="IG">IG</MenuItem>
                        </Select>
                        {errors.department && <Typography color="error">{errors.department}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" sx={{ ...selectStyles, width: '50%' }}>
                        <InputLabel>اسم المادة</InputLabel>
                        <Select
                            error={!!errors.subject}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>اختر المادة</em>
                            </MenuItem>
                            <MenuItem value="مادة 1">مادة 1</MenuItem>
                            <MenuItem value="مادة 2">مادة 2</MenuItem>
                        </Select>
                        {errors.subject && <Typography color="error">{errors.subject}</Typography>}
                    </FormControl>
                </div>

                {department && department !== "IG" && (
                    <>
                        <Typography variant="body1" component="label" style={{ marginBottom: '10px', display: 'block' }}>
                            السنة الدراسية
                        </Typography>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {["الأول الثانوي", "الثاني الثانوي", "الثالث الثانوي"].map((year) => (
                                <Button
                                    key={year}
                                    variant='outlined'
                                    sx={{
                                        ...buttonStyles,
                                        backgroundColor: selectedGrades?.includes(year) ? colors.blue : 'transparent',
                                        color: selectedGrades?.includes(year) ? 'white' : 'gray'
                                    }}
                                    onClick={() => handleYearSelect(year)}
                                >
                                    {year}
                                </Button>
                            ))}
                        </div>
                    </>
                )}

                <FormControl fullWidth margin="normal" sx={selectStyles}>
                    <InputLabel>الباقة</InputLabel>
                    <Select
                        error={!!errors.package}
                        value={package1}
                        onChange={(e) => setPackage1(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>اختر الباقة</em>
                        </MenuItem>
                        <MenuItem value="باقة 1">باقة 1</MenuItem>
                        <MenuItem value="باقة 2">باقة 2</MenuItem>
                    </Select>
                    {errors.package && <Typography color="error">{errors.package}</Typography>}
                </FormControl>

                <TextField
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Typography variant="body1" component="label" style={{ marginBottom: '10px', display: 'block' }}>
                    تفعيل الحساب
                </Typography>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        variant='outlined'
                        sx={{
                            ...buttonStyles,
                            backgroundColor: selectedOption === "available" ? colors.blue : 'transparent',
                            color: selectedOption === "available" ? 'white' : 'gray',
                        }}
                        onClick={() => {
                            setStatus('مفعل');
                            handleAvailable("available");
                        }}
                    >
                        تأكيد التفعيل
                    </Button>
                    <Button
                        variant='outlined'
                        sx={{
                            ...buttonStyles,
                            backgroundColor: selectedOption === "notAvailable" ? colors.blue : 'transparent',
                            color: selectedOption === "notAvailable" ? 'white' : 'gray',
                        }}
                        onClick={() => handleAvailable("notAvailable")}
                    >
                        ليس الان
                    </Button>
                </div>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: '50px' }}
                    onClick={handleSubmit}
                >
                    {initialData ? "تعديل" : "إضافة معلم"}
                </Button>
            </Box>
        </Modal>
    );
};

export default AddTeacherModal;
