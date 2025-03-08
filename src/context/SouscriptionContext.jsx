import React, { createContext, useState, useContext } from "react";

// 🔹 Création du contexte avec une valeur par défaut
const SubscriptionContext = createContext(null);

// 🔹 Provider du contexte
export const SubscriptionProvider = ({ children }) => {
    const [subscriptionData, setSubscriptionData] = useState({
        vehicle: {
            registrationNumber: "",
            firstRegistrationDate: "",
            color: "",
            seats: 0,
            doors: 0,
            categoryId: "",
        },
        user: {
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
        },
    });

    return (
        <SubscriptionContext.Provider value={{ subscriptionData, setSubscriptionData }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

// 🔹 Hook personnalisé pour utiliser le contexte facilement
export const useSouscription = () => useContext(SubscriptionContext);
