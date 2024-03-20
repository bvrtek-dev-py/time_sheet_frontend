import { Button, Container, Text, Title } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container className={classes.wrapper} fluid>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Efficient{" "}
          <Text component="span" className={classes.highlight} inherit>
            Project Management
          </Text>{" "}
          Made Simple
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Take control of your projects effortlessly with our project
            management platform. Easily track project hours with timesheets,
            allowing you to both add your own projects and participate in others
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
          <Button
            className={classes.control}
            size="lg"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>
      </div>
    </Container>
  );
}
