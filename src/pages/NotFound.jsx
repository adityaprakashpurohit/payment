import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-[clamp(8rem,20vw,20rem)] font-black text-muted leading-none tracking-tighter">404</h1>
      <h2 className="mt-8 text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
        PAGE NOT FOUND
      </h2>
      <p className="mt-6 text-xl font-bold uppercase tracking-tighter text-muted-foreground max-w-md">
        SORRY, WE COULDN'T FIND THE PAGE YOU'RE LOOKING FOR.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <Button onClick={() => navigate(-1)} variant="outline" className="flex-1 h-20 text-2xl">
          GO BACK
        </Button>
        <Button onClick={() => navigate("/login")} className="flex-1 h-20 text-2xl">
          LOGIN
        </Button>
      </div>
    </div>
  );
};
