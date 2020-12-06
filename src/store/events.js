export const setEvents = events => ({
    type: "EVENT",
    events
});

const getEvents = (events = [], action) => {
    switch (action.type) {
        case "EVENT":
            return action.events;
        default:
            return events;
    }
}

export default getEvents;