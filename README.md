# Deal Intel Agent

A demo-only deal intelligence chatbot that helps explore a portfolio of deals. This is a **local, deterministic demo** with no external APIs, databases, or authentication.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

- **Deal Exploration**: Browse 10 diverse deals across multiple industries
- **Smart Filtering**: Filter by industry, region, channel, stage, and renewal risk
- **Intelligent Chat**: Ask questions about deals, compare them, analyze metrics, and more
- **Deterministic Responses**: All responses are generated from hard-coded data using rule-based logic

## How to Use

### Left Panel
- **Filters**: Use dropdowns to filter deals by industry, region, channel, stage, or renewal risk
- **Search**: Type in the search box to find deals by client name, industry, or tags
- **Deal List**: Click any deal to automatically query the chatbot about it

### Right Panel (Chat)
- Type questions in natural language
- Click suggested questions to explore
- View sources for each response
- Use suggested follow-up questions

## Example Questions

Here are 8 example questions that showcase the variety of capabilities:

### 1. Industry Filtering
**Question:** "Show me all deals in healthcare"
- Returns a list of healthcare deals with key highlights
- Demonstrates industry-based filtering

### 2. Comparison
**Question:** "Compare ApexCommerce with CloudSync Solutions"
- Returns a side-by-side comparison table
- Shows differences in contract value, stage, services, and results

### 3. Objections Aggregation
**Question:** "What are the most common objections we've faced?"
- Aggregates objections across all deals
- Shows frequency counts for each objection type

### 4. Renewal Risk Analysis
**Question:** "Show me renewal risk analysis"
- Groups deals by renewal likelihood (High/Med/Low)
- Includes rationale for each risk level

### 5. Largest Deal
**Question:** "What's the largest deal?"
- Identifies the deal with the highest contract value
- Uses midpoint calculation for comparison
- Provides full details of the largest deal

### 6. Most Recent Deal
**Question:** "What's the most recent deal?"
- Finds the deal with the most recent activity
- Shows current stage and timeline

### 7. Competitors Analysis
**Question:** "What competitors have we faced?"
- Aggregates competitors across deals
- Shows frequency of each competitor

### 8. Channel Analysis
**Question:** "What channels do we use?"
- Shows distribution of sales channels
- Displays frequency across deals

## Additional Example Questions

- "Tell me about MediCare Network"
- "Show me deals with high renewal risk"
- "What deals are in North America?"
- "Compare the largest deal with the smallest deal"
- "What are the challenges in FinTech deals?"
- "Show me deals that stalled"
- "What's the deal with the best results?"
- "Tell me about lost deals"

## Deal Portfolio

The demo includes 10 diverse deals:

1. **ApexCommerce** - eCommerce DTC (Fashion & Apparel)
2. **CloudSync Solutions** - B2B SaaS (Productivity Software)
3. **MediCare Network** - Healthcare Provider (Hospital System)
4. **PayFlow Financial** - FinTech (Payment Processing)
5. **HomeService Pro** - Local Multi-Location Services (Home Services)
6. **MarketPlace Hub** - Marketplace (B2B Marketplace) - *Stalled deal*
7. **FitTrack App** - Consumer App (Health & Fitness) - *Startup/Pilot*
8. **Precision Manufacturing Co** - Manufacturing (Industrial Equipment)
9. **EduLearn Academy** - Education (Online Learning) - *Lost deal*
10. **GrandStay Hotels** - Hospitality (Hotel Chain) - *Rebrand included*

## Technical Details

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Data**: Hard-coded in `/data/deals.ts`
- **Logic**: Rule-based intent detection and retrieval in `/lib/retrieval.ts` and `/lib/respond.ts`
- **No External Dependencies**: No OpenAI, no databases, no external APIs

## Project Structure

```
/app
  /api/chat          - Chat API endpoint
  /components        - React components (Chat, DealList, Filters)
  page.tsx           - Main page layout
/data
  deals.ts           - 10 deal objects with rich details
/lib
  retrieval.ts       - Deal scoring and filtering logic
  respond.ts         - Intent detection and response formatting
```

## Important Notes

- **Demo Only**: This is a demonstration application with fake data
- **No Real Clients**: All client names are fictional
- **Deterministic**: Responses are generated using rule-based logic, not AI
- **Local Only**: No environment variables or external services required

## Development

- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`

---

Built as a demo for deal intelligence exploration. All data is fictional and for demonstration purposes only.
