async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

export default fetchData;
