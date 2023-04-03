function ElasticRequest({ url, path }) {
  async function getResult(query) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      path,
      query,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (typeof result === "string") {
      return JSON.parse(result);
    } else {
      return result;
    }
  }

  function getRows(result) {
    return result.hits.hits.map((hit) => hit._source);
  }

  async function search(query) {
    const result = await getResult(query);
    const rows = getRows(result);
    return rows;
  }

  return { search };
}
