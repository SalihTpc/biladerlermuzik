export const modifyString = (input: string): string => {
  return input
    .toLowerCase() // Küçük harfe çevir
    .replace(/\s+/g, "-") // Boşlukları '-' ile değiştir
    .replace(/[^a-z0-9-]/g, "") // Alphanumeric olmayan karakterleri kaldır
    .replace(/-+/g, "-") // Birden fazla '-' karakterini tek '-' karakterine dönüştür
    .substring(0, 50); // İsteğe bağlı olarak maksimum uzunluğu kısıtla
};
