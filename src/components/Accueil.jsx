import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">NSIAGO'ASSUR</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Simulez votre assurance auto en un clic 
        </h2>
        <p className="text-gray-600 mb-6">
          Obtenez un devis rapide et précis pour protéger votre véhicule en toute sérénité.
        </p>
        <p className="font-bold text-gray-700 mb-6">
          Comparez, choisissez, assurez-vous !
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/simulation")}
          >
            Simulation
          </button>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => navigate("/souscription")}
          >
            Souscription
          </button>
        </div>
      </div>
    </div>
  );
}
