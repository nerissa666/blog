const formatDate = (date) => {
    
    return new Date(date).toLocaleString();
};
const formatSRC = (src) => {
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    console.log( process.env.VUE_APP_API_BASE_URL + src, ' process.env.VUE_APP_API_BASE_URL + src');
    return process.env.NODE_ENV === 'production' ?  process.env.VUE_APP_API_BASE_URL + src : src;
};
export { formatDate, formatSRC };