import { Camper } from "./api";

export const amenities: { key: keyof Camper; label: string; iconId: string }[] =
  [
    { key: "AC", label: "AC", iconId: "icon-wind" },
    { key: "bathroom", label: "Bathroom", iconId: "icon-shower" },
    { key: "kitchen", label: "Kitchen", iconId: "icon-cup" },
    { key: "TV", label: "TV", iconId: "icon-tv" },
    { key: "radio", label: "Radio", iconId: "icon-radio" },
    { key: "refrigerator", label: "Refrigerator", iconId: "icon-fridge" },
    { key: "microwave", label: "Microwave", iconId: "icon-microwave" },
    { key: "gas", label: "Gas", iconId: "icon-gas" },
    { key: "water", label: "Water", iconId: "icon-water" },
  ];
