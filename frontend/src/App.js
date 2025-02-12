import React, { useState, useEffect } from "react";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div>
      <h1>Customer Management</h1>
      <CustomerForm />
      <CustomerList customers={customers} />
    </div>
  );
}

export default App;
