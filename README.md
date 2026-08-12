# Baglama Store

Multi-tenant bağlama kataloğu / mağaza iskeleti. Next.js 15, Firebase (Firestore, Auth, Storage), Ant Design ve Tailwind.

Her tenant ayrı branding + ayrı Firebase projesi ile **build-time** seçilir (`NEXT_PUBLIC_TENANT_ID`). Bir build = bir tenant.

## Başlangıç

```bash
npm install
cp .env.tenants/biladerler.env.example .env.tenants/biladerler.env
# Firebase değerlerini doldur
npm run tenant:use -- biladerler
npm run dev
```

Windows (PowerShell):

```powershell
npm install
Copy-Item .env.tenants/biladerler.env.example .env.tenants/biladerler.env
# Firebase değerlerini doldur
npm run tenant:use -- biladerler
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Tenant komutları

| Komut | Açıklama |
|-------|----------|
| `npm run tenant:list` | Kayıtlı tenant id’leri |
| `npm run tenant:use -- <id>` | Aktif tenant env + `active.ts` |
| `npm run tenant:validate -- <id>` | Env dosyasını doğrula |
| `npm run dev:tenant -- <id>` | Tenant seçip `next dev` |
| `npm run build:tenant -- <id>` | İzole production build (yalnızca o tenant) |

Detaylı checklist: **[docs/TENANTS.md](./docs/TENANTS.md)**

## Ortam değişkenleri

Tenant başına `.env.tenants/<id>.env` (git’e eklenmez). Şablon: `.env.tenants/<id>.env.example`.

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_TENANT_ID` | `lib/tenants` registry anahtarı |
| `NEXT_PUBLIC_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_PROJECT_ID` | Firebase project id |
| `NEXT_PUBLIC_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_MESSAGING_SENDER_ID` | Firebase messaging sender id |
| `NEXT_PUBLIC_APP_ID` | Firebase app id |

`tenant:use` / `build:tenant` bu dosyayı kök `.env.local` olarak yazar (Next otomatik yükler).

## Diğer scripts

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme (mevcut `.env.local`) |
| `npm run build` | Üretim derlemesi (tenant seçmeden) |
| `npm start` | Üretim sunucusu |
| `npm run lint` | Lint |

## Döküman

- Tenant ekleme / izolasyon: **[docs/TENANTS.md](./docs/TENANTS.md)**
- Proje yapısı: **[DOKUMANTASYON.md](./DOKUMANTASYON.md)**
