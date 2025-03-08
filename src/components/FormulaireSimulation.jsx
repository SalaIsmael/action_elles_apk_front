import { useState, useEffect } from "react";
import axios from "axios";

const SimulationForm = () => {
  const [formData, setFormData] = useState({
    produitAssuranceId: "",
    dateMiseEnService: "",
    puissanceVehicule: 0,
    valeurVehicule: 0,
    valeurActuelleVehicule: 0,
  });

  const [produits, setProduits] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/produitsassurances")
      .then((response) => {
        console.log("Données reçues :", response.data);
        setProduits(response.data.$values);
      })
      .catch((error) => console.error("Erreur de chargement des produits:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dateMiseEnService" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.produitAssuranceId ||
      !formData.dateMiseEnService ||
      formData.puissanceVehicule <= 0 ||
      formData.valeurVehicule <= 0 ||
      formData.valeurActuelleVehicule <= 0
    ) {
      setError("Tous les champs sont obligatoires et doivent contenir des valeurs valides.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/simulations", {
        ...formData,
        dateMiseEnService: new Date(formData.dateMiseEnService).toISOString(),
      });

      setResult(response.data);
    } catch (err) {
      setError("Erreur lors de la simulation. Vérifiez les données.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white py-10 px-5 rounded-2xl shadow-lg text-center max-w-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Simulation d'Assurance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
 
  <div className="grid grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Produit d'Assurance:
      </label>
      <select
        name="produitAssuranceId"
        value={formData.produitAssuranceId}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Sélectionnez un produit</option>
        {produits.map((produit) => (
          <option key={produit.produitAssuranceId} value={produit.produitAssuranceId}>
            {produit.nomProduitAssurance}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Date de Mise en Service:
      </label>
      <input
        type="date"
        name="dateMiseEnService"
        value={formData.dateMiseEnService}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  
  <div className="grid grid-cols-3 gap-6">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Puissance du Véhicule (en CV):
      </label>
      <input
        type="number"
        name="puissanceVehicule"
        value={formData.puissanceVehicule}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="1"
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Valeur du Véhicule <br /> (en FCFA):
      </label>
      <input
        type="number"
        name="valeurVehicule"
        value={formData.valeurVehicule}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="1"
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Valeur Vénale <br /> (en FCFA):
      </label>
      <input
        type="number"
        name="valeurActuelleVehicule"
        value={formData.valeurActuelleVehicule}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="1"
      />
    </div>
  </div>
  <button  className="mt-4 mr-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600" onClick={() => window.history.back()}>Retour</button>
  <button type="submit"  className="mt-4 mr-4  bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading}>
    {loading ? "Calcul en cours..." : "Simuler"}</button>
  {/* <button
    type="submit"
    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={loading}
  >
    {loading ? "Calcul en cours..." : "Simuler"}
  </button> */}
</form>


      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Résultat:</h3>
          <p>
            <strong className="font-medium">Référence:</strong> {result.quoteReference}
          </p>
          <p>
            <strong className="font-medium">Prime:</strong> {result.price} FCFA
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default SimulationForm;
