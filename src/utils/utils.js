import africaMap from '../assets/images/africa.png';
import asiaMap from '../assets/images/asia.png';
import europeMap from '../assets/images/europe.png';
import northAmericaMap from '../assets/images/anorth-america.png';
import southAmericaMap from '../assets/images/south-america.png';
import oceaniaMap from '../assets/images/oceania.png';
import antarcticaMap from '../assets/images/antarctica.png';

const generateMap = (region) => {
  switch (region) {
    case 'Africa':
      return africaMap;
    case 'Asia':
      return asiaMap;
    case 'Europe':
      return europeMap;
    case 'North America':
      return northAmericaMap;
    case 'South America':
      return southAmericaMap;
    case 'Oceania':
      return oceaniaMap;
    case 'Antarctic':
      return antarcticaMap;
    default:
      return africaMap;
  }
};

export default generateMap;
