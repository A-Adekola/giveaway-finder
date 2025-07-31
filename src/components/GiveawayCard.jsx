// src/components/GiveawayCard.jsx
export default function GiveawayCard({
  giveaway,
  onReserve,
  isReserved,
  disabled,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-[300px]">
      <h2 className="text-lg font-bold">{giveaway.title}</h2>
      <p className="text-gray-500">{giveaway.description}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={disabled}
        onClick={() => onReserve(giveaway)}
      >
        {isReserved ? "Reserved" : "Reserve"}
      </button>
    </div>
  );
}
