import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ContactContent from "./components/ContactContent/ContactContent";
import ContactList from "./components/ContactList/ContactList";
import ContactMap from "./components/ContactMap/ContactMap";
import ContactCard from "./components/ContactCard/ContactCard";
import categories from './data/categories';
import CategoriesFilter from './components/CategoriesFilter/CategoriesFilter'
import TopicsFilter from './components/TopicsFilter/TopicsFilter'
import FacilitiesFilter from './components/FacilitiesFilter/FacilitiesFilter'
import data from './data/data.json'
import header from './assets/header.png';
import useAxios from "./assets/customHooks/useAxios";


function App() {
  const [contactArray, setcontactArray] = useState([]);
  const [contactResults, setcontactResults] = useState();
  const [loadmore, setloadmore] = useState(20);
  const [search, setSearch] = useState("");
  const [contactArrayFilter, setcontactArrayFilter] = useState([]);
  const [clickId, setClickId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

//   const { response, loading, error } = useAxios({
//     method: 'get',
//     url: 'https://thesimpsonsquoteapi.glitch.me/quotes',
//     headers: JSON.stringify({ accept: '*/*',  'Access-Control-Allow-Origin': 't, }),
//     body: JSON.stringify({
//         userId: 1,
//         id: 19392,
//         title: 'title',
//         body: 'Sample text',
//     }),
// });
//   const [data, setData] = useState([]);

//   useEffect(() => {
//       if (response !== null) {
//           setData(response);
//       }
//   }, [response]);


  const directoryApi = async () => {
    try {
      const contacts = await axios.get(data, {
        headers: {
          "Accept": "application/json"
        }
      });
      setcontactArray(contacts.data.items);
      setcontactResults(contacts.data.items.length);
    } catch (error) {
      console.log("test error");

    }
  };

  useEffect(() => {
    // setcontactArray(data.items);
    directoryApi();

    // eslint-disable-next-line
  }, [contactResults, loadmore]);

  const clickID = (id) => {
    setClickId(id);
  }

  const hoverID = (id) => {
    setHoverId(id);
  }

  useEffect(() => {
    setcontactArrayFilter(
      contactArray.filter((contact) =>
        contact.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contactArray]);

  const topicsChange = (value) => {
    if (value === null) {
      setcontactArrayFilter(contactArray)
    } else {
      const cleanArray = contactArray.filter(contact => contact.topics != null);
      setcontactArrayFilter(
        cleanArray.filter((topics) =>
          topics.topics[0].title.includes(value.value)
        )
      );
    }
  }

  const CategoriesChange = (value) => {
    if (value === null) {
      setcontactArrayFilter(contactArray)
    } else {
      const cleanArray = contactArray.filter(contact => contact.taxonomy_contact_category != null);
      setcontactArrayFilter(
        cleanArray.filter((contact) =>
          contact.taxonomy_contact_category[0].title.includes(value.value)
        )
      );
    }
  }

  const FacilitiesChange = (value) => {
    if (value === null) {
      setcontactArrayFilter(contactArray)
    } else {
      const cleanArray = contactArray.filter(contact => contact.facilities != null);
      setcontactArrayFilter(
        cleanArray.filter((contact) =>
          contact.facilities[0].title.includes(value.value)
        )
      );
    }
  }
  return (
    <Router>
      <div>
        <img className="headerimg" src={header} />
      </div>
      <div className="r-wrapper r-annuaire-wrapper">
        <div className="r-result r-annuaire-result">
            {/* <form className="contactSearch">
              <label for="fname">Recherche</label>
              <input type="text" placeholder="Mots clés" onChange={(e) => setSearch(e.target.value)} />
            </form> */}

          <Switch>
            <Route exact path="/">
            <div className="r-result-filter annuaire-result-filter">
              <TopicsFilter onChange={topicsChange} contactArray={contactArray} />
              <CategoriesFilter onChange={CategoriesChange} contactArray={contactArray} />
              <FacilitiesFilter onChange={FacilitiesChange} contactArray={contactArray} />
            </div>
              <ContactList onChange={clickID} onHover={hoverID}  contactArray={contactArrayFilter} />
            </Route>
            <Route path="/:id">
              <ContactContent onChange={clickID} contactArray={contactArray} />
            </Route>
          </Switch>
        </div>
        <ContactMap clickId={clickId} hoverId={hoverId} items={contactArrayFilter} />
      </div>
      <div className="footer"></div>
    </Router>
  );
}


// Thematiques == topi
export default App;
