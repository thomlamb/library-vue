import { useHistory,useParams } from "react-router-dom";
import { useEffect,useState } from "react";

const ContactContent = ({contactArray, onChange}) => {
  let history = useHistory();
  const { id } = useParams()
  const [contactItem, setcontactItem] = useState({});


  useEffect(() => {
    if(contactArray.length > 0){
      setcontactItem(
          contactArray.filter((e) =>
            e.UID === id
          )
      )
    }

  }, [id, contactArray]);

  function handleClick() {
    history.push("/");
    onChange(null);
  }

  return (
      <div className="content">
         <button type="button" onClick={handleClick}>
          Go home
        </button>
        <h1>{contactItem[0] && contactItem[0].title}</h1>
        <h1>{contactItem[0] && contactItem[0].description}</h1>

        
      </div>
  );
};
export default ContactContent;
