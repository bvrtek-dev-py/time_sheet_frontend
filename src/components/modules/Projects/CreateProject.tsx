import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../../../api/api.ts";

interface CreateProjectProps {
  opened: boolean;
  close: () => void;
}

export default function CreateProject({ opened, close }: CreateProjectProps) {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () =>
      createProject({
        name: form.values.name,
        description: form.values.description,
      }),
    onSuccess: () => {
      navigate("/projects");
    },
  });

  return (
    <Modal opened={opened} onClose={close} title="Add project" centered>
      <form onSubmit={form.onSubmit(() => mutate())}>
        <TextInput
          label="Name"
          required
          placeholder="Your project name"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Email"
          required
          placeholder="Your project description"
          {...form.getInputProps("description")}
        />
        <Button
          mt="md"
          type="submit"
          variant="primary"
          style={{ width: "100%" }}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}
