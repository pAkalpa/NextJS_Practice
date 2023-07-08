import auth_data from "../data/token.json"

export const getAllEvents = async () => {
    const response = await fetch(`https://react-http-58d88-default-rtdb.firebaseio.com/events.json?access_token=${auth_data.token}`)

    const data = await response.json();
    const transformedEvents = [];

    for (const key in data) {
        transformedEvents.push({
            id: key,
            ...data[key]
        });
    }

    return transformedEvents;
}

export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export const getFilteredEvents = async (dateFilter) => {
    const allEvents = await getAllEvents();
    const { year, month } = dateFilter;

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export const getEventById = async (id) => {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export const getAuthToken = () => {
    return auth_data.token;
}