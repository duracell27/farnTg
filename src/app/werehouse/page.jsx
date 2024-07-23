'use client'
import { useWerehouse } from "@/store/store";
import React from "react";

const Werehouse = () => {
  // const silo = useWerehouse((state) => state.silo);

  return (
    <div className="bg-[#87cefa] grow">
      <div className="">
        <h1 className="text-black text-center">Амбар</h1>
        {/* {silo.length > 0 &&
          silo.map((item) => {
            if (item.amount > 0) {
              return (
                <div key={item.id} className="mb-3">
                  <p>
                    {item.name} - {item.amount}
                  </p>
                </div>
              );
            }
            return null;
          })} */}
          
      </div>
    </div>
  );
};

export default Werehouse;
