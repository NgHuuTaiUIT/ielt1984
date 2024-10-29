import React from "react";

function useFetch<T>({ url }: { url: string }) {
  const [data, setData] = React.useState<T | null>(null);
  const [isFetched, setIsFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => {
        setIsLoading(false);
        setIsFetched(true);
      });
  }, [url]);
  return { data, isFetched, isLoading };
}

export default useFetch;
