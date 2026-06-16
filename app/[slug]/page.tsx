import { supabase } from "@/lib/supabase";
import TrackingPage from "@/components/TrackingPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LinkPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        ページが見つかりません
      </main>
    );
  }

  return <TrackingPage page={page} />;
}