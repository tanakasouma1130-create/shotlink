export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-3">ShotLink</h1>
        <p className="text-zinc-400 text-center mb-8">
          リンクをまとめて公開できるプロフィールページ
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-zinc-700 mb-4" />
            <h2 className="text-2xl font-bold">Soma</h2>
            <p className="text-zinc-400 mt-2 text-center">
              自作リンク管理サービスを開発中
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <a className="block bg-white text-black text-center rounded-xl py-3 font-bold">
              Instagram
            </a>
            <a className="block bg-white text-black text-center rounded-xl py-3 font-bold">
              X
            </a>
            <a className="block bg-white text-black text-center rounded-xl py-3 font-bold">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}