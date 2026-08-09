---
name: saas-tenant-membership
description: >-
  Rules for SaaS multi-tenant membership provisioning. Use when designing or
  implementing tenant open, owner/admin assignment, or adding users to a tenant.
---

# SaaS Tenant Membership

## Default (unless product explicitly says otherwise)

1. **No invite links** for joining a tenant (no email token / public `/invite` accept).
2. **Platform admin** opens a tenant and assigns an **already-registered** user as `owner`.
3. **Platform admin only** adds or promotes tenant `owner` / `admin` (via `/platform`).
4. **Tenant owner/admin** adds **ordinary members only** (`role=member`) via tenant permissions UI.
5. Users do **not** self-join tenants via signup or magic links.
6. Tenant-side UI must **never** grant `owner` / `admin`.

## Anti-patterns

- Invite / accept flows for missing owner emails
- Letting tenant admins promote themselves or others to admin/owner
- Public registration that auto-attaches a tenant without admin action
- Platform creating orphan tenants while waiting for invite acceptance

## If owner/admin email is not registered yet

Reject the assignment, or require creating the user first — do not fall back to invites.
