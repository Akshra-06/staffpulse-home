# HR Hub

Build the homepage/dashboard for an internal Employee HR Management System.

IMPORTANT:

For this phase, do NOT build login, authentication, signup, password functionality, or role-based access.

The application should open directly to the homepage/dashboard.

This system will primarily be used for:

1. Employee attendance management

2. Employee information/HR management

3. Bill and expense management

The homepage should be designed primarily for an HR/Admin user.

## OVERALL DESIGN

Create a modern, professional HR management SaaS dashboard.

The design should feel like a real internal business application — clean, practical, polished, and easy to use.

Use:

- Light background

- White cards

- Professional typography

- Subtle borders

- Minimal shadows

- Rounded corners

- Clear icons

- Consistent spacing

- One professional accent color

- Responsive layout

Avoid excessive gradients, animations, bright colors, or decorative elements.

## SIDEBAR

Create a fixed left sidebar with the following navigation:

- Dashboard

- Employees

- Attendance

- Leave Management

- Bills & Expenses

- Reports

- Notifications

- Settings

At the bottom of the sidebar show:

Admin

HR Administrator

and a Logout option as a visual placeholder only.

Do not implement authentication or logout functionality yet.

The Dashboard menu item should be highlighted as the active page.

## TOP HEADER

Create a top header containing:

Left:

- Current page title: Dashboard

- Small subtitle: "Overview of your workforce and daily operations"

Right:

- Search icon / search field

- Notification bell with a small unread indicator

- Admin profile/avatar

- "HR Administrator"

## DASHBOARD SUMMARY CARDS

At the top of the dashboard, create summary cards for:

### Total Employees

Example: 48

### Present Today

Example: 41

### Absent Today

Example: 3

### On Leave

Example: 4

### Pending Bills

Example: 7

### Monthly Expenses

Example: ₹2,48,500

Each card should have:

- Relevant icon

- Large primary number

- Label

- Small supporting information

- Subtle visual indication of change/trend where appropriate

For example:

Present Today

41

85.4% of workforce

Do not make the cards excessively large.

## ATTENDANCE OVERVIEW

Create a large "Attendance Overview" section.

Include a chart showing employee attendance over the current week.

The chart should display:

- Present

- Absent

- Leave

Use a clean chart design.

Above the chart provide:

- This Week

- This Month

- Custom Range

as filter options.

Also include a date selector.

## TODAY'S ATTENDANCE

Below the overview, create a "Today's Attendance" section.

Show a professional table containing sample employees.

Columns:

- Employee

- Employee ID

- Department

- Check In

- Check Out

- Working Hours

- Status

Example statuses:

- Present

- Late

- Absent

- On Leave

Use status badges.

Include:

- Search

- Department filter

- Status filter

- View All button

Use realistic sample data.

## PENDING ACTIONS

Create a "Pending Actions" section.

Show cards or a compact list for:

- 4 Leave Requests Pending

- 7 Bills Awaiting Approval

- 2 Attendance Corrections

- 3 Employee Documents Pending

Each item should have:

- Icon

- Description

- Number

- "Review" action

These should visually communicate that the HR administrator has actions requiring attention.

## EXPENSE OVERVIEW

Create an "Expense Overview" section.

Show:

- Total expenses this month

- Approved expenses

- Pending expenses

- Rejected expenses

Add a clean chart showing expenses by category.

Categories:

- Travel

- Food

- Office Supplies

- Transportation

- Client Meetings

- Other

Use INR (₹) for all amounts.

## RECENT ACTIVITY

Create a "Recent Activity" timeline/list.

Example activities:

"Rahul Sharma checked in at 9:12 AM"

"Priya Mehta submitted a travel bill of ₹3,450"

"Arjun Kapoor's leave request was approved"

"Neha Verma submitted an attendance correction"

Each activity should show:

- Employee avatar

- Activity description

- Time/date

## QUICK ACTIONS

Add a small "Quick Actions" area.

Actions:

+ Add Employee

Mark Attendance

Review Bills

Review Leave Requests

These should look like buttons/cards and will later link to their respective modules.

For now, they can be non-functional or navigate to placeholder pages.

## DASHBOARD FOOTER

Keep the footer minimal.

Show:

- Company name placeholder

- Current year

- System version

## RESPONSIVE DESIGN

The dashboard must work well on:

- Desktop

- Laptop

- Tablet

- Mobile

On smaller screens:

- Collapse the sidebar

- Convert tables into horizontally scrollable sections or responsive cards

- Stack dashboard cards

- Keep important information visible without clutter

## SAMPLE DATA

Use realistic sample Indian employee names, departments, attendance records, and INR expense amounts.

Example departments:

- Human Resources

- Engineering

- Sales

- Marketing

- Finance

- Operations

The dashboard should look populated and realistic immediately after loading.

## IMPORTANT PRODUCT DIRECTION

This is NOT a generic accounting dashboard.

The primary focus of the application is EMPLOYEE MANAGEMENT and ATTENDANCE.

Bills and expenses are the secondary major module.

The homepage should therefore visually prioritize:

1. Workforce overview

2. Today's attendance

3. Pending HR actions

4. Expense/bill overview

5. Recent employee activity

Keep the dashboard information-dense but clean.

Do not add payroll, recruitment, performance management, CRM, inventory, or unrelated modules at this stage.

Build the homepage as a polished foundation that we can extend with the Employees, Attendance, Leave, and Bills modules in later prompts.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a831ead0-8dc2-41df-ad8f-7b8bf15cb339).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
