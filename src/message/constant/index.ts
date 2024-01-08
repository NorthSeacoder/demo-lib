export type MessageType = "success" | "error";

export interface MessageProps {
    content: string;
    type?: MessageType;
    key?: string | number;
}
