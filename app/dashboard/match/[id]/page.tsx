// app/dashboard/match/[id]/page.tsx
interface MatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchDetailPage({
  params,
}: MatchDetailPageProps) {
  const resolvedParams = await params;

  async function getDogImage() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
      next: { revalidate: 0 },
    });
    const data = await res.json();
    console.log("[SERVER] Dog API Response in match detail:", data);
    return data.message;
  }

  const imageUrl = await getDogImage();

  console.log("[SERVER] Match detail page accessed:", {
    id: resolvedParams.id,
    imageUrl,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pet Details</h1>
      <p className="mb-4">Pet ID: {resolvedParams.id}</p>
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt="Pet"
          className="object-cover rounded-lg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
