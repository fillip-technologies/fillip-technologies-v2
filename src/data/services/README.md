# Service landing pages

## Add a city to an existing service

1. Copy a valid JSON file from that service's `pages` directory.
2. Rename the file for the city, for example `delhi.json`.
3. Set a unique `slug`, the city fields, SEO metadata, content overrides, and FAQs.
4. Keep `serviceKey` identical to the value in the service's `service.json`.
5. Set `enabled` to `true` when the page is ready to publish.

The shared `[landingSlug]` route discovers enabled JSON files automatically. Do not create a route or component for each city.

## Add a service that uses an existing template

1. Add `src/data/services/<service-key>/service.json`.
2. Choose an existing `templateKey` such as `website-design`, `mobile-app-development`, `technical-seo`, `performance-marketing`, or `ai-automation`.
3. Add one or more JSON files under `pages` using that template's content structure.

No routing change is required. Services that share a UI template can publish pages through JSON only.

## Add a service that needs a new UI template

1. Build one reusable template for the service family.
2. Add its content type and Zod override schema.
3. Register its `templateKey` in the shared loader and template resolver.
4. Add the service and city JSON files.

This is a one-time integration for the service family. Future city pages then require JSON only.

## Content rules

- Slugs must be lowercase and hyphenated.
- Canonical URLs must start with `/` and normally match the slug.
- Open Graph images must use an existing public image path.
- Every published page requires SEO metadata and at least one FAQ.
- Arrays in content overrides replace the template defaults; omitted fields inherit defaults.
- Invalid content, duplicate slugs, or mismatched service keys fail validation.
