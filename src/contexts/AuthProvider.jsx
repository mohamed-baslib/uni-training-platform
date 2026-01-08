import { AuthContext } from "./AuthContext";
import { STORAGE_KEYS, storage } from "../services/storage";
import { useState } from "react";

export function AuthProvider({ children }) {
  const storedUser = storage.get(STORAGE_KEYS.USER, null);
  const storedUsers = storage.get(STORAGE_KEYS.USERS, []);
  const defaultUserData = {
    id: 0,
    auth: { email: "", password: "" },
    profile: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      university: "",
      level: "",
      spec: "",
      gpa: "",
      country: "",
      skills: "",
      courses: "",
      avatar: "",
    },
    cv: {
      name: "",
      data: null,
      uploadedAt: "",
    },
    opportunities: {
      saved: [],
      applied: [],
    },
  };

  const initialUser =
  storedUser && storedUsers.length
    ? storedUsers.find((u) => u.id === storedUser.id) || defaultUserData
    : defaultUserData;

  const [user, setUser] = useState(initialUser);

  const updateUsers = (userData) => {
    if (!userData.id) return;
    let upUsers = storage.get(STORAGE_KEYS.USERS);
    upUsers = upUsers.map((u) => (u.id === userData.id ? userData : u));
    storage.set(STORAGE_KEYS.USERS, upUsers);
    setUser(userData);
  };

  const addUser = (userData) => {
    let upUsers = storage.get(STORAGE_KEYS.USERS);
    storage.set(STORAGE_KEYS.USERS, [...upUsers, userData]);
    setUser(userData);
  };

  const login = (userData) => {
    storage.set(STORAGE_KEYS.USER, userData);
    setUser(storage.get(STORAGE_KEYS.USERS).find((u) => u.id === userData.id));
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.USER);
    setUser(defaultUserData);
  };

  const isLoggedIn = !!storage.get(STORAGE_KEYS.USER, null);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        updateUsers,
        addUser,
        user,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
