const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

const formatSRC = (src) => {
    return  process.env.VUE_APP_API_BASE_URL + src
};
export { formatDate, formatSRC };

