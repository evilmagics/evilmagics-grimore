import { Mail } from "lucide-react";
import { fetchMessages } from "@/lib/queries";
import { Separator } from "@/components/ui/separator";
import { MessagesClient } from "@/components/admin/MessagesClient";

export default async function SignalReceiverPage() {
  const messages = await fetchMessages();
  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          Signal Receiver
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Incoming Transmissions — {messages.length} total, {unread} unread
        </p>
      </header>

      <Separator />

      <MessagesClient initialMessages={messages} />
    </div>
  );
}
