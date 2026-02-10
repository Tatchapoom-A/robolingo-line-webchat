import { ChatMessage } from '@/lib/message';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface MessageListProps {
    chatHistory: ChatMessage[];
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
                <Typography id="" color='black'>{text}</Typography>
            </Box>
        </Box>
    )
};

const MessageList: React.FC<MessageListProps> = (prop) => {
    return (
        <div id="message-list" className="message-list-container">
            {prop.chatHistory.map((message) => (
                <Message
                    key={message.createdAt}
                    text={message.text}
                    sender={message.sender}
                />
            ))}
        </div>
    );
};

export default MessageList;
