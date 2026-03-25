import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetail() {
  const { id } = useParams(); // get user id from URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch single user by id
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px", padding: "8px 12px" }}
      >
        ← Back to Dashboard
      </button>

      <h2>{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>

      <h3>Company</h3>
      <p><strong>Name:</strong> {user.company.name}</p>
      <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
      <p><strong>BS:</strong> {user.company.bs}</p>

      <h3>Address</h3>
      <p>
        {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </p>
      <p>
        <strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
      </p>
    </div>
  );
}

export default UserDetail;