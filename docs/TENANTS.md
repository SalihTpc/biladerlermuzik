# Tenant rehberi (Baglama Store)

Build-time multi-tenancy: bir build = bir tenant. Branding `lib/tenants/`, veri ayrı Firebase projesi (env).

## Yeni tenant ekleme

Örnek id: `acme`

1. **Config** — [`lib/tenants/ornek.ts`](../lib/tenants/ornek.ts) dosyasını `lib/tenants/acme.ts` olarak kopyala; `id`, `brand`, `theme`, `contact`, `meta` doldur; `logoPath: "/tenants/acme/logo.png"`.
2. **Logo / favicon** — `public/tenants/acme/logo.png` ekle. Favicon için:
   - Varsayılan: logo kullanılır (`metadata.icons`).
   - Özel favicon: `public/tenants/acme/favicon.png` (kare, 32–512px önerilir) koy ve config’te `faviconPath: "/tenants/acme/favicon.png"` yaz.
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

## Dosya haritası

| Yol | Rol |
|-----|-----|
| `lib/tenants/registry.json` | Kayıtlı tenant listesi (script + app) |
| `lib/tenants/<id>.ts` | Branding / theme / contact |
| `lib/tenants/active.ts` | Script tarafından üretilir — elle düzenleme |
| `lib/tenants/index.ts` | `getTenant()` / `getTenantId()` |
| `public/tenants/<id>/` | Statik asset’ler (`logo.png`, isteğe bağlı `favicon.png`) |
| `.env.tenants/<id>.env` | Secret env (gitignore) |
| `scripts/tenant.mjs` | list / use / validate / dev / build |
