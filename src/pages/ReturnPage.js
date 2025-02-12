import React from "react";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const ReturnPolicyPage = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Повернення товару</Typography>

            {/* Умови повернення */}
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Умови повернення</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="📅 Термін повернення" secondary="Ви можете повернути товар протягом 14 днів з моменту отримання." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="📦 Стан товару" secondary="Товар має бути у новому стані, без пошкоджень, у заводському пакуванні з усіма аксесуарами." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="🔖 Документи" secondary="Необхідно надати чек або інший документ, що підтверджує покупку." />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            {/* Як повернути товар */}
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Як повернути товар?</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="🏪 В магазин" secondary="Ви можете повернути товар у нашому офісі за адресою: вул. Незалежності, 12, Київ." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="📬 Через Нову Пошту" secondary="Надішліть товар Новою Поштою за нашими реквізитами (доставка за рахунок клієнта)." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="✉ Повідомте нас" secondary="Перед відправкою зв'яжіться з нами за телефоном +380 44 123 4567 або email support@sleepstore.com." />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            {/* Повернення коштів */}
            <Card sx={{ mb: 4, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Повернення коштів</Typography>
                    <Typography variant="body1">
                        ✅ Гроші повертаються протягом 5-7 робочих днів після отримання та перевірки товару. <br />
                        ✅ Повернення здійснюється тим же способом, яким було здійснено оплату. <br />
                        ✅ Якщо товар має дефект, повернення коштів або обмін проводиться за наш рахунок. <br />
                    </Typography>
                </CardContent>
            </Card>

            {/* Додаткова інформація */}
            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Додаткова інформація</Typography>
                    <Typography variant="body1">
                        Якщо у вас виникли питання, зв’яжіться з нашою службою підтримки: <br />
                        📞 Телефон: +380 44 123 4567 <br />
                        ✉ Email: support@sleepstore.com <br />
                        🕘 Графік роботи: Пн-Пт 9:00 - 18:00 <br />
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ReturnPolicyPage;
