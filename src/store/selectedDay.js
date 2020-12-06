export const setSelectedDay = day => ({
    day,
    type: "SELECTED_DAY"
});

const getSelectedDay = (day = new Date(), action) => {
    switch (action.type) {
        case "SELECTED_DAY":
            return action.day;
        default:
            return day;
    }
}

export default getSelectedDay;