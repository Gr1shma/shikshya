import { ChatInterface } from "~/components/chat/chat-interface";

export default async function Home() {
    return (
        <div>
            <ChatInterface noteId="random" />
        </div>
    );
}
