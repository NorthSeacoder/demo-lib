import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { MessageProps } from "./constant";

interface PropTypes extends MessageProps {
    dismiss: () => void;
}

export default function Message(props: PropTypes) {
    const { content, type = "success", dismiss } = props;

    const imageSrc = useMemo(
        () => (type === "error" ? "/error-toast.png" : "/success-toast.png"),
        [type],
    );

    useEffect(() => {
        const timer = setTimeout(dismiss, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <div
            className="py-4 px-6 mb-4 rounded-lg flex items-center"
            style={{ background: "rgba(15, 23, 42, 0.5)" }}
        >
            <div
                className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full",
                    type === "error" && "bg-red-500",
                    type === "success" && "bg-emerald-500",
                )}
            >
                <img
                    src={imageSrc}
                    className="rounded-full cursor-pointer"
                    alt="avatar"
                    width={16}
                    height={16}
                />
            </div>
            <article className="ml-4 text-white text-sm">{content}</article>
        </div>
    );
}
