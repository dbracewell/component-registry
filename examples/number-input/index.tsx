"use client";
import { NumberInput } from "@/registry/new-york/number-input/number-input";
import React, { useState } from "react";

export const NumberInputExample = () => {
   const [minValue, setMinValue] = useState<number | null>(0);
   const [maxValue, setMaxValue] = useState<number | null>(10);
   const [numericValue, setNumericValue] = useState<number | null>(0);
   return (
      <>
         <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-1">
               Min. Value:
               <NumberInput value={minValue} onChange={setMinValue} />
            </div>
            <div className="flex flex-col items-start gap-1">
               Max. Value:
               <NumberInput value={maxValue} onChange={setMaxValue} />
            </div>
         </div>
         <NumberInput
            min={minValue}
            max={maxValue}
            value={numericValue}
            onChange={setNumericValue}
         />
      </>
   );
};
