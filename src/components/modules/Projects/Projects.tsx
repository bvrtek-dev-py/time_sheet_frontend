import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  rem,
  ScrollArea,
  SegmentedControl,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { ProjectData } from "../../../api/api.types.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../api/api.ts";
import { useDisclosure } from "@mantine/hooks";
import CreateProject from "./CreateProject.tsx";

function filterData(data: ProjectData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.includes(query));
}

interface ComponentData {
  data: ProjectData[] | undefined;
}

function ProjectsTable({ data }: ComponentData) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);

    if (search === "") {
      return setSortedData(data);
    }

    if (data) {
      setSortedData(filterData(data, search));
    }
  };

  const rows = sortedData
    ? sortedData.map((row) => (
        <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>
            {row.description.length > 20
              ? row.description.substring(0, 20) + "..."
              : row.description}
          </Table.Td>
          <Table.Td>{row.owner.fullname}</Table.Td>
          <Table.Td>mock</Table.Td>
        </Table.Tr>
      ))
    : [];

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by name..."
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Owner</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        {rows.length > 0 ? (
          <Table.Tbody>{rows}</Table.Tbody>
        ) : (
          <Container mt="md">
            <Center>Nothing found</Center>
          </Container>
        )}
      </Table>
    </ScrollArea>
  );
}

export default function Projects() {
  const { data } = useQuery({
    queryFn: fetchProjects,
    queryKey: ["projects"],
  });

  const [projectTypes, setProjectTypes] = useState("projects");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CreateProject opened={opened} close={close} />
      <Flex justify="center">
        <Container size="md">
          <Flex>
            <Title>Projects</Title>
          </Flex>
          <Flex justify="space-between" mb="md" mt="md">
            <Flex justify="flex-start">
              <SegmentedControl
                value={projectTypes}
                onChange={setProjectTypes}
                data={[
                  { label: "All", value: "projects" },
                  { label: "Owned", value: "owned" },
                  { label: "Participated", value: "participated" },
                ]}
              />
            </Flex>
            <Flex justify="flex-end">
              <Button onClick={open} leftSection={<IconPlus />}>
                Add new project
              </Button>
            </Flex>
          </Flex>
          <ProjectsTable data={data} />
        </Container>
      </Flex>
    </>
  );
}
