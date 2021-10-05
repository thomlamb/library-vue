import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import ContactContent from "./components/ContactContent/ContactContent";
import ContactList from "./components/ContactList/ContactList";
import ContactMap from "./components/ContactMap/ContactMap";
import ContactCard from "./components/ContactCard/ContactCard";
import categories from './data/categories';
import CategoriesFilter from './components/CategoriesFilter/CategoriesFilter'



function App() {
  const [category, setCategory] = useState("general");
  const [contactArray, setcontactArray] = useState([]);
  const [contactResults, setcontactResults] = useState();
  const [loadmore, setloadmore] = useState(20);
  const [search, setSearch] = useState("");
  const [contactArrayFilter, setcontactArrayFilter] = useState([]);
  const [hoverId, setHoverId] = useState("null");
  const [topicsArray, settopicsArray] = useState([]);



  const directoryApi = async () => {
    try {
      const contacts = await axios.get('http://localhost:8080/Plone5/mon-annuaire/@directory', {
        headers: {
          "Accept": "application/json"
        }
      });
      setcontactArray(contacts.data.items);
      setcontactResults(contacts.data.items.length);
      // setcategoryArray(contacts.data.items);
    } catch (error) {
      console.log("test error");

    }
  };

  useEffect(() => {
    directoryApi();
    // eslint-disable-next-line
  }, [contactResults, loadmore]);



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

  const setCategoryChange = (value) => {
    setcontactArrayFilter(
      contactArray.filter((contact) =>
        contact.taxonomy_contact_category[0].title.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  useEffect(() => {
    if(contactArray.length > 0){
        const arr = [];
        contactArray.map((item,i) => {
          if(item.topics != null){
            arr.push(item.topics[0].title);
          }
        });
        const uniqueSet = new Set(arr);
        const backToArray = [...uniqueSet];
        settopicsArray(backToArray)
    }
  }, [contactArray]);

  const setTopicsChange = (value) => {
    const cleanArray = contactArray.filter(contact => contact.topics != null);
    setcontactArrayFilter(
      cleanArray.filter((topics) =>
      topics.topics[0].title.includes(value)
      )
    );

    // setcontactArrayFilter(
    //   cleanArray.filter((contact) =>{
    //     contact.topics[0].title.toLowerCase().includes(value.toLowerCase())
    //   })
    // );



    console.log(contactArrayFilter)
  }
  return (
    <div className="App">
      <div>
        <div className="contactFilter">
          <form className="contactSearch">
            <label for="fname">Recherche</label>
            <input type="text" placeholder="Mots clés" onChange={(e) => setSearch(e.target.value)} />
          </form>

          <form className="contactCategories">
            <label for="fname">Catégories</label>
            <select onChange={(e) => setCategoryChange(e.target.value)} as="select" custom>
              <option value={"all"}>Toutes les catégories</option>
              {categories && categories.map((option, i) => <option key={i}>{option}</option>)}
            </select>
          </form>

          <form className="contactCategories">
            <label for="fname">Thématiques</label>
            <select onChange={(e) => setTopicsChange(e.target.value)} as="select" custom>
              <option value={"all"}>Toutes les catégories</option>
              {topicsArray && topicsArray.map((option, i) => <option key={i}>{option}</option>)}
            </select>
          </form>

          {/* <CategoriesFilter contactArray={contactArray} /> */}
        </div>
        <ContactList onChange={hoverID} contactArray={contactArrayFilter} />
      </div>
      <ContactMap hoverId={hoverId} items={contactArrayFilter} />

    </div>
  );
}


// Thematiques == topi
export default App;
