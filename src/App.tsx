import {createTheme, MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {HashRouter, Route, Routes} from "react-router-dom";
import Header from "./components/global/Header/Header.tsx";
import Home from "./components/modules/Home/Home.tsx";
import {Login} from "./components/modules/Login/Login.tsx";

const theme  = createTheme({});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <HashRouter>
      <QueryClientProvider client={client}>
        <MantineProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </MantineProvider>
      </QueryClientProvider>
    </HashRouter>
  );
}