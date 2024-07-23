"use client";
import { useCrops, useFields } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [cropPopup, setCropPopup] = useState(false);
  const { data } = useSession();

  const fields = useFields((state) => state.fields);
  const getUserFields = useFields((state) => state.getUserFields);
  const plantField = useFields((state) => state.plantField)
  const harvestField = useFields((state) => state.harvestField)
  const updateField = useFields((state) => state.updateField)

  const crops = useCrops((state) => state.crops);
  const getCrops = useCrops((state) => state.getCrops);

  const [activeField, setActiveField] = useState(null);

  const updateFieldHandler = async (fieldId) => {
    await updateField(fieldId, data.user.id, 1)
    await getUserFields(data.user.id)
  }

  const plantHandler = async (cropId) =>{
    
    await plantField(cropId, activeField, data.user.id, 'plant')
    await getUserFields(data.user.id)
    setCropPopup(false);
    setActiveField(null);
  }

  const harvestHandler = async (cropId, fieldId) =>{
    
    await harvestField(cropId, fieldId, data.user.id, 'harvest')
    await getUserFields(data.user.id)
    setActiveField(null);
  }

  useEffect(() => {
    if (data) {
      
      getUserFields(data.user.id);
      getCrops();
    }
  }, [data]);

  return (
    <>
      <div className="bg-[#90ee90] grow flex justify-center flex-col items-center">
        {/* fields */}
        {fields &&
          fields.map((field) => (
            <div className="">
              {field.status === "empty" && (
                <div
                  onClick={() => {
                    setCropPopup(true);
                    setActiveField(field._id);
                  }}
                  className="relative"
                >

                  <Image
                    src={"/img/field/Field.webp"}
                    width={150}
                    height={150}
                    alt="Field"
                  />
                  <span className="bg-green-400 text-black px-1 rounded-lg absolute left-[35px] bottom-0 text-sm">Посадити</span>
                </div>
              )}
              {field.status === "grow" && (
                <div onClick={()=>updateFieldHandler(field._id)} className="relative">
                  <Image
                    src={"/img/field/Field.webp"}
                    width={150}
                    height={150}
                    alt="Field"
                  />
                  <Image 
                  className="absolute top-[70px] left-[74px] transform -translate-x-1/2 -translate-y-1/2"
                    src={`/img/crops/${field.crop.img}`}
                    width={50}
                    height={50}
                    alt="Crop"
                  />
                  <span className="bg-green-400 text-black px-1 rounded-lg absolute left-[45px] bottom-0">{field.tapsOnField} / {field.crop.tapsToGrow}</span>
                </div>
              )}
              {field.status === "ready" && (
                <div onClick={()=>harvestHandler(field.crop._id, field._id)} className="relative">
                  <Image
                    src={"/img/field/Field.webp"}
                    width={150}
                    height={150}
                    alt="Field"
                  />
                  <Image 
                  className="absolute top-[70px] left-[74px] transform -translate-x-1/2 -translate-y-1/2"
                    src={`/img/crops/${field.crop.img}`}
                    width={50}
                    height={50}
                    alt="Crop"
                  />
                  <span className="bg-green-400 text-black px-1 rounded-lg absolute left-[45px] bottom-3">Зібрати</span>
                </div>
              )}
            </div>
          ))}

        {cropPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setCropPopup(false)
              setActiveField(null);
            }}
          ></div>
        )}

        {/* Popup container */}
        <div
          className={`fixed min-w-[320px] w-full mx-auto bottom-0 left-0 right-0 bg-slate-500 border-t border-gray-300 transition-transform transform ${
            cropPopup ? "translate-y-0" : "translate-y-full"
          } h-3/4 overflow-y-auto`}
        >
          {crops &&
            crops.map((crop) => (
              <div className="flex items-center gap-3 border border-black mb-1">
                <div className="">
                  <Image src={`/img/crops/${crop.img}`} width={60} height={60} alt="Crop" />
                </div>
                <div className="">
                  <p><strong>{crop.name}</strong></p>
                  <p>Тапів до сходу: {crop.tapsToGrow}</p>
                </div>
                <div className="">
                  <button onClick={()=>plantHandler(crop._id)} className="bg-green-300 text-black p-1 rounded-lg">Посадити</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
