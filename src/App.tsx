import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Header from "./components/global/Header/Header.tsx";
import Home from "./components/modules/Home/Home.tsx";
import { Login } from "./components/modules/Login/Login.tsx";
import Register from "./components/modules/Register/Register.tsx";
import Projects from "./components/modules/Projects/Projects.tsx";

const theme = createTheme({});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
        </Routes>
      </MantineProvider>
    </QueryClientProvider>
  );
}
