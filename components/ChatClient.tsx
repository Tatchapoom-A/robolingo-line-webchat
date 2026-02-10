'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import MessageList from './messageList'
import { ChatMessage } from '@/lib/message'
import { Alert, Box, Button, Container, TextareaAutosize, Typography } from '@mui/material'

type ChatClientProps = {
    initialMessages: ChatMessage[]
}

export default function ChatClient({ initialMessages }: ChatClientProps) {
    const [error, setError] = useState<string | null>(null)
    const [sending, setSending] = useState<boolean>(false)
    const [placeHolder, setPlaceHolder] = useState<string>("Aa")
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialMessages);

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await axios.get('/api/message')
            setChatHistory(res.data.messages as ChatMessage[])
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    const handleSend = async () => {
        setError(null);
        setSending(true);
        try {
            await axios.post('/api/send-message', {
                userId,
                message,
            })
            setMessage('');
        } catch (err: any) {
            const msg =
                err.response?.data?.error?.message ||
                'Something went wrong. Please try again.'

            setError(msg)
        } finally {
            setSending(false);
            setMessage('');
        }
    }

    return (

        <Box className="background">
            <Typography
                id="header-label"
                variant="h3"
                sx={{
                    color: "white",
                    paddingTop: 5
                }}
            >
                Web Chat
            </Typography>
            <Container
                sx={{
                    width: "300px",
                    backgroundColor: "white",
                    borderRadius: 1,
                }}
                disableGutters={true}
            >
                <MessageList chatHistory={chatHistory} />
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    padding: 0.5,
                }}>
                    <TextareaAutosize
                        id="message-input"
                        maxRows={4}
                        placeholder={placeHolder}
                        style={{
                            borderRadius: 2, height: 50, width: 300, backgroundColor: "GrayText", marginRight: 3
                        }}
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value)
                        }}
                        onFocus={() => {
                            setPlaceHolder("พิมพ์ข้อความ");
                        }}
                        onBlur={() => {
                            setPlaceHolder("Aa");
                        }}
                    />
                    <Button
                        id="send-buton"
                        variant="contained"
                        sx={{ maxHeight: 50 }}
                        onClick={async () => {
                            handleSend();
                        }}
                        disabled={message?.length === 0 && sending === false}
                    >
                        Send
                    </Button>
                </Box>
                {error && (
                    <Alert id="error-alert" severity="error">{error}</Alert>
                )}

            </Container>
        </Box>
    );
}
