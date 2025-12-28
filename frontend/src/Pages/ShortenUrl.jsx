import React, { useState } from "react";
import {
  Container,
  TextInput,
  Stack,
  Button,
  Text,
  CopyButton,
  Group,
  Paper,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import Service from "../utils/http";

const service = new Service();

export default function ShortenUrl() {
  const [input, setInput] = useState({
    originalUrl: "",
    expiresAt: "",
    title: "",
    customUrl: "", // ✅ FIXED
  });

  const [response, setResponse] = useState(null);

  async function generateShortUrl() {
    try {
      const data = await service.post("s", input);
      setResponse(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleGenerateNewUrl() {
    setInput({
      originalUrl: "",
      expiresAt: "",
      title: "",
      customUrl: "",
    });
    setResponse(null);
  }

  const shortLink = response?.shortUrl;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Generate new */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          zIndex: 2,
        }}
      >
        <Button
          variant="outline"
          onClick={handleGenerateNewUrl}
          rightSection={<IconRefresh size={18} />}
        >
          Generate New URL
        </Button>
      </div>

      <Container size="sm">
        <Paper
          shadow="xl"
          radius={20}
          p="xl"
          style={{
            minWidth: 400,
            maxWidth: 500,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.15)",
          }}
        >
          <Text
            size="40px"
            fw={700}
            align="center"
            mb="md"
            style={{ color: "#222" }}
          >
            Shorten Your URL
          </Text>

          {response ? (
            <Stack align="center" gap="md">
              <Text size="xl" fw={700}>
                Generated Short URL
              </Text>

              <Group>
                <TextInput
                  value={shortLink}
                  readOnly
                  style={{ width: 300 }}
                  onClick={() => window.open(shortLink, "_blank")} // ✅ CLICKABLE
                />

                
              </Group>

              <Button
                    color="green"
                    variant="filled"
                    onClick={() => window.open(shortLink, "_blank")}
                    >
                    Open Short URL
                </Button>


            </Stack>
          ) : (
            <Stack gap="md">
              <TextInput
                required
                label="Original URL"
                placeholder="Paste original URL"
                value={input.originalUrl}
                onChange={(e) =>
                  setInput({ ...input, originalUrl: e.target.value })
                }
              />

              <TextInput
                label="Customize your link (Optional)"
                placeholder="custom-name"
                value={input.customUrl}
                onChange={(e) =>
                  setInput({ ...input, customUrl: e.target.value })
                }
              />

              <TextInput
                label="Title (Optional)"
                placeholder="Title of URL"
                value={input.title}
                onChange={(e) =>
                  setInput({ ...input, title: e.target.value })
                }
              />

              <TextInput
                type="date"
                label="Date of Expiry (Optional)"
                value={input.expiresAt}
                onChange={(e) =>
                  setInput({ ...input, expiresAt: e.target.value })
                }
              />

              <Button
                disabled={input.originalUrl.length < 5}
                onClick={generateShortUrl}
              >
                Generate & Shorten URL
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </div>
  );
}
