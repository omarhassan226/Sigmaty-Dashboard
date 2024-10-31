import PackageCard from "../../components/PackagesCards"
import React, { useState } from "react";
import {
    TableContainer,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent
} from "@mui/material";
import { colors } from './../../colors/colors';

function Packages() {
    return (
        <>
            <Typography variant="h4" component="h1" margin={2}>
                الباقات
            </Typography>
            <Paper
                sx={{
                    padding: 2,
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.lightBlue
                }}
            >
                <Grid container sx={{ backgroundColor: colors.lightBlue }}>
                    <Grid item xs={12}>
                        <Typography variant="h5">الباقات</Typography>
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
                        <Grid item xs={12} md={6} lg={6}>
                            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <div style={{ color: 'black' }}>معلمين النخبه</div>
                                    <div style={{ color: colors.blue }}>11.01%+</div>
                                </CardContent>
                                <CardContent style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'right', width: '100%' }}>40</CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <div style={{ color: 'black' }}>معلمين مشتركين</div>
                                    <div style={{ color: colors.blue }}>11.01%+</div>
                                </CardContent>
                                <CardContent style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'right', width: '100%' }}>200</CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <div style={{ padding: 25, backgroundColor: colors.lightBlue }}>
                        <PackageCard />
                    </div>

                </TableContainer>
            </Paper>
        </>
    )
}

export default Packages
