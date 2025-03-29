const formatDate = (date) => {
    return new Date(date).toLocaleString();
};
const formatSrc = (src) => {
    return process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROXY_TARGET + src : src
}
export { formatDate, formatSrc };