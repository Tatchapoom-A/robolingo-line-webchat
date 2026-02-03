"use client"
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

interface MessageListProps {
    chatHistory: MessageData[];
}

export interface MessageData {
    id: number;
    text: string;
    sender: 'user' | 'other';
}

interface MessageProps {
    text: string;
    sender: 'user' | 'other';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
    let className = sender === 'user' ? 'right' : 'left';
    return(
        <Box className={`message-${className}`}>
            <Box className={`text-message-${className}`}>
                <Typography color='black'>{text}</Typography>
            </Box>
        </Box>
    )
};

const MessageList: React.FC<MessageListProps> = (prop) => {

    const [messages, setMessages] = useState<MessageData[]>(prop.chatHistory);

    return (
        <div className="message-list-container">
            {messages.map((message) => (
                <Message
                    key={message.id}
                    text={message.text}
                    sender={message.sender}
                />
            ))}
        </div>
    );
};

export default MessageList;
