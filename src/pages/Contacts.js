import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Grid } from "@mui/material";

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Відправлено:", formData);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Контакти</Typography>

            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Наші контакти</Typography>
                    <Typography variant="body1">
                        📍 Адреса: вул. Незалежності, 12, Київ, Україна <br />
                        📞 Телефон: +380 44 123 4567 <br />
                        ✉ Email: info@sleepstore.com <br />
                        🕘 Години роботи: Пн-Пт 9:00 - 18:00 <br />
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Напишіть нам</Typography>
            <Card sx={{ p: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Ваше ім'я" name="name" value={formData.name} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Повідомлення" name="message" multiline rows={4} value={formData.message} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>Відправити</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Наше розташування</Typography>
            <Card sx={{ p: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <iframe
                        title="Google Map"
                        width="100%"
                        height="300"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src="https://www.google.com/maps/embed/v1/place?q=Київ,+Україна&key=YOUR_GOOGLE_MAPS_API_KEY"
                        allowFullScreen
                    ></iframe>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ContactPage;
