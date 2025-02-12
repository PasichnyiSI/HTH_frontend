import React from "react";
import { Container, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";

const AboutUs = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Про нас</Typography>
            
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Наша місія</Typography>
                    <Typography variant="body1">
                        Ми прагнемо забезпечити наших клієнтів якісними товарами для сну, створюючи комфорт та затишок у їхніх домівках.
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Наші цінності</Typography>
                    <Typography variant="body1">
                        ✅ Якість – ми пропонуємо тільки найкращі товари. <br />
                        ✅ Довіра – чесність та прозорість у відносинах із клієнтами. <br />
                        ✅ Комфорт – наша продукція допомагає створити ідеальне місце для відпочинку. <br />
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Наша команда</Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} src="/images/ceo.jpg" />
                        <Typography variant="h6">Олександр Іваненко</Typography>
                        <Typography color="textSecondary">CEO</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} src="/images/designer.jpg" />
                        <Typography variant="h6">Марія Коваленко</Typography>
                        <Typography color="textSecondary">Головний дизайнер</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ mt: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Контакти</Typography>
                    <Typography variant="body1">
                        📍 Адреса: вул. Незалежності, 12, Київ, Україна <br />
                        📞 Телефон: +380 44 123 4567 <br />
                        ✉ Email: info@sleepstore.com <br />
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AboutUs;
