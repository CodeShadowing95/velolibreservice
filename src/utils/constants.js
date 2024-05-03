import { dark, light, navigation_day, navigation_night, outdoors, satellite, satellite_streets, standard, streets, defaultStyle } from "../assets";
import { bicike, bysykkel, citycycle, cristlib, cyclic, cyclocity, cyclocity_toyama, cyclocity_vilnius, dublinbikes, levelo, libiavelo, lundahoj, naolib, sevici, tusbic, velam, velo2, velocite, velov, villo, velOstan, veloh, veloo } from "../assets/ContractLogos";
 "../assets/ContractLogos";

export const locations = [
  {
    name: "brisbane",
    latitude: -27.4689682,
    longitude: 153.0234991,
    logo: citycycle
  },
  {
    name: "bruxelles",
    latitude: 50.8465573,
    longitude: 4.351697,
    logo: villo
  },
  {
    name: "namur",
    latitude: 50.4665284,
    longitude: 4.8661892,
    logo: libiavelo
  },
  {
    name: "santander",
    latitude: 43.4665284,
    longitude: 3.8661892,
    logo: tusbic
  },
  {
    name: "amiens",
    latitude: 49.8941708,
    longitude: 2.2956951,
    logo: velam
  },
  {
    name: "cergy-pontoise",
    latitude: 49.0527528,
    longitude: 2.0388736,
    logo: velo2
  },
  {
    name: "creteil",
    latitude: 48.7771486,
    longitude: 2.4530731,
    logo: cristlib
  },
  {
    name: "lyon",
    latitude: 45.7578137,
    longitude: 4.8320114,
    logo: velov
  },
  {
    name: "marseille",
    latitude: 43.2961743,
    longitude: 5.3699525,
    logo: levelo
  },
  {
    name: "mulhouse",
    latitude: 47.7467233,
    longitude: 7.3389937,
    logo: cyclocity
  },
  {
    name: "nancy",
    latitude: 48.6845599,
    longitude: 6.1809053,
    logo: velOstan
  },
  {
    name: "nantes",
    latitude: 47.218371,
    longitude: -1.553621,
    logo: naolib
  },
  {
    name: "rouen",
    latitude: 49.4404598,
    longitude: 1.099328,
    logo: cyclic
  },
  {
    name: "toulouse",
    latitude: 43.6044622,
    longitude: 1.4442469,
    logo: veloo
  },
  {
    name: "dublin",
    latitude: 53.349805,
    longitude: -6.26031,
    logo: dublinbikes
  },
  {
    name: "toyama",
    latitude: 36.6468015,
    longitude: 137.2183531,
    logo: cyclocity_toyama
  },
  {
    name: "vilnius",
    latitude: 54.687156,
    longitude: 25.279651,
    logo: cyclocity_vilnius
  },
  {
    name: "luxembourg",
    latitude: 49.6148282,
    longitude: 6.1341726,
    logo: veloh
  },
  {
    name: "lillestrom",
    latitude: 59.9559239,
    longitude: 11.0491122,
    logo: bysykkel
  },
  {
    name: "besancon",
    latitude: 47.2380222,
    longitude: 6.0243622,
    logo: velocite
  },
  {
    name: "jcdecauxbike",
    latitude: 48.799648,
    longitude: 1.945439,
    logo: cyclocity
  },
  {
    name: "maribor",
    latitude: 46.5576439,
    longitude: 15.6455854,
    logo: cyclocity
  },
  {
    name: "seville",
    latitude: 37.3886303,
    longitude: -5.9953403,
    logo: sevici
  },
  {
    name: "valence",
    latitude: 39.4697065,
    longitude: -0.3763353,
    logo: velam
  },
  {
    name: "lund",
    latitude: 55.7029296,
    longitude: 13.1929449,
    logo: lundahoj
  },
  {
    name: "stockholm",
    latitude: 59.3251172,
    longitude: 18.0710935,
    logo: cyclocity
  },
  {
    name: "ljubljana",
    latitude: 46.0500268,
    longitude: 14.5069289,
    logo: bicike
  }
]

export const criterias = [
  "station",
  "adresse",
];

export const mapStyles = [
  {
    name: "Standard",
    style: "mapbox://styles/mapbox/streets-v9",
    image: defaultStyle
  },
  {
    name: "3D",
    style: "mapbox://styles/mapbox/standard",
    image: standard
  },
  {
    name: "Streets",
    style: "mapbox://styles/mapbox/streets-v12",
    image: streets
  },
  {
    name: "Outdoors",
    style: "mapbox://styles/mapbox/outdoors-v12",
    image: outdoors
  },
  {
    name: "Light",
    style: "mapbox://styles/mapbox/light-v11",
    image: light
  },
  {
    name: "Dark",
    style: "mapbox://styles/mapbox/dark-v11",
    image: dark
  },
  {
    name: "Satellite",
    style: "mapbox://styles/mapbox/satellite-v9",
    image: satellite
  },
  {
    name: "Satellite Streets",
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    image: satellite_streets
  },
  {
    name: "Navigation Day",
    style: "mapbox://styles/mapbox/navigation-day-v1",
    image: navigation_day
  },
  {
    name: "Navigation Night",
    style: "mapbox://styles/mapbox/navigation-night-v1",
    image: navigation_night
  },
]

export const countryCodes = [
  {
    name: "France",
    code: "FR"
  },
  {
    name: "Belgique",
    code: "BE"
  },
  {
    name: "Australie",
    code: "AU"
  },
  {
    name: "Espagne",
    code: "ES"
  },
  {
    name: "Irlande",
    code: "IE"
  },
  {
    name: "Japon",
    code: "JP"
  },
  {
    name: "Lithuanie",
    code: "LT"
  },
  {
    name: "Luxembourg",
    code: "LU"
  },
  {
    name: "Norvège",
    code: "NO"
  },
  {
    name: "Suède",
    code: "SE"
  },
  {
    name: "Slovénie",
    code: "SI"
  }
]