"use client";

import { LoadingButton } from "@/registry/new-york/loading-button/loading-button";
import React, { useState } from "react";

export const LoadingButtonExample = () => {
   const [isLoading, setIsLoading] = useState(false);
   return (
      <LoadingButton
         isLoading={isLoading}
         onClick={() => setIsLoading((prev) => !prev)}
      >
         Click Me
      </LoadingButton>
   );
};
