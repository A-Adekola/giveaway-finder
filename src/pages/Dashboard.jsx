import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Dummy data for giveaways
const MOCK_GIVEAWAYS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Giveaway #${i + 1}`,
  description: `This is giveaway number ${i + 1}`,
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const [giveaways, setGiveaways] = useState(MOCK_GIVEAWAYS);
  const [reservations, setReservations] = useState([]);
  const observerRef = useRef();

  const reserveItem = (item) => {
    if (reservations.length >= 5 || reservations.find((r) => r.id === item.id))
      return;

    const reservedAt = Date.now();
    setReservations([...reservations, { ...item, reservedAt }]);
  };

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = reservations
        .map((r) => {
          const timeLeft = 300 - Math.floor((Date.now() - r.reservedAt) / 1000);
          return { ...r, timeLeft };
        })
        .filter((r) => r.timeLeft > 0);
      setReservations(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [reservations]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const claimItem = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    alert(`Claimed item #${id}`);
  };

  // Infinite scroll mock
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const nextBatch = giveaways.length + 1;
        const more = Array.from({ length: 10 }, (_, i) => ({
          id: nextBatch + i,
          title: `Giveaway #${nextBatch + i}`,
          description: `This is giveaway number ${nextBatch + i}`,
        }));
        setGiveaways((prev) => [...prev, ...more]);
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.disconnect();
    };
  }, [giveaways]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Reservation Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-md border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">My Reservations</h2>
        {reservations.length === 0 && <p>No items reserved.</p>}
        {reservations.map((r) => (
          <div key={r.id} className="border p-2 rounded shadow">
            <p className="font-bold">{r.title}</p>
            <p className="text-sm text-gray-600">
              Time left: {formatTime(r.timeLeft)}
            </p>
            <button
              onClick={() => claimItem(r.id)}
              className="mt-1 bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              Claim
            </button>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Giveaway Finder</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Giveaway Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {giveaways.map((item) => {
            const isReserved = reservations.find((r) => r.id === item.id);
            return (
              <div key={item.id} className="bg-white p-4 rounded shadow">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <button
                  onClick={() => reserveItem(item)}
                  className={`mt-2 px-3 py-1 text-white text-sm rounded ${
                    isReserved || reservations.length >= 5
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isReserved || reservations.length >= 5}
                >
                  {isReserved ? "Reserved" : "Reserve"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={observerRef} className="h-10"></div>
      </div>
    </div>
  );
}
