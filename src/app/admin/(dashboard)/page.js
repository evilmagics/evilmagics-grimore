import { Activity, Server } from "lucide-react";
import { fetchDashboardMetrics, checkDbHealth } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function NexusOverview() {
  const [metrics, dbHealth] = await Promise.all([
    fetchDashboardMetrics(),
    checkDbHealth(),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary" />
          Nexus Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          System Status:{" "}
          <Badge variant={dbHealth.status === "Online" ? "default" : "destructive"} className="ml-1">
            {dbHealth.status === "Online" ? "OPTIMAL" : "DEGRADED"}
          </Badge>
        </p>
      </header>

      <Separator />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Constructs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Projects in database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Echoes Preserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.photoCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Photos archived</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.unreadMessageCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Database Connection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              Supabase Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={dbHealth.status === "Online" ? "default" : "destructive"}>
                {dbHealth.status}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latency</span>
              <span>{dbHealth.latency} ms</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span>Supabase PostgreSQL</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">System Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">DB</Badge>
              <span className="text-muted-foreground">7 tables, RLS enabled, {metrics.projectCount + metrics.photoCount + metrics.unreadMessageCount}+ records</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">SEC</Badge>
              <span className="text-muted-foreground">24 RLS policies, is_admin() gatekeeper, auto-profile trigger</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">AUTH</Badge>
              <span className="text-muted-foreground">Email/Password via Supabase Auth, middleware session refresh</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
