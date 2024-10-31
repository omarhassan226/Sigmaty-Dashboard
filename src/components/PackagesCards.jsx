import React, { useContext, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { PackagesContext } from '../contexts/PackagesContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const plans = [
    {
        gradient: 'linear-gradient(to bottom, #a57c00, #68b2cc)',
    },
    {
        gradient: 'linear-gradient(to bottom, #9baebf, #68b2cc)',
    },
    {
        gradient: 'linear-gradient(to bottom, #a7c100, #68b2cc)',
    },
];

const PackageCard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState('');
    const [features, setFeatures] = useState([]);
    const { packages, setPackages } = useContext(PackagesContext);

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const updatePackage = async () => {
        if (!selectedPlan) return;

        const docRef = doc(db, 'packages', selectedPlan.id);
        try {
            await updateDoc(docRef, {
                price: price,
                features: features,
            });

            // Update local packages state
            setPackages((prev) =>
                prev.map((pkg) =>
                    pkg.id === selectedPlan.id ? { ...pkg, price, features } : pkg
                )
            );

            setDialogOpen(false);
            setSelectedPlan(null);
            setPrice('');
            setFeatures([]);
        } catch (err) {
            console.error("Error updating document: ", err);
        }
    };

    const handleOpenDialog = (plan) => {
        setSelectedPlan(plan);
        setPrice(plan.price);
        setFeatures(plan.features);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedPlan(null);
    };

    return (
        <div>
            <Grid container spacing={3} justifyContent="center">
                {packages.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                        <Card
                            style={{
                                background: plans[index % plans.length].gradient,
                                borderRadius: '16px',
                                color: '#fff',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                                    {plan.name}
                                </Typography>
                                <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '8px 0' }}>
                                    {plan.price} ج.م /شهر
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <List>
                                    {plan.features.map((feature, idx) => (
                                        <ListItem key={idx}>
                                            <ListItemIcon>
                                                <CheckIcon style={{ color: '#fff' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    style={{
                                        backgroundColor: '#00A8E8',
                                        color: '#fff',
                                        borderRadius: '24px',
                                        marginTop: '16px',
                                    }}
                                    onClick={() => handleOpenDialog(plan)}
                                >
                                    تعديل
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Editing Plan */}
            {selectedPlan && (
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedPlan.name} باقة</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="عدد الفيديوهات"
                            type="text"
                            fullWidth
                            value={features[1] || ''}
                            onChange={(e) => handleFeatureChange(1, e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="التسويق"
                            type="text"
                            fullWidth
                            value={features[0] || ''}
                            onChange={(e) => handleFeatureChange(0, e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="السعر"
                            type="text"
                            fullWidth
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={updatePackage}
                            variant="contained"
                            style={{
                                backgroundColor: '#00A8E8',
                                color: '#fff',
                                borderRadius: '24px',
                                padding: '8px 24px',
                                width: '50%'
                            }}
                        >
                            حفظ
                        </Button>
                        <Button
                            onClick={handleCloseDialog}
                            variant="contained"
                            style={{
                                backgroundColor: 'transparent',
                                color: '#00A8E8',
                                borderRadius: '24px',
                                padding: '8px 24px',
                                marginRight: '8px',
                                width: '50%',
                                border: '1px solid #00A8E8'
                            }}
                        >
                            إلغاء
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default PackageCard;
