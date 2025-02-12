import { useState, useEffect, useContext } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button, Avatar, Grid } from "@mui/material";

function Dashboard() {

    const [res, setRes] = useState("")
    const api = useAxios();
    const token = localStorage.getItem("authTokens")
    const { authTokens, user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (token){
      const decode = jwtDecode(token)
      var user_id = decode.user_id
      var username = decode.username
      var full_name = decode.full_name
      var image = decode.image

    }

    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await api.get("/users/test/")
          setRes(response.data.response)
        } catch (error) {
          console.log(error);
          setRes("Something went wrong")
        }
      }
      fetchData()
    }, [])
  
    useEffect(() => {
      if (authTokens) {
        const fetchData = async () => {
          try {
            const response = await api.get("/users/test/");
            setRes(response.data.response);
          } catch (error) {
            console.log(error);
            setRes("Something went wrong");
          }
        };
        fetchData();
      }
    }, [authTokens]);


  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, p: 3, textAlign: "center" }}>
        <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
        <Typography variant="h5">{user.username}</Typography>
        <Typography color="textSecondary">{user.email}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Редагувати профіль</Button>
      </Card>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Історія замовлень</Typography>
            <Grid container spacing={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Замовлення #</Typography>
                    <Typography>Дата: </Typography>
                    <Typography>Сума:  грн</Typography>
                    <Button variant="outlined" sx={{ mt: 1 }}>Деталі</Button>
                  </CardContent>
                </Card>
            </Grid>
    </Container>
  );
}

export default Dashboard
