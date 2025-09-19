"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function LoginBtn() {

  return (
   <Button onClick={()=>{
    signIn("google",{callbackUrl: "/validate"})
   }} >
    <span className="mr-2">G</span>Sign in with google 
   </Button>
  );
}
