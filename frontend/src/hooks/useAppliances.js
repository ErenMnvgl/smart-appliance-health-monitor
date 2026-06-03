import { useState, useCallback } from "react";
import {
  fetchAppliances,
  createAppliance,
  updateApplianceStatus,
  updateApplianceHealth,
  deleteAppliance,
} from "../utils/api";

export function useAppliances() {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppliances();
      setAppliances(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (data) => {
    await createAppliance(data);
    await load();
  }, [load]);

  const changeStatus = useCallback(async (id, status) => {
    await updateApplianceStatus(id, status);
    await load();
  }, [load]);

  const changeHealth = useCallback(async (id, health) => {
    await updateApplianceHealth(id, health);
    await load();
  }, [load]);

  const remove = useCallback(async (id) => {
    await deleteAppliance(id);
    await load();
  }, [load]);

  return {
    appliances,
    loading,
    error,
    load,
    add,
    changeStatus,
    changeHealth,
    remove,
  };
}
