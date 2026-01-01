import React, { useEffect, useState } from "react";
import Service from "../utils/http";
import { Avatar, Stack, Text } from "@mantine/core";

const service = new Service();

export default function Profile() {
  const [user, setUser] = useState({});

  async function getMyData() {
    try {
      let data = await service.get("user/me");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)", // 💗💙
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
        style={{
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          radius="100%"
          size="xl"
        />
        <Text size="xl" fw={600}>
          {user.name}
        </Text>
        <Text c="dimmed">{user.email}</Text>
        <Text size="md">
          <strong>User Id :</strong> {user._id}
        </Text>
        <Text size="md">
          <strong>Account Created :</strong>{" "}
          {user.createdAt &&
            new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </Stack>
    </div>
  );
}
