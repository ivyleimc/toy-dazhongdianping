const getProductLikesUrl = (rowIndex, pageSize) => {
    return `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`;
};
const getProductDiscountsUrl = () => {
    return `/mock/products/discounts.json`;
};
const getProductDetailUrl = (id) => {
    return `/mock/product_detail/${id}.json`;
};
const getShopUrl = (id) => {
    return `/mock/shops/${id}.json`;
};
const getPopularKeywordsUrl = () => {
    return `/mock/keywords/popular.json`;
};
const getRelatedKeywordsUrl = (text) => {
    return `/mock/keywords/related.json?text=${text}`;
};
const getRelatedShopsUrl = (text) => {
    return `/mock/shops/related.json?text=${text}`;
};
const getOrdersUrl = () => {
    return `/mock/orders/orders.json`;
};
export {
    getProductLikesUrl,
    getProductDiscountsUrl,
    getProductDetailUrl,
    getShopUrl,
    getPopularKeywordsUrl,
    getRelatedKeywordsUrl,
    getRelatedShopsUrl,
    getOrdersUrl
};