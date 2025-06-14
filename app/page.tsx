"use server";
import FooterBottom from "@/components/Footer/FooterBottom";
import Index from "@/components/Index";
export default async function Home() {
  return (
    <div className="relative">
      <Index />
      <footer className="w-100 p-lr-05">
        <FooterBottom />
      </footer>
    </div>
  );
}
