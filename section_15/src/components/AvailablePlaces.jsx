import Error from './Error.jsx';
import Places from './Places.jsx';
import { useEffect, useState } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, seteIsFetching] = useState(false);
  const [error, setError] = useState();

  // async, await, useEffect 이용한 비동기 API 통신
  useEffect(() => {
    const fetchPlaces = async () => {
      seteIsFetching(true)
      try {
        const response = await fetch("http://localhost:3000/places")      
        const resData = await response.json()
        // fetch를 통한 HTTP
        if (!response.ok) {
          const err = new Error("failed to fetch places")
          throw err
        }
        setAvailablePlaces(resData.places)
      }
      catch (error) {
        setError({
          message: error.message || "Could not fetch places, please try again later."
        });
      }
      
      seteIsFetching(false)
    }

    fetchPlaces()
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message}/>
  };

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
