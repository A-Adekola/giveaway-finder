// src/components/Header.jsx
export default function Header({ onLogout }) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-600">🎁 Giveaway Finder</h1>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
}
