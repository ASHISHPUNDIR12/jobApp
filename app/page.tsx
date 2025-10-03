import MovingCompanies from "@/components/MovingCompanies";
import Image from "next/image";
import banner from "@/public/banner.jpeg";
import Acordian from "@/components/Acordian";
import Homebtn from "@/components/HomeBtn";
import Footer from "@/components/Footer";
export default async function Home() {
  return (
    <div className="">
      <div className="text-center mt-30">
        <p className="text-8xl font-bold">Find Your Dream Job</p>
        <p className="text-8xl font-bold">and get Hired</p>
        <p className="mt-10 font-semibold ">
          Explore Thaosands of job listing or find the perfect candidate
        </p>
        <Homebtn />
        <div className="mt-15">
          <MovingCompanies />
        </div>
        <Image className="mx-auto rounded " src={banner} alt="banner" />
        <div className="flex justify-center gap-5 mt-10 ">
          <div className="border border-black  py-5 px-28 ">
            <p className="text-2xl font-semibold">For job Seeker</p>
            <p>Search and apply for jobs, track applications, and more.</p>
          </div>
          <div className="border border-black  py-5 px-28">
            <p className="text-2xl font-semibold">For Employers</p>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </div>
        </div>
        <div className=" max-w-[85%] mx-auto mt-10">
          <Acordian />
        </div>
      </div>
      <div className="text-center">
        <Footer />
      </div>
    </div>
  );
}
