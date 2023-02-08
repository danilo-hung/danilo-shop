export const selectCategoriesMap = (state) => {

    console.log('selecter triggered, turn map categories array to map and return map')
    return state.categories.categories
        .reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc
        }, {})
};