const formatDate = (date) => {
    return new Date(date).toLocaleString();
};
<<<<<<< HEAD
const formatSrc = (src) => {
    return process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROXY_TARGET + src : src
}
export { formatDate, formatSrc };
=======
const formatSRC = (src) => {
    // return process.env.VUE_APP_API_BASE_URL  ? process.env.VUE_APP_API_BASE_URL + src : src;
    return  process.env.VUE_APP_API_BASE_URL + src
};
export { formatDate, formatSRC };
>>>>>>> 509820a0a2dcb0a47b8fe17f5da39a5ad40a6db2
