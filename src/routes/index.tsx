import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserPlus,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | LanternHR" },
      {
        name: "description",
        content: "Attendance-first workforce and HR operations dashboard for LanternHR.",
      },
      { property: "og:title", content: "Dashboard | LanternHR" },
      {
        property: "og:description",
        content: "A clear view of workforce attendance, HR actions, and employee expenses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

type Tone = "cyan" | "lime" | "coral" | "amber" | "violet";
type AttendanceStatus = "Present" | "Late" | "Absent" | "On Leave";

const navItems: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Employees", icon: Users },
  { label: "Attendance", icon: Clock3 },
  { label: "Leave Management", icon: CalendarDays },
  { label: "Bills & Expenses", icon: WalletCards },
  { label: "Reports", icon: Activity },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

const attendanceRows: {
  name: string;
  initials: string;
  id: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: AttendanceStatus;
  tone: Tone;
}[] = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    id: "EMP-0042",
    department: "Engineering",
    checkIn: "9:12 AM",
    checkOut: "—",
    hours: "5h 48m",
    status: "Present",
    tone: "cyan",
  },
  {
    name: "Priya Mehta",
    initials: "PM",
    id: "EMP-0107",
    department: "Sales",
    checkIn: "9:41 AM",
    checkOut: "—",
    hours: "5h 19m",
    status: "Late",
    tone: "coral",
  },
  {
    name: "Arjun Kapoor",
    initials: "AK",
    id: "EMP-0063",
    department: "Marketing",
    checkIn: "—",
    checkOut: "—",
    hours: "0h 00m",
    status: "Absent",
    tone: "amber",
  },
  {
    name: "Neha Verma",
    initials: "NV",
    id: "EMP-0128",
    department: "Finance",
    checkIn: "9:02 AM",
    checkOut: "—",
    hours: "5h 58m",
    status: "Present",
    tone: "violet",
  },
  {
    name: "Disha Kulkarni",
    initials: "DK",
    id: "EMP-0091",
    department: "Operations",
    checkIn: "—",
    checkOut: "—",
    hours: "—",
    status: "On Leave",
    tone: "cyan",
  },
  {
    name: "Vikram Joshi",
    initials: "VJ",
    id: "EMP-0055",
    department: "Human Resources",
    checkIn: "8:54 AM",
    checkOut: "—",
    hours: "6h 06m",
    status: "Present",
    tone: "lime",
  },
];

const attendanceData = [
  { day: "Mon", present: 42, absent: 2, leave: 4 },
  { day: "Tue", present: 44, absent: 1, leave: 3 },
  { day: "Wed", present: 41, absent: 3, leave: 4 },
  { day: "Thu", present: 45, absent: 1, leave: 2 },
  { day: "Fri", present: 43, absent: 2, leave: 3 },
  { day: "Sat", present: 38, absent: 2, leave: 8 },
  { day: "Sun", present: 35, absent: 3, leave: 10 },
];

const expenseData = [
  { name: "Travel", value: 78400, tone: "cyan" },
  { name: "Food", value: 42500, tone: "amber" },
  { name: "Office Supplies", value: 52100, tone: "coral" },
  { name: "Transportation", value: 33600, tone: "lime" },
  { name: "Client Meetings", value: 41900, tone: "violet" },
  { name: "Other", value: 0, tone: "slate" },
];

const activityItems = [
  { initials: "RS", tone: "cyan" as Tone, text: "Rahul Sharma checked in at 9:12 AM", time: "Today · 9:12 AM" },
  { initials: "PM", tone: "coral" as Tone, text: "Priya Mehta submitted a travel bill of ₹3,450", time: "Today · 10:48 AM" },
  { initials: "AK", tone: "amber" as Tone, text: "Arjun Kapoor's leave request was approved", time: "Today · 11:20 AM" },
  { initials: "NV", tone: "violet" as Tone, text: "Neha Verma submitted an attendance correction", time: "Today · 12:05 PM" },
];

const toneClass = (tone: Tone) => `hr-tone-${tone}`;

function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [range, setRange] = useState("This Week");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredRows = useMemo(() => {
    const search = employeeSearch.trim().toLowerCase();
    return attendanceRows.filter((row) => {
      const matchesSearch = !search || `${row.name} ${row.id}`.toLowerCase().includes(search);
      const matchesDepartment = department === "all" || row.department === department;
      const matchesStatus = status === "all" || row.status === status;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [department, employeeSearch, status]);

  return (
    <div className="hr-app min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="lg:ml-64">
        <header className="hr-header sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 lg:hidden"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu />
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="hr-mark hr-tone-coral hidden sm:grid" aria-hidden="true">
                  <Sparkles className="size-4" />
                </span>
                <h1 className="font-display truncate text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  Dashboard
                </h1>
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                Overview of your workforce and daily operations
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <label className="hr-search hidden md:flex">
                <Search className="size-4 text-muted-foreground" />
                <Input
                  aria-label="Search employees and bills"
                  placeholder="Search employees, bills…"
                  className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                />
              </label>
              <Button variant="outline" size="icon" className="relative min-h-11 min-w-11" aria-label="Notifications">
                <Bell className="size-4" />
                <span className="hr-notification-dot" aria-label="Unread notifications" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="size-10 rounded-xl">
                  <AvatarFallback className="hr-avatar hr-tone-coral">AV</AvatarFallback>
                </Avatar>
                <div className="hidden leading-tight sm:block">
                  <p className="text-sm font-semibold text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">HR Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <SummaryCards />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <AttendanceOverview range={range} onRangeChange={setRange} />
            <PendingActions />
          </section>

          <AttendanceTable
            rows={filteredRows}
            employeeSearch={employeeSearch}
            onEmployeeSearchChange={setEmployeeSearch}
            department={department}
            onDepartmentChange={setDepartment}
            status={status}
            onStatusChange={setStatus}
          />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <ExpenseOverview />
            <RecentActivity />
            <QuickActions />
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="hr-footer-mark hr-tone-coral" aria-hidden="true"><Sparkles className="size-3" /></span>
              LanternHR · Meridian Workforce Ltd.
            </p>
            <p>© 2026 · System v1.0.4</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          aria-label="Close navigation overlay"
          onClick={onClose}
        />
      )}
      <aside className={`hr-sidebar fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border p-5 transition-transform duration-200 lg:z-20 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between gap-3 px-2 py-1">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hr-logo hr-tone-coral" aria-hidden="true"><Sparkles className="size-5" /></div>
            <div className="min-w-0 leading-tight">
              <p className="font-display truncate text-lg font-black tracking-tight text-sidebar-foreground">LanternHR</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/60">Ops Console</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-sidebar-foreground lg:hidden" aria-label="Close navigation" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="hr-hairline my-5" />
        <nav className="flex flex-col gap-1" aria-label="Primary navigation">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`hr-nav-item justify-start ${active ? "hr-nav-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
              >
                <Icon className="size-[17px] shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.label === "Notifications" && <span className="ml-auto hr-nav-count">3</span>}
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto">
          <div className="hr-hairline mb-4" />
          <div className="flex items-center gap-3 p-2">
            <Avatar className="size-10 rounded-xl">
              <AvatarFallback className="hr-avatar hr-tone-coral">AV</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">Admin</p>
              <p className="truncate text-xs text-sidebar-foreground/60">HR Administrator</p>
            </div>
          </div>
          <Button variant="ghost" className="hr-nav-item mt-1 w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground" aria-label="Log out placeholder">
            <LogOut className="size-[17px]" />
            <span>Log out</span>
          </Button>
        </div>
      </aside>
    </>
  );
}

function SummaryCards() {
  const cards: { label: string; value: string; helper: string; trend: string; icon: ComponentType<{ className?: string }>; tone: Tone }[] = [
    { label: "Total Employees", value: "48", helper: "Across 6 departments", trend: "+2 this month", icon: Users, tone: "cyan" },
    { label: "Present Today", value: "41", helper: "85.4% of workforce", trend: "On track", icon: Check, tone: "lime" },
    { label: "Absent Today", value: "3", helper: "2 need a follow-up", trend: "6.2% of workforce", icon: X, tone: "coral" },
    { label: "On Leave", value: "4", helper: "1 returns tomorrow", trend: "8.3% of workforce", icon: CalendarDays, tone: "amber" },
    { label: "Pending Bills", value: "7", helper: "Awaiting approval", trend: "Needs review", icon: WalletCards, tone: "coral" },
    { label: "Monthly Expenses", value: "₹2,48,500", helper: "Compared with ₹2,38,700", trend: "+4.1%", icon: CircleDollarSign, tone: "amber" },
  ];
  return (
    <section className="grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6" aria-label="Workforce summary">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="hr-card hr-metric-card">
            <div className="flex items-start justify-between gap-3">
              <div className={`hr-icon-box ${toneClass(card.tone)}`}><Icon className="size-[18px]" /></div>
              <Badge className={`hr-soft-badge ${toneClass(card.tone)}`}><span className="hr-mini-dot" />{card.trend}</Badge>
            </div>
            <p className="font-display mt-4 truncate text-[28px] font-black leading-none tracking-tight text-foreground">{card.value}</p>
            <p className="mt-2 truncate text-sm font-medium text-foreground">{card.label}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{card.helper}</p>
          </div>
        );
      })}
    </section>
  );
}

function AttendanceOverview({ range, onRangeChange }: { range: string; onRangeChange: (range: string) => void }) {
  return (
    <div className="hr-card min-w-0 xl:col-span-2">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="hr-section-index hr-tone-cyan">01</span>
            <h2 className="font-display text-lg font-bold tracking-tight text-foreground">Attendance Overview</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <Legend tone="lime" label="Present" />
            <Legend tone="coral" label="Absent" />
            <Legend tone="amber" label="Leave" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <div className="hr-segmented" role="group" aria-label="Attendance range">
            {["This Week", "This Month", "Custom"].map((item) => (
              <Button key={item} variant="ghost" size="sm" className={range === item ? "hr-segment-active" : ""} onClick={() => onRangeChange(item)}>
                {item}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarDays className="size-3.5" />
            <span className="hidden sm:inline">02–08 Jun 2026</span>
            <span className="sm:hidden">Jun 02–08</span>
          </Button>
        </div>
      </div>
      <div className="mt-6 h-60 w-full" aria-label={`${range} attendance chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attendanceData} barGap={5} margin={{ top: 6, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--hr-line-soft)" strokeDasharray="3 3" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--hr-muted)", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--hr-muted)", fontSize: 10 }} />
            <Tooltip cursor={{ fill: "var(--hr-surface-muted)" }} />
            <Bar dataKey="present" stackId="a" fill="var(--hr-lime)" radius={[0, 0, 3, 3]} />
            <Bar dataKey="leave" stackId="a" fill="var(--hr-amber)" />
            <Bar dataKey="absent" stackId="a" fill="var(--hr-coral)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Legend({ tone, label }: { tone: Tone; label: string }) {
  return <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`hr-dot ${toneClass(tone)}`} />{label}</span>;
}

function PendingActions() {
  const actions = [
    { title: "Leave Requests Pending", helper: "4 awaiting decision", count: "4", tone: "amber" as Tone, icon: CalendarDays },
    { title: "Bills Awaiting Approval", helper: "7 in the queue", count: "7", tone: "coral" as Tone, icon: WalletCards },
    { title: "Attendance Corrections", helper: "2 flagged for edit", count: "2", tone: "cyan" as Tone, icon: Clock3 },
    { title: "Employee Documents", helper: "3 pending upload", count: "3", tone: "violet" as Tone, icon: FileCheck2 },
  ];
  return (
    <div className="hr-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="hr-section-index hr-tone-amber">02</span>
          <h2 className="font-display text-lg font-bold tracking-tight text-foreground">Pending Actions</h2>
        </div>
        <Badge className="hr-soft-badge hr-tone-amber"><span className="hr-mini-dot" />16 open</Badge>
      </div>
      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.title} className="hr-action-row">
              <div className={`hr-icon-box ${toneClass(action.tone)}`}><Icon className="size-[17px]" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{action.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{action.helper}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" aria-label={`Review ${action.title}`}>Review</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AttendanceTable({
  rows,
  employeeSearch,
  onEmployeeSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
}: {
  rows: typeof attendanceRows;
  employeeSearch: string;
  onEmployeeSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}) {
  return (
    <section className="hr-card p-0">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="hr-section-index hr-tone-coral">03</span>
          <h2 className="font-display text-lg font-bold tracking-tight text-foreground">Today's Attendance</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="hr-table-search">
            <Search className="size-3.5 text-muted-foreground" />
            <Input value={employeeSearch} onChange={(event) => onEmployeeSearchChange(event.target.value)} aria-label="Search attendance" placeholder="Search…" className="h-8 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0" />
          </label>
          <Select value={department} onValueChange={onDepartmentChange}>
            <SelectTrigger className="h-9 w-[150px] text-xs"><SelectValue placeholder="Department: All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Department: All</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 w-[125px] text-xs"><SelectValue placeholder="Status: All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">View All <ArrowUpRight className="size-3.5" /></Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="hr-table min-w-[760px]">
          <thead><tr><th>Employee</th><th>Employee ID</th><th>Department</th><th>Check In</th><th>Check Out</th><th>Working Hours</th><th>Status</th><th><span className="sr-only">More</span></th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td><div className="flex items-center gap-3"><Avatar className="size-9 rounded-xl"><AvatarFallback className={`hr-avatar ${toneClass(row.tone)}`}>{row.initials}</AvatarFallback></Avatar><span className="font-medium text-foreground">{row.name}</span></div></td>
                <td className="font-mono text-xs text-muted-foreground">{row.id}</td>
                <td>{row.department}</td>
                <td>{row.checkIn}</td>
                <td>{row.checkOut}</td>
                <td>{row.hours}</td>
                <td><StatusBadge status={row.status} /></td>
                <td><Button variant="ghost" size="icon" className="min-h-9 min-w-9" aria-label={`More options for ${row.name}`}><MoreHorizontal className="size-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="px-5 py-8 text-center text-sm text-muted-foreground">No attendance records match these filters.</p>}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const tone: Record<AttendanceStatus, Tone> = { Present: "lime", Late: "amber", Absent: "coral", "On Leave": "violet" };
  return <Badge className={`hr-status-badge ${toneClass(tone[status])}`}><span className="hr-mini-dot" />{status}</Badge>;
}

function ExpenseOverview() {
  return (
    <div className="hr-card min-w-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2"><span className="hr-section-index hr-tone-violet">04</span><h2 className="font-display text-lg font-bold tracking-tight text-foreground">Expense Overview</h2></div>
        <Button variant="ghost" size="icon" className="min-h-9 min-w-9" aria-label="Expense overview options"><SlidersHorizontal className="size-4" /></Button>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <ExpenseStat label="This Month" value="₹2,48,500" tone="cyan" />
        <ExpenseStat label="Approved" value="₹1,84,200" tone="lime" />
        <ExpenseStat label="Pending" value="₹47,300" tone="amber" />
        <ExpenseStat label="Rejected" value="₹17,000" tone="coral" />
      </div>
      <div className="mt-5 h-48 w-full" aria-label="Expenses by category chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenseData} layout="vertical" margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="var(--hr-line-soft)" strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={98} tick={{ fill: "var(--hr-muted)", fontSize: 10 }} />
            <Tooltip cursor={{ fill: "var(--hr-surface-muted)" }} formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
              {expenseData.map((item) => <Cell key={item.name} fill={`var(--hr-${item.tone})`} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ExpenseStat({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  return <div className={`hr-expense-stat ${toneClass(tone)}`}><p className="text-xs text-muted-foreground">{label}</p><p className="font-display mt-1 truncate text-lg font-black tracking-tight text-foreground">{value}</p></div>;
}

function RecentActivity() {
  return (
    <div className="hr-card min-w-0">
      <div className="flex items-center gap-2"><span className="hr-section-index hr-tone-cyan">05</span><h2 className="font-display text-lg font-bold tracking-tight text-foreground">Recent Activity</h2></div>
      <div className="mt-5 space-y-4">
        {activityItems.map((item, index) => (
          <div key={item.text} className="flex gap-3">
            <Avatar className="size-9 shrink-0 rounded-xl"><AvatarFallback className={`hr-avatar ${toneClass(item.tone)}`}>{item.initials}</AvatarFallback></Avatar>
            <div className={`min-w-0 flex-1 ${index < activityItems.length - 1 ? "border-b border-border pb-4" : ""}`}>
              <p className="text-sm leading-5 text-muted-foreground">{item.text}</p>
              <p className="mt-1 text-xs text-muted-foreground/75">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "Add Employee", helper: "New hire onboarding", icon: UserPlus, tone: "coral" as Tone },
    { label: "Mark Attendance", helper: "Log today's presence", icon: Clock3, tone: "cyan" as Tone },
    { label: "Review Bills", helper: "7 awaiting approval", icon: WalletCards, tone: "amber" as Tone },
    { label: "Review Leave", helper: "4 requests pending", icon: CalendarDays, tone: "lime" as Tone },
  ];
  return (
    <div className="hr-card min-w-0">
      <div className="flex items-center gap-2"><span className="hr-section-index hr-tone-coral">06</span><h2 className="font-display text-lg font-bold tracking-tight text-foreground">Quick Actions</h2></div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return <Button key={action.label} variant="outline" className={`hr-quick-action ${toneClass(action.tone)}`}><Icon className="size-5" /><span className="min-w-0 text-left"><span className="block truncate text-sm font-semibold text-foreground">{action.label}</span><span className="mt-1 block truncate text-[11px] font-normal text-muted-foreground">{action.helper}</span></span></Button>;
        })}
      </div>
    </div>
  );
}