import { useState, useEffect } from "react";
import { fetchAds } from "../../api-helper";

const Ads = (data) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      setState(await fetchAds());
    }

    getPhotos();
  }, []);

  return (
    <ul className="collage">
      {state.map((ad) => (
        <img src={ad.imageUrl} alt={ad.name} />
      ))}
    </ul>
  );
};

export default Ads;
