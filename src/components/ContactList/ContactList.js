import ContactCard from "../ContactCard/ContactCard";
const ContactList = ({contactArray, contactResults,onChange}) => {
    function handleChange(event) {
      onChange(event);
    }
  return (
      <div className="content">
        {
          contactArray.map((contactItem,i)=>(
            <li onClick={() => handleChange(i)} >
                <ContactCard contactItem={contactItem} key={contactItem.created} />
            </li>
          ))
        }   
      </div>
  );
};
export default ContactList;