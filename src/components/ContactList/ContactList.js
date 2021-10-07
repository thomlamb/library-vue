import ContactCard from "../ContactCard/ContactCard";
import {Link} from 'react-router-dom';

const ContactList = ({contactArray,onChange, onHover}) => {
  
    function handleClick(event) {
      onChange(event);
    }
    function handleHover(event) {
      onHover(event);
    }
  return (
      <div className="content">
        {contactArray.map((contactItem,i)=>(
            <li onMouseEnter={() => handleHover(contactItem.UID)} 
                onMouseLeave={() => handleHover(null)} 
                onClick={() => handleClick(contactItem.UID)} >
            <Link style={{ textDecoration: 'none' }} to={{
              pathname: `/${contactItem.UID}`,
              state : {
                idItem : contactItem.UID
              }
              }}
            >
              <ContactCard contactItem={contactItem} key={contactItem.created} />
            </Link>
            </li>
          ))
        }   
      </div>
  );
};
export default ContactList;