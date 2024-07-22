"use client";
import { useCrops, useFields } from "@/store/store";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [cropPopup, setCropPopup] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const taps = useFields((state) => state.taps);
  const crops = useCrops((state) => state.crops);
  const updateTaps = useFields((state) => state.updateTaps);
  const updateFieldTaps = useFields((state) => state.updateFieldTaps);
  const harvestCrop = useFields((state) => state.harvestCrop);
  const plantCrop = useFields((state) => state.plantCrop);
  const fields = useFields((state) => state.fields);

  console.log("FIELD", fields);

  return (
    <>
      <div className="bg-[#90ee90] grow flex justify-center flex-col items-center">
        <p>{taps}</p>
        {fields?.length > 0 &&
          fields.map((field) => (
            <div
              key={field.id}
              className="size-20 bg-amber-800 flex justify-center items-center"
              onClick={() => {
                if (
                  field.crop !== null &&
                  field.growtaps < field.crop.tapsToGrow
                ) {
                  updateFieldTaps(field.id, 1);
                }
              }}
            >
              {field.crop === null && (
                <p
                  onClick={() => {
                    setCropPopup(true), setActiveField(field.id);
                  }}
                  className="p-9"
                >
                  +
                </p>
              )}
              {field.crop !== null &&
                field.growtaps < field.crop.tapsToGrow && (
                  <div>
                    <Image
                      src={`/img/crops/${field.crop.img}`}
                      width={60}
                      height={60}
                      alt="fieldCrop"
                      className=""
                    />
                    <p>
                      {field.growtaps} / {field.crop.tapsToGrow}
                    </p>
                  </div>
                )}
              {field.crop !== null &&
                field.growtaps >= field.crop.tapsToGrow && (
                  <div onClick={() => harvestCrop(field.id)} className="p-9">
                    -
                  </div>
                )}
            </div>
          ))}
      </div>

      {/* <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCropPopup(!cropPopup)}
      >
        Toggle Crop Popup
      </button> */}

      {/* Darkened overlay */}
      {cropPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => {
            setCropPopup(false), setActiveField(null);
          }}
        ></div>
      )}

      {/* Popup container */}
      <div
        className={`fixed min-w-[320px] w-full mx-auto bottom-0 left-0 right-0 bg-slate-500 border-t border-gray-300 transition-transform transform ${
          cropPopup ? "translate-y-0" : "translate-y-full"
        } h-3/4 overflow-y-auto`}
      >
        {crops?.length > 0 &&
          crops.map((crop) => (
            <div
              key={crop.id}
              className="border bg-slate-500 border-black p-4 flex items-center gap-3"
            >
              <div className="">
                <Image
                  src={`/img/crops/${crop.img}`}
                  width={60}
                  height={60}
                  alt="cropImg"
                  className=""
                />
              </div>
              <div className="">
                <p className="font-bold text-yellow-300">{crop.name}</p>
                <p>Тапів до дозрівання: {crop.tapsToGrow}</p>
              </div>
              <button
                onClick={() => {
                  plantCrop(activeField, crop),
                    setActiveField(null),
                    setCropPopup(false);
                }}
                className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                Садити
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
