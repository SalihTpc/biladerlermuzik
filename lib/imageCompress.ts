export type CompressOptions = {
  maxEdge?: number;
  quality?: number;
  mimeType?: "image/jpeg" | "image/webp";
  maxBytes?: number;
};

export const BAGLAMA_IMAGE_OPTIONS: Required<CompressOptions> = {
  maxEdge: 1600,
  quality: 0.82,
  mimeType: "image/jpeg",
  maxBytes: 350_000,
};

export const PROFILE_IMAGE_OPTIONS: Required<CompressOptions> = {
  maxEdge: 512,
  quality: 0.8,
  mimeType: "image/jpeg",
  maxBytes: 200_000,
};

/** Firestore doc ~1MB; leave headroom for other fields */
export const BAGLAMA_GALLERY_MAX_BYTES = 900_000;

const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function dataUrlByteLength(dataUrl: string): number {
  const base64 = dataUrl.split(",")[1] ?? "";
  const padding = (base64.match(/=+$/) || [""])[0].length;
  return Math.floor((base64.length * 3) / 4) - padding;
}

/** Ant Upload bazen RcFile / originFileObj verir */
export function resolveUploadFile(file: unknown): File {
  if (file instanceof Blob && !(file instanceof File)) {
    return new File([file], "image.jpg", {
      type: file.type || "image/jpeg",
    });
  }
  if (file instanceof File) {
    return file;
  }
  if (file && typeof file === "object") {
    const maybe = file as { originFileObj?: File };
    if (maybe.originFileObj instanceof File) {
      return maybe.originFileObj;
    }
  }
  throw new Error("Geçerli bir görsel dosyası seçilemedi");
}

function guessMime(file: File): string {
  if (file.type && ACCEPTED_TYPES.has(file.type.toLowerCase())) {
    return file.type.toLowerCase();
  }
  const name = file.name.toLowerCase();
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".gif")) return "image/gif";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  return "";
}

function readFileAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string" && reader.result.startsWith("data:")) {
        resolve(reader.result);
      } else {
        reject(new Error("Dosya okunamadı"));
      }
    };
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        if (typeof img.decode === "function") {
          await img.decode();
        }
      } catch {
        // decode optional
      }
      if (!img.naturalWidth || !img.naturalHeight) {
        reject(new Error("Görsel boyutları okunamadı"));
        return;
      }
      resolve(img);
    };
    img.onerror = () =>
      reject(new Error("Görsel okunamadı. JPEG, PNG veya WebP deneyin."));
    img.src = dataUrl;
  });
}

/** Çıktının tamamen siyah olup olmadığını kaba kontrol */
function isCanvasMostlyBlack(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
  const sample = Math.min(w, h, 64);
  const data = ctx.getImageData(0, 0, sample, sample).data;
  let lit = 0;
  const step = 16; // RGBA * 4 pixels
  for (let i = 0; i < data.length; i += step) {
    if (data[i]! + data[i + 1]! + data[i + 2]! > 30) lit += 1;
  }
  return lit < 3;
}

/**
 * Dosyayı Canvas ile yeniden boyutlandırıp data URL üretir.
 * createImageBitmap kullanılmaz (bazı ortamlarda siyah bitmap üretebiliyor).
 */
export async function compressImageFile(
  input: File | Blob | unknown,
  options: CompressOptions = {},
): Promise<string> {
  const file = resolveUploadFile(input);
  const maxEdge = options.maxEdge ?? 1600;
  const quality = options.quality ?? 0.82;
  const mimeType = options.mimeType ?? "image/jpeg";
  const maxBytes = options.maxBytes ?? 350_000;

  const mime = guessMime(file);
  if (!mime || !ACCEPTED_TYPES.has(mime)) {
    throw new Error(
      "Desteklenmeyen dosya türü. JPEG, PNG, WebP veya GIF seçin (HEIC desteklenmez).",
    );
  }

  // 1) Ham dosyayı data URL olarak oku (önizleme ile aynı kaynak)
  const originalDataUrl = await readFileAsDataUrl(file);
  const img = await loadImageFromDataUrl(originalDataUrl);

  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
  let width = Math.max(1, Math.round(img.naturalWidth * scale));
  let height = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Görsel işlenemedi");
  }

  const paint = (w: number, h: number) => {
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
  };

  paint(width, height);

  if (isCanvasMostlyBlack(ctx, width, height)) {
    // Sıkıştırma bozulduysa ham data URL’i küçültmeden kullanmayı dene (küçük dosyalar)
    const rawBytes = dataUrlByteLength(originalDataUrl);
    if (rawBytes <= maxBytes && originalDataUrl.startsWith("data:image/")) {
      return originalDataUrl;
    }
    throw new Error(
      "Görsel işlenirken bozuldu. Başka bir JPEG/PNG dosyası deneyin.",
    );
  }

  let q = quality;
  let dataUrl = canvas.toDataURL(mimeType, q);
  let bytes = dataUrlByteLength(dataUrl);

  while (bytes > maxBytes && q > 0.45) {
    q -= 0.08;
    dataUrl = canvas.toDataURL(mimeType, q);
    bytes = dataUrlByteLength(dataUrl);
  }

  if (bytes > maxBytes) {
    let edge = maxEdge * 0.75;
    while (bytes > maxBytes && edge >= 480) {
      const s = Math.min(1, edge / Math.max(img.naturalWidth, img.naturalHeight));
      width = Math.max(1, Math.round(img.naturalWidth * s));
      height = Math.max(1, Math.round(img.naturalHeight * s));
      paint(width, height);
      dataUrl = canvas.toDataURL(mimeType, 0.7);
      bytes = dataUrlByteLength(dataUrl);
      edge *= 0.8;
    }
  }

  if (bytes > maxBytes) {
    throw new Error(
      "Görsel çok büyük. Daha küçük bir dosya seçin.",
    );
  }

  return dataUrl;
}

export function assertGalleryFits(
  urls: string[],
  maxTotalBytes = BAGLAMA_GALLERY_MAX_BYTES,
): void {
  const total = urls.reduce((sum, url) => {
    if (url.startsWith("data:")) return sum + dataUrlByteLength(url);
    return sum;
  }, 0);
  if (total > maxTotalBytes) {
    throw new Error(
      "Görseller toplamda çok büyük. Daha az görsel ekleyin veya daha küçük dosyalar seçin.",
    );
  }
}
