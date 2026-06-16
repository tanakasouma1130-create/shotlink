"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function NewPage() {
  const [slug, setSlug] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください");
      window.location.href = "/login";
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop() || "png";
      const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${safeSlug}/${fileName}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("page-images")
          .upload(filePath, imageFile);

      console.log("UPLOAD DATA", uploadData);
      console.log("UPLOAD ERROR", uploadError);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("page-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("pages").insert({
      slug,
      target_url: targetUrl,
      og_image_url: imageUrl,
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    alert("作成しました");
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">
        新しいページ作成
      </h1>

      <div className="max-w-md space-y-4">
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="slug 例: apology"
          className="w-full rounded-xl border p-3"
        />

        <input
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="遷移先URL"
          className="w-full rounded-xl border p-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImageFile(e.target.files?.[0] || null);
          }}
          className="w-full rounded-xl border p-3"
        />

        <button
          onClick={handleCreate}
          className="w-full rounded-xl bg-black p-3 text-white"
        >
          作成
        </button>
      </div>
    </main>
  );
}