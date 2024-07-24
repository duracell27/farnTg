"use client"
import { useProductionBuildings } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

const Production = () => {

  const { data } = useSession();

  const buildings = useProductionBuildings((state) => state.buildings);
  const userBuildings = useProductionBuildings((state) => state.userBuildings);

  const getUserBuildings = useProductionBuildings((state) => state.getUserBuildings);
  const getBuildings = useProductionBuildings((state) => state.getBuildings);

  useEffect(() => {
    if (data) {
    getBuildings();
    getUserBuildings(data.user.id);}
  }, [data?.user?.id]);

  return (
    <div className="bg-[#f4a460] grow">
      <h1 className="text-black text-center">Виробництва</h1>
      {buildings && buildings.map((building) => (
        <div key={building._id} className="mb-3 text-black flex items-center gap-3">
          <div className="">
            <Image src={`/img/production/${building.img}`} width={80} height={80} alt="production" />
          </div>
          <div className="">
            <p><strong>{building.name}</strong></p>
            <p>Потрібний рівень: {building.lvl}</p>
            <p>Ціна: {building.price}</p>
          </div>
          <span className="bg-green-400 text-black px-1 rounded-lg p-1 left-[35px] bottom-0 text-sm">Купити</span>
        </div>
      ))}

      
      {userBuildings && userBuildings.map((building) => (
        <div key={building._id} className="mb-3 text-black">
          <p>{building.name}</p>
         
        </div>
      ))}
    </div>
  );
};

export default Production;
