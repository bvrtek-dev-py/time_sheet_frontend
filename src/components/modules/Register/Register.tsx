import { useForm } from "@mantine/form";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/api.ts";
import classes from "./Register.module.css";

export default function Register() {
  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const [, setOpened] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () =>
      register({
        email: form.values.email,
        fullname: form.values.fullname,
        password: form.values.password,
        password_confirmation: form.values.password_confirmation,
      }),
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <Flex justify="center">
      <Paper shadow="xs" p="xl" className={classes.registerContainer}>
        <Box>
          <Center>
            <Title order={2}>Sign up</Title>
          </Center>
        </Box>
        <Container mt="lg" size="lg">
          <form onSubmit={form.onSubmit(() => mutate())}>
            <TextInput
              label="Fullname"
              required
              placeholder="Your fullname"
              {...form.getInputProps("fullname")}
            />
            <TextInput
              label="Email"
              required
              placeholder="Your email"
              {...form.getInputProps("email")}
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
            <PasswordInput
              label="Password confirmation"
              required
              placeholder="Password confirmation"
              onFocus={() => setOpened(true)}
              onBlur={() => setOpened(false)}
              mt="md"
              {...form.getInputProps("password_confirmation")}
            />
            <Button
              mt="md"
              type="submit"
              variant="primary"
              style={{ width: "100%" }}
            >
              Sign up
            </Button>
          </form>
          <Center>
            <Anchor href="/login" mt="md" underline="never">
              Already signed up?
            </Anchor>
          </Center>
        </Container>
      </Paper>
    </Flex>
  );
}
