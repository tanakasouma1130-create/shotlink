import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data: pages } = await supabase
    .from("pages")
    .select("*");

  const { data: events } = await supabase
    .from("analytics_events")
    .select("*");

  const stats =
    pages?.map((page) => {
      const views =
        events?.filter(
          (e) =>
            e.page_id === page.id &&
            e.event_type === "view"
        ).length || 0;

      const clicks =
        events?.filter(
          (e) =>
            e.page_id === page.id &&
            e.event_type === "click"
        ).length || 0;

      return {
        slug: page.slug,
        views,
        clicks,
        ctr:
          views > 0
            ? ((clicks / views) * 100).toFixed(1)
            : "0",
      };
    }) || [];

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="space-y-4">
        {stats.map((item) => (
          <div
            key={item.slug}
            className="rounded-xl border p-4"
          >
            <h2 className="font-bold">
              {item.slug}
            </h2>

            <p>PV: {item.views}</p>
            <p>Click: {item.clicks}</p>
            <p>CTR: {item.ctr}%</p>
          </div>
        ))}
      </div>
    </main>
  );
}