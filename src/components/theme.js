import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4c829b", // Основний колір шапки та кнопок
    },
    secondary: {
      main: "#f4a261", // Акцентний колір
    },
    background: {
      default: "#f4f4f4", // Фон сайту
      paper: "#ffffff", // Фон контейнерів
    },
    text: {
      primary: "#333", // Основний текст
      secondary: "#555", // Додатковий текст
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem", color: "#333" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4c829b",
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#3a6175",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "lg",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginTop: "20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
