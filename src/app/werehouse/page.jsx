"use client";
import { useWerehouse } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

const Werehouse = () => {
  const { data } = useSession();
  const silo = useWerehouse((state) => state.silo);
  const getUserSilo = useWerehouse((state) => state.getUserSilo);

  useEffect(() => {
    if (data) {
      getUserSilo(data.user.id);
    }
  }, [data?.user?.id]);

  console.log("silo", silo);

  return (
    <div className="bg-[#87cefa] grow">
      <div className="">
        <h1 className="text-black text-center">Амбар</h1>
        {silo &&
          silo.map((item) => (
            <div key={item.id} className="mb-3 text-black flex items-center gap-3">
              <div className="">
                  <Image src={`/img/crops/${item.crop.img}`} width={60} height={60} alt="Crop" />
                </div>
                <div className="">
                  <p><strong>{item.crop.name}</strong></p>
                  <p>кількість: {item.amount}</p>
                </div>
                <div className="">
                  <button  className="bg-green-300 text-black p-1 rounded-lg">Продати</button>
                </div>
            </div>
          ))}
          {(!silo || silo.length=== 0) && (<p className="text-black">Амбар пустий</p>)}
      </div>
    </div>
  );
};

export default Werehouse;
