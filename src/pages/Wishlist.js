import React from "react";
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";

const Wishlist = () => {

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Список бажаного</Typography>
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} key="">
                        <Card>
                            <CardMedia component="img" height="140" image="" alt="" />
                            <CardContent>
                                <Typography variant="h6"></Typography>
                                <Typography color="textSecondary"> грн</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                <Typography>Ваш список бажаного порожній.</Typography>
            </Grid>
        </Container>
    );
};

export default Wishlist;
