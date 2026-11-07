# Prooflix website

Static marketing site for Prooflix, an early-stage project (not a company) building
a self-hosted data platform for pipelines,
medallion architecture with Spark jobs running as part of each pipeline.
The installation complies with all major cloud and SaaS providers and also runs fully on-premise.

## Structure

- `index.html` – the single page (hero, why, platform, how it works, cost model, CTA)
- `css/styles.css` – styles, white background, navy/orange palette taken from the logo
- `js/main.js` – mobile menu toggle, footer year and contact form submission
- `assets/prooflix-logo.svg` – full wordmark logo
- `assets/prooflix-mark.svg` – icon-only mark, also used as `favicon.svg`

No build step. Open `index.html` directly or serve the folder:

```bash
python3 -m http.server 8765
```

Then visit http://localhost:8765.

## SEO

The page ships with a keyword title and description, canonical and Open Graph tags,
JSON-LD structured data (Organization, WebSite, SoftwareApplication, FAQPage), an FAQ
section, `robots.txt`, `sitemap.xml` and `assets/og-image.png`.

All absolute URLs point to `https://www.prooflix.com` (the apex and http variants redirect there). If the domain ever changes,
replace that base URL in `index.html`, `robots.txt`, `sitemap.xml` and `sitemap.txt`,
then submit the sitemap in Google Search Console.

## Contact form

The `#contact` section posts to [Web3Forms](https://web3forms.com) in the background, so
submitting never opens the visitor's mail client. Messages are delivered to
`prooflix.admin@gmail.com`.

The access key is already set in the hidden `access_key` input in `index.html`. To rotate it,
create a new key for that address at https://web3forms.com and replace the value.

The access key is designed to be public in the HTML. If it is ever removed, the form shows a
"not configured yet" message instead of sending.
