import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    //Obtener data del localStorage
    const storedData = localStorage.getItem(key);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        return parsedData;
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

  return [value, setValue];
}
