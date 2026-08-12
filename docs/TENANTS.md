# Tenant rehberi (Baglama Store)

Build-time multi-tenancy: bir build = bir tenant. Branding `lib/tenants/`, veri ayrı Firebase projesi (env).

## Yeni tenant ekleme

Örnek id: `acme`

1. **Config** — [`lib/tenants/ornek.ts`](../lib/tenants/ornek.ts) dosyasını `lib/tenants/acme.ts` olarak kopyala; `id`, `brand`, `theme`, `contact`, `meta` doldur; `logoPath: "/tenants/acme/logo.png"`. `contact` içinde opsiyonel sosyal / iletişim alanları: `whatsapp`, `instagram`, `facebook`, `tiktok`, `youtube`, `mapsUrl`, `mapsEmbedUrl`.
2. **Logo / favicon** — `public/tenants/acme/logo.png` (veya `.jpg`) ekle. Favicon için:
   - Varsayılan: logo kullanılır (`metadata.icons`).
   - Tek dosya: `public/tenants/acme/favicon.png` koy ve config’te `faviconPath: "/tenants/acme/favicon.png"` yaz.
   - Çoklu set (önerilen): RealFaviconGenerator çıktısını `public/tenants/acme/` altına koy (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`) ve config’te `theme.icons` ile path’leri ver. Logo JPG olsa bile favicon seti ayrı kalır.
3. **Registry** — [`lib/tenants/registry.json`](../lib/tenants/registry.json) içine kayıt ekle:

```json
"acme": {
  "importPath": "./acme",
  "exportName": "acmeTenant"
}
```

4. **Env** — `.env.tenants/acme.env.example` oluştur (veya `ornek.env.example` kopyala), sonra:

```bash
cp .env.tenants/acme.env.example .env.tenants/acme.env
```

`NEXT_PUBLIC_TENANT_ID=acme` ve Firebase alanlarını doldur. `.env` dosyaları git’e **eklenmez**.

5. **Firebase** — Bu tenant için ayrı Firebase projesi (Auth, Firestore, Storage).
6. **Doğrula**

```bash
npm run tenant:list
npm run tenant:use -- acme
npm run dev:tenant -- acme
# veya
npm run build:tenant -- acme
```

## Çalıştırma / build

| Komut | Ne yapar |
|-------|----------|
| `npm run tenant:list` | `registry.json` id’leri |
| `npm run tenant:use -- <id>` | `lib/tenants/active.ts` üretir + `.env.local` yazar |
| `npm run tenant:validate -- <id>` | Env zorunlu alanları dolu mu / id eşleşiyor mu |
| `npm run dev:tenant -- <id>` | `use` + `next dev` |
| `npm run build:tenant -- <id>` | validate + `use` + diğer tenant logolarını gizle + `next build` + logoları geri koy |

```bash
npm run build:tenant -- biladerler
npm run build:tenant -- ornek
```

## İzolasyon garantileri

| Katman | Davranış |
|--------|----------|
| Config | `active.ts` yalnızca seçilen tenant’ı import eder; diğer `*.ts` config’ler bundle’a girmez |
| Logo | `build:tenant` sırasında `public/tenants/` altında aktif id dışındakiler geçici olarak `.tenant-inactive/` altına alınır; build bitince geri konur |
| Env | Her tenant `.env.tenants/<id>.env`; build/dev öncesi `.env.local` bu dosyadan yazılır |
| Runtime check | `getTenant()` env id ile `activeTenant.id` uyuşmazsa hata verir |

Hosting (Vercel, VPS, vb.) ayrı karar; şimdilik hedef temiz lokal `.next` artifact.

## SEO

Her tenant build’inde:

| Parça | Not |
|-------|-----|
| `NEXT_PUBLIC_SITE_URL` | Canonical / Open Graph / sitemap kökü (örn. `https://www.bestekarmuzik.com`) |
| `app/robots.ts` | `/login`, `/profile`, `/baglamalar/ekle` noindex |
| `app/sitemap.ts` | Statik sayfalar + bağlama detayları |
| Sayfa `metadata` | Title template, description, Open Graph |
| JSON-LD | `MusicStore` (site geneli) + `Product` (bağlama detay) |

Prod env’e `NEXT_PUBLIC_SITE_URL` eklemeyi unutma.

## Dosya haritası

| Yol | Rol |
|-----|-----|
| `lib/tenants/registry.json` | Kayıtlı tenant listesi (script + app) |
| `lib/tenants/<id>.ts` | Branding / theme / contact |
| `lib/tenants/active.ts` | Script tarafından üretilir — elle düzenleme |
| `lib/tenants/index.ts` | `getTenant()` / `getTenantId()` |
| `public/tenants/<id>/` | Statik asset’ler (`logo.png`/`.jpg`, isteğe bağlı `faviconPath` veya `icons` seti) |
| `.env.tenants/<id>.env` | Secret env (gitignore) |
| `scripts/tenant.mjs` | list / use / validate / dev / build |
