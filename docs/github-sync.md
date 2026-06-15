# GitHub Auto-Sync

Whenever portfolio content is modified from the admin dashboard, this system automatically commits and pushes the changes to GitHub. This triggers Vercel to redeploy the site with the updated data files.

## How It Works

```
Admin Dashboard  →  PUT /api/data?key=<key>
                         │
                         ├─ Supabase (live data, all instances)
                         ├─ JSON file (local dev only)
                         └─ GitHub API → commit → push → Vercel redeploy
```

1. Admin saves content (Hero, Projects, Skills, etc.)
2. Data is written to Supabase for instant live updates
3. A background job commits the updated JSON file to GitHub
4. Vercel detects the push and automatically redeploys

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token with `repo` scope |
| `GIT_REPO_OWNER` | No (default: `saad-affan12`) | GitHub repository owner |
| `GIT_REPO_NAME` | No (default: `Saad-Affan-Portfolio`) | GitHub repository name |
| `GIT_BRANCH` | No (default: `main`) | Branch to commit to |

## Setting Up

### 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Select the `repo` scope (full control of private repositories)
4. Copy the generated token

### 2. Add to Environment

**Local development** — Add to `.env.local`:
```
GITHUB_TOKEN=ghp_your_token_here
GIT_REPO_OWNER=saad-affan12
GIT_REPO_NAME=Saad-Affan-Portfolio
GIT_BRANCH=main
```

**Vercel production** — Add in Vercel dashboard:
- Project Settings → Environment Variables
- Add all four variables

### 3. Verify

Open the admin dashboard at `/admin`. The **GitHub Sync** card shows:
- Connection status (Connected / Disconnected)
- Current branch
- Last sync time
- Last commit hash
- Any errors

## Commit Messages

Each data type generates a meaningful commit message:

| Data Key | Commit Message |
|----------|----------------|
| `hero` | `update: hero section content` |
| `projects` | `update: projects data` |
| `roadmap` | `update: experience section` |
| `education` | `update: education section` |
| `skills` | `update: skills data` |
| `socials` | `update: social links` |
| `settings` | `update: portfolio settings` |
| `seo` | `update: SEO metadata` |
| `cli` | `update: CLI configuration` |

## Manual Sync

Use the **Sync Now** button on the admin dashboard to push all data to GitHub at once.

## API Endpoints

### `GET /api/github/status`

Returns the current sync status:
```json
{
  "lastSyncAt": "2026-06-15T19:00:00.000Z",
  "lastCommitSha": "abc123def456...",
  "lastCommitMessage": "update: hero section content",
  "branch": "main",
  "status": "success",
  "lastError": null,
  "configured": true,
  "configErrors": []
}
```

### `POST /api/github/sync`

Trigger a manual sync. Body (optional):
```json
{ "key": "hero" }
```

Without a key, syncs all data files. With a key, syncs only that file.

## Error Handling

- **Retry logic**: 3 attempts with exponential backoff (0s, 1s, 3s)
- **Graceful degradation**: Sync failures don't block the admin save
- **Visible errors**: The Sync Status card shows the last error message
- **Server logs**: Detailed errors are logged server-side

## Security

- `GITHUB_TOKEN` is never exposed to client-side code
- Only used server-side in API routes
- Admin routes are protected by middleware (HMAC-signed session cookies)
- GitHub API calls use HTTPS with Bearer token auth

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Sync status shows "Disconnected" | `GITHUB_TOKEN` not set | Add the env var |
| "401 Bad credentials" | Token is invalid or expired | Regenerate the token |
| "409 Conflict" | File was modified externally | Use Sync Now to retry |
| Sync succeeds but Vercel doesn't redeploy | No push detected | Check Vercel Git integration |
| Data out of sync between GitHub and Supabase | Supabase was updated without GitHub sync | Use Sync Now button |
