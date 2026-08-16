import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  // Stores the list of users returned by the API.
  const [listOfUser, setListOfUser] = useState([]);

  // Additional UI state for loading and error handling.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setListOfUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <p className="status-message">Loading users...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  return (
    <section className="user-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">JSONPlaceholder API</span>
          <h2>User Directory</h2>
        </div>

        <span className="user-count">{listOfUser.length} users</span>
      </div>

      <div className="user-grid">
        {listOfUser.map((user) => (
          <article className="user-card" key={user.id}>
            <div className="avatar" aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>

            <div className="user-details">
              <p>
                <strong>Email</strong>
                <span>{user.email}</span>
              </p>

              <p>
                <strong>Phone</strong>
                <span>{user.phone}</span>
              </p>

              <p>
                <strong>Company</strong>
                <span>{user.company.name}</span>
              </p>

              <p>
                <strong>City</strong>
                <span>{user.address.city}</span>
              </p>
            </div>

            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="website-link"
            >
              Visit Website
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserList;
