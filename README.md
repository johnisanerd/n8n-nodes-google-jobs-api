# n8n-nodes-google-jobs-api

An [n8n](https://n8n.io/) community node that searches Google Jobs and returns structured job listings: title, company, location, posting date, schedule type, and apply links. It is backed by the [Google Jobs API](https://apify.com/johnvc/Google-Jobs-Scraper?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a search query and an optional location, and it returns one item per job listing with the title, company, location, source, posting date, schedule type, and a direct apply link. It also works as an **AI Agent tool**, so an agent can look up open jobs on demand.

- Search by keyword, job title, or company, optionally scoped to a location
- Localize results with a country code, language code, and Google domain
- Choose how much data to return per job: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-jobs-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Jobs** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Job > Search** returns job listings that match a query.

| Parameter | Description |
| --- | --- |
| Search Query | Job title, keywords, or company to search for. Required. |
| Location | City, state, or region to search within. Optional. |
| Country Code | Two-letter country code the search runs from, for example `us`. Optional. |
| Language Code | Two-letter language code for the results, for example `en`. Optional. |
| Google Domain | Which Google domain to query. Defaults to `google.com`. |
| Number of Results | How many job listings to return. Defaults to `10`. |
| Maximum Pages | How many extra result pages to follow. Use `0` for the first page only. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

The API returns more than ten fields per job, so the **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact, readable object with `title`, `company`, `location`, `via`, `postedAt`, `scheduleType`, `salary`, `applyLink`, and `jobId`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each job, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

Each job is returned as its own n8n item.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Job title |
| `company_name` | string | Hiring company |
| `location` | string | Job location |
| `via` | string | Source the listing was found through, for example `LinkedIn` |
| `share_link` | string | Google share link for the listing |
| `extensions` | array | Short tags such as posting age, schedule type, and benefits |
| `detected_extensions` | object | Parsed tags: `posted_at`, `schedule_type`, `salary`, `qualifications` |
| `source_link` | string | Direct link to the original listing |
| `job_title` | string | Job title as reported by the source |
| `description` | string | Full job description text |
| `apply_options` | array | Apply destinations, each with a `title` and `link` |
| `job_id` | string | Unique Google Jobs identifier |
| `query` | string | The query that produced this result |
| `country` | string | Country code used for the search |
| `language` | string | Language code used for the search |
| `google_domain` | string | Google domain used for the search |
| `search_timestamp` | string | When the search ran (ISO 8601) |
| `total_jobs_found` | integer | Total listings found for the query |
| `pages_processed` | integer | Number of result pages processed |

## Example workflows

### 1. Pull software jobs in a city into a sheet

1. **Manual Trigger**
2. **Google Jobs**: set Search Query to `software engineer`, Location to `Austin, TX`, Output to `Simplified`.
3. **Google Sheets** (or **Airtable**): append each job's `title`, `company`, `location`, and `applyLink`.

### 2. Daily new-jobs alert

1. **Schedule Trigger**: run once a day.
2. **Google Jobs**: set Search Query to your role and Location to your area.
3. **Filter** (or **Remove Duplicates**): keep only listings you have not seen before.
4. **Slack** or **Send Email**: notify yourself with the new matches.

### 3. Let an AI Agent answer job questions

1. **AI Agent** node.
2. Attach **Google Jobs** as a tool.
3. Ask the agent something like "Find remote product manager jobs posted this week." The agent calls the node (in Simplified mode) and answers with live listings.

## Pricing

This node calls the [Google Jobs API](https://apify.com/johnvc/Google-Jobs-Scraper?fpr=9n7kx3) on Apify, which is billed **pay-per-result**: about **$0.01 per 1,000 jobs returned**, plus a small per-run start fee, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/Google-Jobs-Scraper?fpr=9n7kx3) for current rates.

## Resources

- [Google Jobs API on Apify](https://apify.com/johnvc/Google-Jobs-Scraper?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-jobs-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
