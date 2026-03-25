import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(""); // "name" or "company"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const navigate = useNavigate();

  // Fetch users from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter users by search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0; // no sorting
    let aValue = sortField === "company" ? a.company.name : a[sortField];
    let bValue = sortField === "company" ? b.company.name : b[sortField];
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {/* Sorting Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Sort by Name:</strong>
        <button onClick={() => { setSortField("name"); setSortOrder("asc"); }} style={{ margin: "0 5px" }}>A → Z</button>
        <button onClick={() => { setSortField("name"); setSortOrder("desc"); }} style={{ margin: "0 5px" }}>Z → A</button>

        <strong style={{ marginLeft: "20px" }}>Sort by Company:</strong>
        <button onClick={() => { setSortField("company"); setSortOrder("asc"); }} style={{ margin: "0 5px" }}>A → Z</button>
        <button onClick={() => { setSortField("company"); setSortOrder("desc"); }} style={{ margin: "0 5px" }}>Z → A</button>
      </div>

      {/* User Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedUsers.length === 0 && <p>No users found.</p>}
    </div>
  );
}

export default Dashboard;