const sendMessage = async (userId: string, message: string) => {

    const url = 'https://api.line.me/v2/bot/message/push';
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const data = {
        to: userId,
        messages: [{ type: 'text', text: message }],
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${channelAccessToken}`,
        },
        body: JSON.stringify(data),
    });
}

export const lineService = {
    sendMessage
}