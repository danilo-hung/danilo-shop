import { createSelector } from "reselect";

const selectCategoriyReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoriyReducer],
    (categoryReducer) => categoryReducer.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories
        .reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc
        }, {})
)

// export const selectCategoriesMap = (state) => {
//     const categoriesMap = state.categories.categories
//         .reduce((acc, category) => {
//             const { title, items } = category;
//             acc[title.toLowerCase()] = items;
//             return acc
//         }, {})
//     console.log("selectCategoriesMap triggered, trurn categories array to object", categoriesMap)
//     return categoriesMap
// };