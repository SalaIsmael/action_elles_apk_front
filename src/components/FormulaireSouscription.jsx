import { useState, useEffect } from "react";
import axios from "axios";

const SouscriptionForm = () => {
  // Étape actuelle (1 → Infos Véhicule, 2 → Infos Assuré, 3 → Validation)
  const [step, setStep] = useState(1);

  // État du formulaire de souscription
  const [souscription, setSouscription] = useState({
    dateMiseEnService: "",
    numeroImmatriculation: "",
    couleur: "",
    nombreSiege: "",
    nombrePorte: "",
    categorieVehiculeId: "",
    nomAssure: "",
    prenomAssure: "",
    telephone: "",
    adresse: "",
    ville: "",
    numeroCarteIdentite: ""
  });

  // État pour stocker les catégories de véhicules
  const [categoriesVehicules, setCategoriesVehicules] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  // Récupération des catégories de véhicules depuis l'API au montage du composant
  useEffect(() => {
    const fetchCategoriesVehicules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/categorievehicules");
        setCategoriesVehicules(response.data.$values); 
      } catch (error) {
        console.error("Erreur de chargement des catégories :", error);
        setErrorCategories("Impossible de charger les catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesVehicules();
  }, []);

  // Fonction pour changer d'étape
  const nextStep = () => {
    if (step === 1) {
      if (!souscription.dateMiseEnService || !souscription.numeroImmatriculation || !souscription.couleur || 
          souscription.nombreSiege < 1 || souscription.nombrePorte < 1 || !souscription.categorieVehiculeId) {
        alert("Veuillez remplir tous les champs obligatoires de l'étape 1 !");
        return;
      }
    }
  
    if (step === 2) {
      if (!souscription.adresse || !souscription.telephone || !souscription.nomAssure || 
          !souscription.prenomAssure || !souscription.numeroCarteIdentite || !souscription.ville) {
        alert("Veuillez remplir tous les champs obligatoires de l'étape 2 !");
        return;
      }
    }
  
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  // Fonction pour mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSouscription({ ...souscription, [name]: value });
  };

  // Envoi des données à l’API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/subscriptions", souscription);
      alert("Souscription réussie !");
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la souscription", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white py-10 px-20 rounded-2xl shadow-lg text-center max-w-screen-lg">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Souscription d'Assurance</h2>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Étape 1 : Informations du Véhicule</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input type="date" name="dateMiseEnService" value={souscription.dateMiseEnService} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" name="numeroImmatriculation" placeholder="Numéro d'immatriculation" value={souscription.numeroImmatriculation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" name="couleur" placeholder="Couleur" value={souscription.couleur} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <input type="number"
                 name="nombreSiege" 
                 placeholder="Nombre de sièges" 
                 value={souscription.nombreSiege} 
                 onChange={handleChange}
                 required 
                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
                 min="1" />
                <input type="number" name="nombrePorte" placeholder="Nombre de portes" value={souscription.nombrePorte} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required min="1" />

                {/* Liste déroulante des catégories de véhicules */}
                <select name="categorieVehiculeId" value={souscription.categorieVehiculeId } onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required>
                  <option value="">Sélectionnez une catégorie</option>
                  {loadingCategories ? (
                    <option>Chargement...</option>
                  ) : errorCategories ? (
                    <option disabled>{errorCategories}</option>
                  ) : (
                    categoriesVehicules.map((categorie) => (
                      <option key={categorie.categorieVehiculeId} value={categorie.categorieVehiculeId}>
                        {categorie.libelle}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </form>
            <button className="mt-4 mr-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600" onClick={() => window.history.back()}>
              Retour
            </button>
            <button onClick={nextStep} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
              Suivant
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Étape 2 : Informations de l'Assuré</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input type="text" name="adresse" placeholder="Adresse" value={souscription.adresse} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" name="telephone" placeholder="Téléphone" value={souscription.telephone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" name="nomAssure" placeholder="Nom" value={souscription.nomAssure} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input type="text"
                 name="prenomAssure"
                 placeholder="Prénom" 
                 value={souscription.prenomAssure} 
                 onChange={handleChange} 
                 required 
                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
                 />
                <input type="text" name="numeroCarteIdentite" placeholder="Numéro de carte d'identité" value={souscription.numeroCarteIdentite} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <input type="text" name="ville" placeholder="Ville" value={souscription.ville} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
            </form>
            <button onClick={prevStep} className="mt-4 mr-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
              Retour
            </button>
            <button onClick={nextStep} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
              Suivant
            </button>
          </div>
        )}

{step === 3 && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Étape 3 : Récapitulatif et Validation
    </h3>

    {/* Récapitulatif des informations du véhicule */}
    <div className="mb-2 p-4 border border-gray-300 rounded-md bg-gray-100">
      <h4 className="text-md font-semibold text-gray-700 mb-2">Informations du Véhicule</h4>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Date de mise en service :</strong> {souscription.dateMiseEnService}</p>
        <p><strong>Numéro d'immatriculation :</strong> {souscription.numeroImmatriculation}</p>
      </div>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Couleur :</strong> {souscription.couleur}</p>
        <p><strong>Nombre de sièges :</strong> {souscription.nombreSiege}</p>
      </div>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Nombre de portes :</strong> {souscription.nombrePorte}</p>
        <p><strong>Catégorie :</strong> {categoriesVehicules.find((c) => c.categorieVehiculeId === Number(souscription.categorieVehiculeId))?.libelle || "Non sélectionnée"}</p>
      </div>
    </div>

    {/* Récapitulatif des informations de l'assuré */}
    <div className="mb-2 p-4 border border-gray-300 rounded-md bg-gray-100">
      <h4 className="text-md font-semibold text-gray-700 mb-2">Informations de l'Assuré</h4>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Nom :</strong> {souscription.nomAssure}</p>
        <p><strong>Prénom :</strong> {souscription.prenomAssure}</p>
      </div>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Adresse :</strong> {souscription.adresse}</p>
        <p><strong>Téléphone :</strong> {souscription.telephone}</p>
      </div>
      <div className="grid grid-cols-2 mb-2">
        <p><strong>Ville :</strong> {souscription.ville}</p>
        <p><strong>Numéro de carte d'identité :</strong> {souscription.numeroCarteIdentite}</p>
      </div>
    </div>

    {/* Boutons de navigation */}
    <button onClick={prevStep} className="mt-4 mr-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
      Retour
    </button>
    <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
      Confirmer la souscription
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default SouscriptionForm;
