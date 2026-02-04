"use client"
import MessageList, { MessageData } from "@/components/messageList";
import Box from '@mui/material/Box';
import { Alert, Button, Container, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { messages } from "@/lib/message";

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)
  const [placeHolder, setPlaceHolder] = useState<string>("Aa")

  const [userIdInput, setUserIdInput] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [disableChat, setDisableChat] = useState(true);
  const [disableUserId, setDisableUserId] = useState(false);

  const [chatHistory, setChatHistory] = useState<MessageData[]>([]);


  const saveUserId = (userId: string) => {
    setUserId(userId);
    setDisableUserId(true);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      // if(userId !== ""){
      //   const res = await axios.get('/api/message',{params:{userId: userId}});
      //   console.log("res", res);
      //   setChatHistory(res.data.messages);
      // }

      const res = await axios.get('/api/message',{params:{userId: userId}});
        console.log("res", res);
        setChatHistory(res.data.messages);
    }, 2500);

    return () => clearInterval(interval);
  }, [userId]);


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

  useEffect(() => {
    const userIdIsReady = userId !== "";

    if (!!userIdIsReady) {
      setDisableChat(false);
    } else {
      setDisableChat(true);
    }
  }, [userId]);

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

      {/* <Box sx={{
        display: "flex",
        width: "300px",
        backgroundColor: "white",
        marginBottom: 2,
        borderRadius: 1,
        pointerEvents: `${disableUserId === true ? "none" : "visible"}`,
        opacity: `${disableUserId === true ? 0.5 : 1}`
      }}>
        <TextField
          id="userid-label"
          sx={{ width: 300 }}
          label="User ID"
          variant="filled"
          onChange={(e: any) => {
            setUserIdInput(e.target.value);
          }}
        />
        <Button
          id="save-button"
          variant="contained"
          onClick={() => {
            saveUserId(userIdInput);
          }}
          disabled={userIdInput?.length < 18}
        >
          Save
        </Button>
      </Box> */}

      <Container
        sx={{
          width: "300px",
          backgroundColor: "white",
          borderRadius: 1,
          // pointerEvents: `${disableChat === true ? "none" : "visible"}`,
          // opacity: `${disableChat === true ? 0.5 : 1}`
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
