import { useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [viewport_width, setViewportWidth] = useState(null);
  const [screen_size, setScreenSize] = useState(null);

  const updateViewportWidth = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    setViewportWidth(vw);
    if (vw < 768) {
      setScreenSize("small");
    } else {
      setScreenSize("medium");
    }
  };

  useEffect(() => {
    updateViewportWidth();
  }, []);

  return (
    <AppContext.Provider
      value={{ viewport_width: viewport_width, screen_size: screen_size }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
