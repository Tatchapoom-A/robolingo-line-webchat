"use client"
import MessageList, { MessageData } from "@/components/messageList";
import Image from "next/image";
import Box from '@mui/material/Box';
import { Button, Container, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lineService } from "./api/send-message";
import { Formik, FormikProps } from "formik";

export default function Home() {
  // const formik = useRef<FormikProps<any>>(null);
  
  const [accessTokenInput, setAccessTokenInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [disableChat, setDisableChat] = useState(true);
  const [disableAccessToken, setDisableAccessToken] = useState(false);

  const [chatHistory, setChatHistory] = useState<MessageData[]>([
    { id: 1, text: 'Hi there!', sender: 'other' },
    { id: 2, text: 'Hii!', sender: 'user' },
    { id: 3, text: 'How are you?', sender: 'user' },
    { id: 4, text: 'Hi there!', sender: 'other' },
    { id: 5, text: 'Hii!', sender: 'user' },
    { id: 6, text: 'How are you?', sender: 'user' },
    { id: 7, text: 'How are you?', sender: 'user' },
    { id: 8, text: 'Hi there!', sender: 'other' },
    { id: 9, text: 'Hii!', sender: 'user' },
    { id: 0, text: 'How are youHow are you How are youHow are you?', sender: 'user' },
  ]);

  const saveAccessToken = (token: string) => {
    setAccessToken(token);
    setDisableChat(false);
    setDisableAccessToken(true);
  };

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //       queryKey: [`message-id-`],
  //       queryFn: () =>
  //           lineService.sendMessage("",""),
  //       retry: 3,
  //   });

  return (
    // <Formik
    //   innerRef={formik}
    //         initialValues={defaultEventTopic}
    //         validationSchema={SignupSchema}
    //         onSubmit={async (values, { setSubmitting }) => {
    //             values.name = values.name?.trim();
    //             await mutateAsync(values);
    //             setSubmitting(false);
    //         }}
    // >
      
    // </Formik>
    <Box className="background">
      <Typography
        variant="h3"
        sx={{
          color: "white",
          paddingTop: 5
        }}
      >
        Web Chat
      </Typography>

      <Box sx={{
        display: "flex",
        width: "300px",
        backgroundColor: "white",
        marginBottom: 2,
        borderRadius: 1,
        pointerEvents: `${disableAccessToken === true ? "none" : "visible"}`,
        opacity: `${disableAccessToken === true ? 0.5 : 1}`
      }}>
        <TextField
          id="filled-basic"
          sx={{ width: 300 }}
          label="Channel Access Token"
          variant="filled"
          onChange={(e: any) => {
            setAccessTokenInput(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            saveAccessToken(accessTokenInput);
          }}
        >
          Save
        </Button>
      </Box>

      <Container
        sx={{
          width: "300px",
          backgroundColor: "white",
          borderRadius: 1,
          pointerEvents: `${disableChat === true ? "none" : "visible"}`,
          opacity: `${disableChat === true ? 0.5 : 1}`
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
            maxRows={4}
            placeholder="Aa"

            style={{
              borderRadius: 2, height: 70, width: 300, backgroundColor: "gray", marginRight: 3
            }}
          />
          <Button
            variant="contained"
            sx={{ maxHeight: 50 }}
            onClick={() => {
              const result = lineService.sendMessage("","")
            }}
          >
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
