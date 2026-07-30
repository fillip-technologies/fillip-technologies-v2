# Get a Quote Route Documentation

Route: `/get-a-quote/`

Local URL: `http://localhost:3000/get-a-quote/`

Primary file: `src/app/(site)/get-a-quote/page.tsx`

## Purpose

The Get a Quote page lets visitors build an instant service estimate by selecting packages and add-ons. After entering contact details, the system generates a PDF estimate, attempts to email it to the visitor, downloads a copy in the browser, and stores the submission as both a quote and a lead.

## Page Structure

The route renders a server component page with these sections:

1. Hero section
   - Communicates the "instant price estimate" value proposition.
   - Shows a three-step process: pick services, add extras, get the PDF emailed.

2. What We Do section
   - Uses `WhatsIncluded`.
   - Builds cards from `SERVICE_CATEGORIES` in `src/data/pricing.ts`.
   - Keeps the visible service cards synced with the calculator data.

3. Quote calculator section
   - Uses `QuoteCalculator` from `src/components/quote/QuoteCalculator.tsx`.
   - This is the main interactive client component.

4. Guidance section
   - Uses `HowToChoose`.
   - Content comes from `HOW_TO_CHOOSE` in `src/data/quote/detail.ts`.

5. Trust section
   - Uses `WhyChooseFillip`.
   - Stats and points come from `WHY_CHOOSE_STATS` and `WHY_CHOOSE_POINTS`.

## Main Files

| File | Responsibility |
| --- | --- |
| `src/app/(site)/get-a-quote/page.tsx` | Main route page and layout composition |
| `src/components/quote/QuoteCalculator.tsx` | Client-side quote builder, form, submit handling, PDF download |
| `src/components/quote/QuoteDetailSections.tsx` | Shared presentational sections used on quote pages |
| `src/data/pricing.ts` | Service categories, packages, add-ons, GST, company details |
| `src/lib/quote.ts` | Shared quote calculation logic used by client and server |
| `src/app/api/quote/route.ts` | Public API endpoint for quote submissions |
| `src/server/quote/schema.ts` | Zod validation schema for quote requests |
| `src/server/quote/pdf.ts` | PDF estimate generation using `pdf-lib` |
| `src/server/quote/email.ts` | Quote email sending using `nodemailer` |
| `src/server/quote/queries.ts` | Quote persistence in MongoDB |
| `src/server/db/models.ts` | Mongoose `QuoteModel` and `LeadModel` definitions |

## User Flow

1. User visits `/get-a-quote/`.
2. User selects one or more service packages.
3. If a selected category has add-ons, add-ons become available.
4. User can toggle flat add-ons or adjust quantity-based add-ons.
5. The calculator updates the itemized estimate live.
6. User enters:
   - Name
   - Email
   - Phone
   - Company, optional
7. User submits the form.
8. Client captures location best-effort via `captureClientLocation`.
9. Client sends a POST request to `/api/quote`.
10. Server validates the request, recalculates pricing, generates the PDF, attempts email delivery, stores the quote, stores a lead, and returns the PDF as base64.
11. Browser downloads `Fillip-Technologies-Estimate.pdf`.
12. User sees a success or error message.

## Service Categories

The calculator currently uses these categories from `src/data/pricing.ts`:

| Category ID | Name | Billing Types |
| --- | --- | --- |
| `website` | Website Development | One-time and monthly add-ons |
| `seo` | Search Engine Optimization (SEO) | Monthly |
| `smm` | Social Media Management | Monthly |
| `performance` | Performance Marketing (Paid Ads) | Monthly |
| `software` | Software & App Solutions | One-time and monthly add-ons |

## Pricing Logic

Pricing is handled in `src/lib/quote.ts`.

Key rules:

- The client calculates a live preview for user experience.
- The server recalculates the final quote, so client-submitted prices are never trusted.
- Unknown category, package, or add-on IDs are ignored.
- GST is read from `GST_RATE` in `src/data/pricing.ts`.
- Current GST rate is `0.18`.
- Package discounts use tier-based rates:
  - First tier: `10%`
  - Second tier: `15%`
  - Third and above: `25%`
- Add-ons use the flat launch discount: `25%`.
- One-time and monthly totals are calculated separately.

Returned quote totals include:

- `subtotal`
- `discount`
- `discounted`
- `gst`
- `total`

## API Contract

Endpoint: `POST /api/quote`

Runtime: Node.js

Request body:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "9876543210",
  "company": "Company Name",
  "selections": [
    {
      "categoryId": "website",
      "packageId": "website-standard",
      "addOns": [
        {
          "id": "website-extra-pages",
          "quantity": 3
        }
      ]
    }
  ],
  "location": {
    "source": "gps",
    "label": "Optional resolved location"
  }
}
```

Successful response:

```json
{
  "ok": true,
  "emailed": true,
  "message": "Your estimate is on its way to your inbox.",
  "filename": "Fillip-Technologies-Estimate.pdf",
  "pdfBase64": "...",
  "totals": {
    "oneTime": 42480,
    "monthly": 0
  }
}
```

Validation error response:

```json
{
  "ok": false,
  "message": "Please fix the highlighted fields.",
  "errors": {
    "email": ["Enter a valid email"]
  }
}
```

## Validation Rules

Defined in `src/server/quote/schema.ts`.

Required fields:

- `name`: minimum 2 characters, maximum 120
- `email`: valid email, maximum 200
- `phone`: minimum 7 characters, maximum 40
- `selections`: minimum 1 item, maximum 20

Optional fields:

- `company`: maximum 160 characters

Selection rules:

- `categoryId`: required string, maximum 60
- `packageId`: required string, maximum 60
- `addOns`: maximum 40
- Add-on `quantity`: integer between 1 and 100

## PDF Generation

PDF generation happens in `src/server/quote/pdf.ts`.

The PDF includes:

- Fillip Technologies header
- Date
- Customer name, company, email, and phone
- Selected service packages
- Package feature groups and items
- Commercial table
- One-time totals
- Monthly totals
- GST lines when GST is enabled
- Estimate note from `QUOTE_NOTE`
- Fillip Technologies trust highlights

The PDF uses `pdf-lib` and standard Helvetica fonts. Because the standard font does not support the rupee glyph, PDF prices use `Rs.` instead of the INR symbol.

## Email Behavior

Email sending happens in `src/server/quote/email.ts`.

The system:

- Uses `nodemailer`.
- Sends the estimate PDF to the visitor email.
- BCCs the company email from `COMPANY.email`.
- Caches the mail transporter on `globalThis` during development.

Required SMTP environment variables:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

If SMTP is not configured or email delivery fails:

- PDF generation still works.
- Quote and lead storage are still attempted.
- The response returns `emailed: false`.
- The user receives a message saying the estimate is ready to download but email delivery is not configured.

## Database Storage

Quote submissions are stored in MongoDB using `QuoteModel`.

Collection: `quotes`

Stored quote fields:

- `name`
- `email`
- `phone`
- `company`
- `selections`
- `line_items`
- `one_time_total`
- `monthly_total`
- `emailed`
- `created_at`

The same submission is also recorded as a lead using `insertLead`.

Lead source:

```text
get-a-quote-calculator
```

Lead package category is built from the selected quote item category names.

## Error Handling

Client-side errors:

- Empty quote selection shows: `Please select at least one package.`
- Network failures show: `Network error. Please try again.`
- API validation errors are displayed beside related contact fields when available.

Server-side errors:

- Invalid JSON returns HTTP 400.
- Invalid form data returns HTTP 400 with field errors.
- Empty final quote returns HTTP 400.
- PDF generation failure returns HTTP 500.
- Email, quote insert, and lead insert failures are logged but do not block the final PDF response.

## SEO Metadata

Defined in `src/app/(site)/get-a-quote/page.tsx`.

Title:

```text
Get a Quote | Fillip Technologies
```

Description:

```text
Build a custom estimate for websites, SEO, social media, performance marketing, and software. Get the PDF emailed to you instantly.
```

## Related Quote Routes

These are separate pages in the same feature area:

| Route | Purpose |
| --- | --- |
| `/get-a-quote/` | Main package calculator |
| `/get-a-quote/custom/` | Industry quote overview |
| `/get-a-quote/custom/[industry]/` | Industry-specific packages |
| `/get-a-quote/requirement/` | Requirement form for custom quote requests |

## Notes for Maintenance

- Update package prices, names, feature groups, and add-ons in `src/data/pricing.ts`.
- Keep category IDs and package IDs stable because they are submitted to the API.
- If changing pricing logic, update `src/lib/quote.ts`; both client and server use it.
- If changing required form fields, update both `QuoteCalculator.tsx` and `quoteRequestSchema`.
- If changing PDF content, update `src/server/quote/pdf.ts`.
- If changing email content, update `src/server/quote/email.ts`.
- If quote submissions are not emailing, check SMTP environment variables first.
