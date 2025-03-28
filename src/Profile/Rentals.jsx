import { useState, useEffect } from "react";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://famerequipmentrental-springboot-production.up.railway.app/booking/requests/${user.id}`
    ) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRentals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rentals:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading rentals...</p>;

  return (
    <div className="p-4 mt-20">
      {console.log(rentals)}
      <h2 className="text-2xl font-bold mb-4">My Rentals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="p-4 bg-gray-200 rounded-md shadow-md">
            <h3 className="font-bold">{rental.equipment.name}</h3>
            <p>Owner: {rental.borrower.firstName}</p>
            <p>
              Duration: {rental.startDate} - {rental.endDate}
            </p>
            <p>Status: {rental.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;
