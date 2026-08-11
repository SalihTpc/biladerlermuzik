# Biladerler Müzik

Bağlama kataloğu için Next.js 14 mağaza sitesi. Firebase (Firestore, Auth, Storage) ve NextAuth ile çalışır; arayüzde Ant Design ve Tailwind kullanılır.

## Başlangıç

```bash
npm install
cp .env.example .env
npm run dev
```

Windows (PowerShell):

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde açılır.

`.env.example` içindeki Firebase değerleri mevcut proje içindir; `NEXTAUTH_SECRET` değerini üretimde mutlaka değiştirin. Yerel `.env` dosyası git’e **eklenmez**.

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXTAUTH_URL` | Uygulama URL’i (ör. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | NextAuth oturum sırrı |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth (opsiyonel) |
| `NEXT_PUBLIC_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_PROJECT_ID` | Firebase project id |
| `NEXT_PUBLIC_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_MESSAGING_SENDER_ID` | Firebase messaging sender id |
| `NEXT_PUBLIC_APP_ID` | Firebase app id |

Şablon: [`.env.example`](./.env.example)

## Scripts

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme |
| `npm run build` | Üretim derlemesi |
| `npm start` | Üretim sunucusu |
| `npm run lint` | Lint |

## Döküman

Proje yapısı, rotalar, bileşenler, veri katmanı ve auth akışı için:

**[DOKUMANTASYON.md](./DOKUMANTASYON.md)**
