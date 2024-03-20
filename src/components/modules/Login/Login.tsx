import { useState } from "react";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./Login.module.css";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/api.ts";

export function Login() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </Center>
      </Text>
    </Tooltip>
  );

  const [, setOpened] = useState(false);

  const [, setAccessToken] = useLocalStorage({
    key: "access_token",
  });

  const [, setRefreshToken] = useLocalStorage({
    key: "refresh_token",
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => login(form.values.username, form.values.password),
    onSuccess: (response) => {
      setAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      navigate("/");
    },
  });

  return (
    <Flex justify="center">
      <Paper shadow="xs" p="xl" className={classes.loginContainer}>
        <Box>
          <Center>
            <Title order={2}>Login</Title>
          </Center>
        </Box>
        <Container mt="lg" size="lg">
          <form onSubmit={form.onSubmit(() => mutate())}>
            <TextInput
              rightSection={rightSection}
              label="Email"
              required
              placeholder="Your email"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              required
              placeholder="Your password"
              onFocus={() => setOpened(true)}
              onBlur={() => setOpened(false)}
              mt="md"
              {...form.getInputProps("password")}
            />
            <Button
              mt="md"
              type="submit"
              variant="primary"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </form>
          <Center>
            <Anchor href="/register" mt="md" underline="never">
              Haven't signed up yet?
            </Anchor>
          </Center>
        </Container>
      </Paper>
    </Flex>
  );
}
