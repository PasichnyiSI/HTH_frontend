import React from "react";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const ShippingPaymentPage = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Доставка та оплата</Typography>

            {/* Доставка */}
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Способи доставки</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="🚚 Нова Пошта" secondary="Термін доставки: 1-3 дні. Вартість згідно тарифів перевізника." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="📦 Кур'єрська доставка" secondary="Доступна в Києві. Вартість: 100 грн. Безкоштовно при замовленні від 2000 грн." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="🏪 Самовивіз" secondary="Можливий за адресою: вул. Незалежності, 12, Київ. Графік роботи: Пн-Пт 9:00 - 18:00." />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            {/* Оплата */}
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Способи оплати</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="💳 Оплата карткою онлайн" secondary="Visa / MasterCard через захищений платіжний шлюз." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="💵 Готівкою при отриманні" secondary="Оплата готівкою кур'єру або у відділенні Нової Пошти." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="🏦 Банківський переказ" secondary="Після оформлення замовлення ми надішлемо реквізити для оплати." />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            {/* Додаткова інформація */}
            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Додаткова інформація</Typography>
                    <Typography variant="body1">
                        ✅ Всі замовлення обробляються в робочі дні з 9:00 до 18:00. <br />
                        ✅ При отриманні товару перевіряйте його цілісність та комплектацію. <br />
                        ✅ Якщо у вас виникли питання, звертайтеся за телефоном: +380 44 123 4567 або email: support@sleepstore.com. <br />
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ShippingPaymentPage;
