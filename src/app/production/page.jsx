"use client";
import { useProductionBuildings } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Production = () => {
  const [buildingPopup, setBuildingPopup] = useState(false);
  const { data } = useSession();

  const buildings = useProductionBuildings((state) => state.buildings);
  const userBuildings = useProductionBuildings((state) => state.userBuildings);
  const productsForBuilding = useProductionBuildings((state) => state.productsForBuilding)

  const getUserBuildings = useProductionBuildings( (state) => state.getUserBuildings);
  const getBuildings = useProductionBuildings((state) => state.getBuildings);
  const buildBuilding = useProductionBuildings((state)=> state.buildBuilding);
  const getProductsForBuilding = useProductionBuildings((state) => state.getProductsForBuilding);

  useEffect(() => {
    if (data) {
      getBuildings();
      getUserBuildings(data.user.id);
    }
  }, [data?.user?.id]);

  return (
    <div className="bg-[#f4a460] grow text-black">
      <h1 className=" text-center">Виробництва</h1>
      <div className="border border-black">
        Можна купити
        {buildings &&
          buildings.map((building) => (
            <div
              key={building._id}
              className="mb-3 text-black flex items-center gap-3"
            >
              <div className="">
                <Image
                  src={`/img/production/${building.img}`}
                  width={80}
                  height={80}
                  alt="production"
                />
              </div>
              <div className="">
                <p>
                  <strong>{building.name}</strong>
                </p>
                <p>Потрібний рівень: {building.lvl}</p>
                <p>Ціна: {building.price}</p>
              </div>
              <span onClick={()=>buildBuilding(data.user.id, building.type)} className="bg-green-400 text-black px-1 rounded-lg p-1 left-[35px] bottom-0 text-sm">
                Купити
              </span>
            </div>
          ))}
      </div>

      <div className="border border-black">
        Ваші Виробництва
        {userBuildings &&
          userBuildings.map((building) => (
            <div
              key={building._id}
              className="mb-3 text-black flex items-center gap-3"
            >
              <div className="">
                <Image
                  src={`/img/production/${building.building.img}`}
                  width={80}
                  height={80}
                  alt="production"
                />
              </div>
              <div className="">
                <p>
                  <strong>{building?.building?.name}</strong>
                </p>
                <p>Виробити: </p>
                <div className="size-16 bg-[#ca803f] flex justify-center items-center">
                  <span onClick={()=>{setBuildingPopup(true);getProductsForBuilding(building.building.type)}} className="text-2xl">+</span>
                </div>
              </div>
              
            </div>
          ))}
      </div>

      {buildingPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setBuildingPopup(false)
              
            }}
          ></div>
        )}

        {/* Popup container */}
        <div
          className={`fixed min-w-[320px] w-full mx-auto bottom-0 left-0 right-0 bg-slate-500 border-t border-gray-300 transition-transform transform ${
            buildingPopup ? "translate-y-0" : "translate-y-full"
          } h-3/4 overflow-y-auto`}
        >
          {productsForBuilding &&
            productsForBuilding.map((product) => (
              <div key={product._id} className="flex items-center gap-3 border border-black mb-1">
                <div className="">
                  <Image src={`/img/product/${product.img}`} width={40} height={40} alt="product" />
                </div>
                <span> = </span>
                <div className="">
                {product.needs.map((productNeed) => (
                  <div className="flex items-center">
                  <Image src={`/img/crops/${productNeed.crop.img}`} width={40} height={40} alt="product"/>
                   x {productNeed.amount}</div>
                ))}
                </div>
                <span> + </span>
                <div className="">
                  {product.tapsToProduce} Тапів
                </div>
                <div className="bg-green-400 text-black text-sm p-1 rounded-lg">Виготовити</div>
              </div>
            ))}
        </div>
    </div>
  );
};

export default Production;
