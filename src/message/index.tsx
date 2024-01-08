import React, { useState } from "react";
import { MessageProps } from "./constant";
import Message from "./message";

interface MessageContextProps {
    showMessage: (param: MessageProps) => void;
}

const MessageContext = React.createContext<MessageContextProps>({
    showMessage: () => {},
});

export const useMessage = () => React.useContext(MessageContext);

export default function MessageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const showMessage = ({
        content,
        type = "success",
        key = Date.now(),
    }: MessageProps) => {
        const newMessage: MessageProps = { content, type, key };
        setMessages((prevMessages) => {
            if (prevMessages.some((item) => item.key === key)) {
                return [...prevMessages];
            }
            return [...prevMessages, newMessage];
        });
    };
    const dimiss = () => {
        setMessages((prevMessages) => prevMessages.slice(1));
    };

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            {messages?.length ? (
                <div className="fixed bottom-[10vh] left-1/2 -translate-x-1/2 z-50">
                    {messages.map(({ content, type, key }: MessageProps) => (
                        <Message key={key} content={content} type={type} dismiss={dimiss} />
                    ))}
                </div>
            ) : null}
        </MessageContext.Provider>
    );
}
