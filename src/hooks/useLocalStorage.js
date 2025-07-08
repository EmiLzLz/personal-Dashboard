import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    //Obtener data del localStorage
    const storedData = localStorage.getItem(key);

    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    } else {
      console.log("Nothing founded");
      return initialValue;
    }
  });

  //useEffect para guardar
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
