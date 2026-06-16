"use client";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

type Page = {
  id: string;
  target_url: string;
  og_image_url: string | null;
  background_value: string | null;
};

export default function TrackingPage({
  page,
}: {
  page: Page;
}) {
  useEffect(() => {
    supabase
      .from("analytics_events")
      .insert({
        page_id: page.id,
        event_type: "view",
      })
      .then((result) => {
        console.log("VIEW RESULT", result);
      });
  }, [page.id]);

  const handleClick = async () => {
    await supabase.from("analytics_events").insert({
      page_id: page.id,
      event_type: "click",
    });

    window.location.href = page.target_url;
  };

  return (
    <main
      onClick={handleClick}
      className="min-h-screen flex cursor-pointer items-center justify-center p-6"
      style={{
        backgroundColor: page.background_value || "#f5f5f5",
      }}
    >
      <div className="relative w-full max-w-md">
        <img
          src={
            page.og_image_url ||
            "https://placehold.co/800x450"
          }
          alt=""
          className="w-full rounded-3xl shadow-xl"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-black/60 flex items-center justify-center">
            <span className="ml-1 text-4xl text-white">▶</span>
          </div>
        </div>
      </div>
    </main>
  );
}