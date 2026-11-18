import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:5000";
const AdminContext = createContext();
function AdminProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  //this one is for getting a request to show in request details
  const [currentRequest, setCurrentRequest] = useState({});

  useEffect(function () {
    async function fetchProfiles() {
      try {
        const res = await fetch(`${BASE_URL}/profiles`);
        const data = await res.json();

        // console.log(studentsData);
        setProfiles(data);
        // console.log(received);
      } catch {
        alert("Hubo un error al intentar obtener los perfiles");
      }
    }

    // async function fetchRequestsReceived() {}

    fetchProfiles();
  }, []);

  const getProfileById = useCallback(async function getProfileById(id) {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch {
      alert("sHubo un error al intentar obtener los detalles de la solicitud");
    }
  }, []);

  //probably usefull later on...
  // const getReceivedById = useCallback(async function (id) {
  //   try {
  //     const res = await fetch(`${BASE_URL}/requestsReceived/${id}`);
  //     const data = await res.json();
  //     // console.log(data);
  //     return data;
  //   } catch {
  //     alert("something went worng when trying to get the request details");
  //   }
  // }, []);
  async function deleteProfile(id) {
    try {
      await fetch(`${BASE_URL}/profiles/${id}`, { method: "DELETE" });
      setProfiles((profiles) => profiles.filter((p) => p.id !== id));
    } catch {
      alert("Hubo un error al intentar eliminar la solicitud");
    }
  }

  async function createProfile(profile) {
    try {
      const res = await fetch(`${BASE_URL}/profiles`, {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProfiles((old) => [data, ...old]);
      // console.log(requests);
    } catch {
      alert("Hubo un error al intentar crear la solicitud");
    }
  }

  const updateProfile = useCallback(async function updateProfile(id, profile) {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(profile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //contains the success message
      const data = await res.json();
      setProfiles((oldList) =>
        oldList.map((p) => (p.id === id ? { ...p, ...profile } : p)),
      );
      // setProfiles((old) => [data, ...old]);
      // console.log(requests);
    } catch {
      alert("Hubo un error al intentar crear la solicitud");
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        profiles,
        deleteProfile,
        createProfile,
        getProfileById,
        updateProfile,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

function useProfiles() {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error(
      "requests context was attempt to be used ouside RequestProvider",
    );
  return context;
}

export { AdminProvider, useProfiles };
