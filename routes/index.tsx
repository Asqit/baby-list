import ItemList from "../islands/item-list.tsx";

export default function Index() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-pink-200 min-h-[100dvh] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-8 text-4xl font-bold tracking-tight">
          Baby Shower Gift Registry
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
          <h3 className="font-black text-zinc-800">Gift Ideas</h3>
          <ItemList />
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>Don't forget to bring your love and best wishes too! 💖💙</p>
      </div>
    </div>
  );
}
