import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const ComparisonPage = () => {

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Порівняння товарів</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Зображення</TableCell>
                                <TableCell>Назва</TableCell>
                                <TableCell>Ціна</TableCell>
                                <TableCell>Рейтинг</TableCell>
                                <TableCell>Категорія</TableCell>
                                <TableCell>Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow key="">
                                    <TableCell>
                                        <img src="" alt="" width="80" />
                                    </TableCell>
                                    <TableCell>item.name</TableCell>
                                    <TableCell>item.price грн</TableCell>
                                    <TableCell>item.rating ★</TableCell>
                                    <TableCell>item.category</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" >Видалити</Button>
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography sx={{ textAlign: "center", mt: 2 }}>Немає товарів для порівняння.</Typography>
        </Container>
    );
};

export default ComparisonPage;
