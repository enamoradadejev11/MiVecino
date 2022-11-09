import { addressDefaultValues } from "../UserProfile/userProfileUtils";

export const convertToAddress = (data) => {
  const { place_type, context, text_es } = data;
  if (place_type[0] === "address") {
    return {
      name: "",
      alias: "",
      street: text_es,
      extNumber: data.address,
      colony: "",
      state: context[2]?.text_es,
      country: context[3]?.text_es,
      zipCode: context[0]?.text,
      reference: "",
      city: context[1]?.text,
      telephone: "",
      location: [data?.center[0].toString(), data?.center[1].toString()],
    };
  } else if (place_type[0] === "postcode") {
    return {
      name: "",
      alias: "",
      street: "",
      extNumber: "",
      colony: "",
      state: context[1]?.text_es,
      country: context[2]?.text_es,
      zipCode: text_es,
      reference: "",
      city: context[0]?.text,
      telephone: "",
      location: [data?.center[0].toString(), data?.center[1].toString()],
    };
  }
  return addressDefaultValues;
};
