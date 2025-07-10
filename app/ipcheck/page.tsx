import { headers } from 'next/headers';

export default async function HomePage() {
  const headersList = await headers();

  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0] ??
    headersList.get('x-real-ip') ??
    '8.8.8.8'; // fallback if behind proxy

  let country = 'Unknown';
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    country = data?.country_name || 'Unknown';
  } catch (error) {
    console.error('IP lookup failed:', error);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Visitor Info</h1>
      <p className="text-lg">IP Address: {ip}</p>
      <p className="text-lg">Country: {country}</p>
    </main>
  );
}
