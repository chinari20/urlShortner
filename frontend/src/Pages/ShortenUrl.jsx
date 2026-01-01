import React from 'react';
import { useState } from 'react';
import { Container, TextInput, Stack, Button, Text, CopyButton, Group, Paper, Center } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import Service from '../utils/http';

const service = new Service();

export default function ShortenUrl() {
    const [input, setInput] = useState({
        "originalUrl": "",
        "expiresAt": '',
        "title": '',
        "CustomUrl": ''
    });
    const [response, setResponse] = useState(null);

    async function generateShortUrl() {
        try {
            let data = await service.post("s", input);
            setResponse(data);
            console.data(data);
        } catch (err) {
            console.error(err);
        }
    }

    function handleGenerateNewUrl() {
        setInput({
            originalUrl: "",
            expiresAt: '',
            title: '',
            CustomUrl: ''
        });
        setResponse(null);
    }

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            {/* Top right "Generate New URL" button */}
            <div style={{
                position: "absolute",
                top: 24,
                right: 32,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 8
            }}>
                <Button
                    variant="outline"
                    onClick={handleGenerateNewUrl}
                    rightSection={<IconRefresh size={18} />}
                >
                    Generate New URL
                </Button>
            </div>
            <Container size="sm" style={{ zIndex: 1 }}>
                <Paper
                    shadow="xl"
                    radius={20}
                    p="xl"
                    style={{
                        minWidth: 400,
                        maxWidth: 500,
                        margin: "auto",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text
                        size="40px"
                        fw={700}
                        style={{
                            color: "#222",
                            marginBottom: "1rem",
                            textShadow: "rgba(0,0,0,0.69) 2px 2px 10px",
                            fontWeight: "lighter",
                        }}
                    >
                        Shorten Your URL Here
                    </Text>
                    {response ? (
                        <Stack align="center" gap="md">
                            <Text size="xl" fw={700} style={{ marginBottom: "1rem" }}>
                                Generated Short URL
                            </Text>
                            <Group>
                                <TextInput
                                    value={service.getBaseURL() + "/api/s/" + response.shortCode}
                                    readOnly
                                    style={{ width: 300 }}
                                />
                                <CopyButton value={service.getBaseURL() + "/api/s/" + response.shortCode}>
                                    {({ copied, copy }) => (
                                        <Button color={copied ? 'green' : 'blue'} onClick={copy}>
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    )}
                                </CopyButton>
                            </Group>
                        </Stack>
                    ) : (
                        <Stack gap="md" style={{ width: "100%" }}>
                            <TextInput
                                onChange={(e) => setInput({ ...input, originalUrl: e.target.value })}
                                required
                                label="Original URL"
                                placeholder="Paste original URL"
                                value={input.originalUrl}
                            />
                            <TextInput
                                onChange={(e) => setInput({ ...input, CustomUrl: e.target.value })}
                                label="Customize your link ( Optional )"
                                placeholder="Customize your link "
                                value={input.CustomUrl}
                            />
                            <TextInput
                                onChange={(e) => setInput({ ...input, title: e.target.value })}
                                label="Title ( Optional )"
                                placeholder="Title Of URL"
                                value={input.title}
                            />
                            <TextInput
                                onChange={(e) => setInput({ ...input, expiresAt: e.target.value })}
                                type='date'
                                label="Date of Expiry ( Optional )"
                                placeholder="Expiry Date"
                                value={input.expiresAt}
                            />
                            <Button disabled={input.originalUrl.length < 5} onClick={generateShortUrl}>
                                Generate And Shorten URL
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </Container>
        </div>
    );
}