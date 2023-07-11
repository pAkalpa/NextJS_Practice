import auth_data from "../data/token.json";
import crypto from "crypto";

const UUIDv4Generator = () => {
  const randomBytes = crypto.randomBytes(16);
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 1

  const bytesToHex = (bytes) =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

  const uuid = `${bytesToHex(randomBytes.subarray(0, 4))}-${bytesToHex(
    randomBytes.subarray(4, 6)
  )}-4${bytesToHex(randomBytes.subarray(6, 8))}-${bytesToHex(
    randomBytes.subarray(8, 10)
  )}-${bytesToHex(randomBytes.subarray(10, 16))}`;

  return uuid;
};

export const getAllEvents = async () => {
  const response = await fetch(
    `https://react-http-58d88-default-rtdb.firebaseio.com/events.json?access_token=${auth_data.token}`
  );

  const data = await response.json();
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEvents;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getFilteredEvents = async (dateFilter) => {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getAuthToken = () => {
  return auth_data.token;
};
