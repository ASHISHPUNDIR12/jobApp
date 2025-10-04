import MovingCompanies from "@/components/MovingCompanies";
import Image from "next/image";
import banner from "@/public/banner.jpeg";
import Acordian from "@/components/Acordian";
import Homebtn from "@/components/HomeBtn";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div>
      <div className="text-center mt-10 md:mt-30 px-4">
        {/* Hero text */}
        <p className="text-4xl md:text-8xl font-bold leading-tight">
          Find Your Dream Job
        </p>
        <p className="text-4xl md:text-8xl font-bold leading-tight">
          and get Hired
        </p>

        <p className="mt-6 md:mt-10 font-semibold text-sm md:text-base">
          Explore Thousands of job listings or find the perfect candidate
        </p>

        {/* CTA Button */}
        <div className="mt-6 md:mt-10  "  >
          <Homebtn />
        </div>

        {/* Moving companies */}
        <div className="mt-10 md:mt-15">
          <MovingCompanies />
        </div>

        {/* Banner image */}
        <div className="mt-8">
          <Image
            className="mx-auto rounded w-full max-w-[900px] h-auto"
            src={banner}
            alt="banner"
            priority
          />
        </div>

        {/* Features section */}
        <div className="flex flex-col md:flex-row justify-center gap-5 mt-10 px-4">
          <div className="border border-black py-5 px-6 md:px-28 text-center md:text-left rounded-md">
            <p className="text-xl md:text-2xl font-semibold">For Job Seekers</p>
            <p className="text-sm md:text-base">
              Search and apply for jobs, track applications, and more.
            </p>
          </div>
          <div className="border border-black py-5 px-6 md:px-28 text-center md:text-left rounded-md">
            <p className="text-xl md:text-2xl font-semibold">For Employers</p>
            <p className="text-sm md:text-base">
              Post jobs, manage applications, and find the best candidates.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-[90%] md:max-w-[85%] mx-auto mt-10">
          <Acordian />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <Footer />
      </div>
    </div>
  );
}
