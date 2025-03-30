const formatDate = (date) => {
    
    return new Date(date).toLocaleString();
};
const formatSRC = (src) => {
    return process.env.NODE_ENV === 'production' ?  process.env.VUE_APP_BASE_URL + src : src;
};
export { formatDate, formatSRC };