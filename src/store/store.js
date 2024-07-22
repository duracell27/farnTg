import { create } from 'zustand'

export const useFields = create((set) => ({
  taps: 0,
  fields: [
    { id: 1, crop: null, growtaps: 0 },
  ],

  updateTaps: (amount) => set((state) => ({taps: state.taps + amount})),

  plantCrop: (fieldId, crop) => set((state) => ({
    fields: state.fields.map((field) =>
      field.id === fieldId? {...field, crop: crop } : field
    ),
  })),

  harvestCrop: (fieldId) => set((state) =>({
    fields: state.fields.map((field) =>
      field.id === fieldId? {...field, crop: null, growtaps: 0 } : field
    ),
  })),

  updateFieldTaps: (fielId,amount) => set((state) => ({
    fields: state.fields.map((field) =>
      field.id === fielId? {...field, growtaps: field.growtaps + amount } : field
    ),

  }))
}))

export const useCrops = create((set) => ({
    crops: [
        {id: 1, name: 'Пшениця', img: 'Wheat.webp', tapsToGrow: 20},
        {id: 2, name: 'Кукурудза', img: 'Corn.webp', tapsToGrow: 50}
    ]
}))