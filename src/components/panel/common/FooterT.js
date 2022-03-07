import React from 'react'
import { Container, Grid,Typography } from '@mui/material'
export default function Footer() {
    return (
        <Container sx={
            {
                
                position: "absolute",
                bottom: "0px",
                width: "100%"
                
            }
        }>
            <Grid container >
                <Grid item sx={12}>
                    <Typography variant="overline">
                        The Accountant &copy; 2022 All Rights Reserved
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}


