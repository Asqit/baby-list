import type { ListItem } from "../types.ts";
import { clsx } from "@nick/clsx";
import { useCallback, useEffect, useState } from "preact/hooks";

const initialItems: ListItem[] = [
  {
    id: 0,
    title: "Pacifiers",
    maxAmount: 1,
    amount: 0,
  },
  {
    id: 1,
    title: "Diapers",
    maxAmount: 5,
    amount: 0,
  },
];

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<typeof initialItems | undefined>();

  const handleReserve = (_id: number) => {
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setData(undefined);

      const data = await new Promise((resolve, _reject) => {
        setTimeout(() => resolve(initialItems), 5000);
      });
      setData(data as any);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul className="space-y-4">
      {isError && (
        <div className="bg-red-500 border-red-700 text-white p-2 rounded-lg border-2">
          <h2 className="text-xl font-medium tracking-tight mb-2">
            That is unfortunate
          </h2>
          <p>
            Some kind of error happened and we were unable to fetch the data
          </p>
        </div>
      )}
      {isLoading &&
        Array.from(Array(12).keys()).map((i) => (
          <div className="flex items-center justify-between bg-zinc-100 p-2 rounded-lg animate-pulse">
            <div className="space-y-2">
              <div className="bg-black w-14 h-4 rounded-lg" />
              <div className="bg-zinc-500 w-10 h-3 rounded-lg" />
            </div>
            <div
              className={clsx(
                "inline-block w-12 p-4 rounded-lg",
                i % 2 === 0 ? "bg-pink-500" : "bg-blue-500",
              )}
            />
          </div>
        ))}
      {data && data.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center justify-between bg-zinc-100 transition-colors hover:bg-zinc-200 p-2 rounded-lg"
        >
          <div>
            <h4 className="text-lg mb-2">{item.title}</h4>
            <p className="text-zinc-500 text-sm">
              {item.amount} of {item.maxAmount} available to reserve
            </p>
          </div>
          {item.amount < item.maxAmount && (
            <button
              type="button"
              class={clsx(
                "capitalize text-white rounded-lg px-4 py-2 hover:contrast-75 transition-colors",
                index % 2 === 0 ? "bg-pink-500" : "bg-blue-500",
              )}
              onClick={() => handleReserve(item.id)}
            >
              reserve
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
