"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className={styles.page}>
      <h1>Users List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
