import { Mail } from "lucide-react";
import { fetchMessages } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead className="w-[200px]">Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-[150px]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id} className={msg.is_read ? "opacity-60" : ""}>
                    <TableCell>
                      {msg.is_read ? (
                        <Badge variant="outline" className="text-[10px]">Read</Badge>
                      ) : (
                        <Badge className="text-[10px]">New</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {msg.sender_email}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{msg.subject || "(No Subject)"}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {msg.content}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No signals detected. The channel is silent.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
