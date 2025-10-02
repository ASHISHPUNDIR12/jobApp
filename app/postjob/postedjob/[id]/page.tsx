import { Application } from "@/app/generated/prisma";
import ApplicationCard from "@/components/ApplicationCard";
import {prisma} from "@/lib/prisma";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default async function recruiterDetailJobPage(props: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await props.params;
  async function focusedJob(jobId: string) {
    try {
      const detailjob = await prisma.job.findFirst({
        where: { id: jobId },
      });
      return detailjob;
    } catch (err) {
      console.error("error", err);
    }
  }
  async function applications(jobId : string){
        try{
            const peopleWhoApplied = await prisma.application.findMany({
            where:{
                jobId : jobId
            },include:{
                user : true
            }
        })
        return peopleWhoApplied
        }catch(err){
            console.error("error fetching applications" , err)
        }
  }
  
  const applicants = await applications(id)
    const detailjob = await focusedJob(id);
      if (!detailjob) {
      return (
        <div className="text-center p-10">
          <h1 className="text-2xl font-bold">Job Not Found</h1>
          <p>Sorry, the job you are looking for does not exist.</p>
        </div>
      );
    }
  
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
          {detailjob?.companyName}
        </h1>
  
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
            {detailjob?.title}
          </h2>
          <div className="mt-4 md:mt-0">
            <Image
              width={100}
              height={60}
              src={detailjob?.image || "pvt"}
              alt="company logo"
              className="object-contain"
            />
          </div>
        </div>
  
        <div className="flex items-center text-gray-600 mb-6">
          <CiLocationOn className="mr-2 text-xl" />
          <span>{detailjob?.location}</span>
        </div>
  
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">About the Job</h3>
          <p className="text-gray-700 leading-relaxed">
            {detailjob?.description}
          </p>
        </div>
        {applicants?.map((a)=> <ApplicationCard key={a.id} data = {a} candidateData = {a.user} /> )}
      </div>
    );
  }
  