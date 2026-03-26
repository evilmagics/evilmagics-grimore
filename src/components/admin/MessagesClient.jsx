"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MessagesClient({ initialMessages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const itemsPerPage = 10;

  const filteredMessages = useMemo(() => {
    return initialMessages.filter(msg => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        (msg.sender_email || "").toLowerCase().includes(searchLower) ||
        (msg.sender_name || "").toLowerCase().includes(searchLower) ||
        (msg.subject || "").toLowerCase().includes(searchLower) ||
        (msg.content || "").toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "read" && msg.is_read) ||
        (statusFilter === "unread" && !msg.is_read);

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return dateSort === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [initialMessages, searchQuery, statusFilter, dateSort]);

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage) || 1;
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateSort]);

  return (
    <>
      <Card>
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-sm font-medium">All Messages</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Search sender, name, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[250px] h-8 text-xs"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 px-2 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="h-8 px-2 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {paginatedMessages.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] px-4">Status</TableHead>
                    <TableHead className="w-[180px]">Sender</TableHead>
                    <TableHead className="w-[120px]">Name</TableHead>
                    <TableHead>Subject / Message</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                    <TableHead className="w-[60px] text-center">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMessages.map((msg) => (
                    <TableRow key={msg.id} className={msg.is_read ? "opacity-60" : ""}>
                      <TableCell className="px-4">
                        {msg.is_read ? (
                          <Badge variant="outline" className="text-[10px]">Read</Badge>
                        ) : (
                          <Badge className="text-[10px]">New</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {msg.sender_email}
                      </TableCell>
                      <TableCell className="text-sm">
                        {msg.sender_name ? (
                          <span className="text-foreground">{msg.sender_name}</span>
                        ) : (
                          <span className="text-muted-foreground/50 italic text-xs">—</span>
                        )}
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
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-7 w-7"
                          onClick={() => setSelectedMessage(msg)}
                          title="View full message"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="sr-only">View detail</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
                <div className="text-xs text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredMessages.length)} of {filteredMessages.length} messages
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-muted-foreground font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No signals match your current filters.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Modal — Issue #27 */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => { if (!open) setSelectedMessage(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Signal Detail
            </DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4 text-sm">
              {/* Meta info */}
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 rounded-lg bg-muted/30 p-3 border border-border/50">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">From</span>
                <span className="text-foreground break-all">{selectedMessage.sender_email}</span>

                {selectedMessage.sender_name && (
                  <>
                    <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Name</span>
                    <span className="text-foreground">{selectedMessage.sender_name}</span>
                  </>
                )}

                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Subject</span>
                <span className="text-foreground">{selectedMessage.subject || <em className="text-muted-foreground">(No Subject)</em>}</span>

                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Date</span>
                <span className="text-muted-foreground">
                  {new Date(selectedMessage.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">Status</span>
                <span>
                  {selectedMessage.is_read ? (
                    <Badge variant="outline" className="text-[10px]">Read</Badge>
                  ) : (
                    <Badge className="text-[10px]">New</Badge>
                  )}
                </span>
              </div>

              {/* Full message */}
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">Message</p>
                <div className="rounded-lg bg-muted/20 border border-border/50 p-4 text-sm leading-relaxed whitespace-pre-wrap break-words max-h-[320px] overflow-y-auto">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
          )}

          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
