import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "./manageusers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [newVolunteerEmail, setNewVolunteerEmail] = useState("");
  const [newVolunteerPassword, setNewVolunteerPassword] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUsers(data.filter((user) => user.role === "USER"));
      setVolunteers(data.filter((user) => user.role === "VOLUNTEER"));
    };
    fetchUsers();
  }, []);

  const handleAddVolunteer = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/register/volunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ email: newVolunteerEmail, password: newVolunteerPassword, role: "VOLUNTEER" }),
    });
    if (response.ok) {
      setVolunteers([...volunteers, { email: newVolunteerEmail, role: "VOLUNTEER" }]);
      setNewVolunteerEmail("");
      setNewVolunteerPassword("");
    } else {
      alert("Failed to add volunteer!");
    }
  };

  const handleDelete = async (email, role) => {
    const response = await fetch(`http://localhost:8080/api/users/${email}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      if (role === "USER") {
        setUsers(users.filter((user) => user.email !== email));
      } else {
        setVolunteers(volunteers.filter((volunteer) => volunteer.email !== email));
      }
    } else {
      alert("Failed to delete!");
    }
  };

  return (
    <div className="manage-users-container">
      <AdminNavbar />
      <div className="manage-users-content">
        <h2>Manage Users & Volunteers</h2>
        <div className="add-volunteer-form">
          <h3>Add Volunteer</h3>
          <form onSubmit={handleAddVolunteer}>
            <input
              type="email"
              placeholder="Volunteer Email"
              value={newVolunteerEmail}
              onChange={(e) => setNewVolunteerEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newVolunteerPassword}
              onChange={(e) => setNewVolunteerPassword(e.target.value)}
              required
            />
            <button type="submit">Add Volunteer</button>
          </form>
        </div>
        <div className="users-list">
          <h3>Users</h3>
          {users.map((user) => (
            <div key={user.email} className="user-item">
              <span>{user.email}</span>
              <button onClick={() => handleDelete(user.email, "USER")} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
        <div className="volunteers-list">
          <h3>Volunteers</h3>
          {volunteers.map((volunteer) => (
            <div key={volunteer.email} className="user-item">
              <span>{volunteer.email}</span>
              <button onClick={() => handleDelete(volunteer.email, "VOLUNTEER")} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageUsers;