export function generateSubscriptionId(): string {
  const now = new Date();
  const date = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  const random = Math.floor(100 + Math.random() * 900); // 3-digit
  return `SUB-${date}${random}`;
}
