import { useContext, useState } from "react";
import { getAllLogs } from "../../services/logService";
import { useEffect } from "react";
import { LogContext } from "./LogContext";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const useLogs = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogs debe ser usado con LogsProvider");
  }
  return context;
};

const LogContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const res = await getAllLogs();
      setLogs(res);
    } catch (error) {
      console.error("error al obtener los logs:", error);
    }
  };
  useEffect(() => {
    loadLogs();
  }, []); //se ejecuta solo una vez cuando se monta el componente
  return <LogContext.Provider value={{ logs }}>{children}</LogContext.Provider>;
};

LogContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LogContext, LogContextProvider };
