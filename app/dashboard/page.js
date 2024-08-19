// pages/dashboard.js
import AudioProcessor from "@/components/AudioProcessor";
import ButtonAccount from "@/components/ButtonAccount";
import CryptoWalletScreening from "@/components/CryptoWalletScreening";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24 bg-gray-100">
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Crypto Wallet Screening</h1>
          <ButtonAccount />
        </div>
        <CryptoWalletScreening />
      </section>
    </main>
  );
}