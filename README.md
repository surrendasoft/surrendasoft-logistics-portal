# Romann Logistics MVP Portal

Clickable front-end demo for the Romann Logistics MVP Portal — a white-label logistics operations portal powered by SurrendaSoft.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React icons
- Local mock data (no backend / Firebase / Xero / TMS APIs)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Modules

| Section | Description |
|---------|-------------|
| Dashboard | Summary cards, recent jobs, sync status, compliance alerts, leads, tasks, activity |
| Leads | CRM pipeline with convert-to-customer / create-job actions |
| Customers | Customer records with related jobs and notes |
| Project Freight | Internal job management, tasks, documents, Xero references |
| General Freight | Third-party TMS integration demo (Transvirtual, Transmate, Internet Courier) |
| Consignments | External consignment references linked to General Freight |
| Suppliers / Agents | Supplier management with compliance and related jobs |
| Compliance | Document expiry tracking with upload placeholder |
| Documents | Central document registry |
| Settings | Business profile, users, branding, integration placeholders |

## Demo data

Includes Australian-style mock data: ABC Construction, BuildRight Pty Ltd, Sydney Developments, Coastal Transport, and job IDs `PF-2024-1048`, `GF-2024-2081`, `CON-2024-3310`.

## Notes

- Invoices and financial reports are handled in Xero (not in this portal).
- General Freight is not integrated with Xero in Phase 1.
- All integrations, uploads, and sync actions show toast confirmations — no real API calls.
