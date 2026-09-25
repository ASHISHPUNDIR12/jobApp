import MovingCompanies from "@/components/MovingCompanies";
import Image from "next/image";
import banner from "@/public/banner.jpeg";
import Acordian from "@/components/Acordian";
import Homebtn from "@/components/HomeBtn";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <div className="content-shell pt-16 text-center sm:pt-24">
        {/* Hero text */}
        <p className="eyebrow">A better way to work</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-7xl lg:text-8xl">
          Find your next <span className="text-primary">great fit.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Explore standout opportunities, discover talented people, and take the next step with confidence.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Homebtn />
        </div>

        {/* Moving companies */}
        <div className="mx-auto mt-16 max-w-5xl">
          <MovingCompanies />
        </div>

        {/* Banner image */}
        <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-2 shadow-2xl shadow-indigo-950/10">
          <Image
            className="mx-auto h-auto w-full rounded-2xl object-cover"
            src={banner}
            alt="A team collaborating at work"
            priority
          />
        </div>

        {/* Features section */}
        <div className="mt-12 grid gap-5 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-7">
            <p className="text-xl font-bold text-slate-950 md:text-2xl">For job seekers</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
              Search and apply for jobs, track applications, and more.
            </p>
          </div>
          <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-7">
            <p className="text-xl font-bold text-slate-950 md:text-2xl">For employers</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
              Post jobs, manage applications, and find the best candidates.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-20 max-w-3xl text-left">
          <p className="eyebrow text-center">Good to know</p>
          <h2 className="mb-5 mt-2 text-center text-3xl font-bold tracking-tight text-slate-950">Questions, answered.</h2>
          <Acordian />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center">
        <Footer />
      </div>
    </div>
  );
}
