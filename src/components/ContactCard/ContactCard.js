import React from "react";

const ContactCard = ({ contactItem }) => {
	const title = contactItem.title && contactItem.title;
	const category = contactItem.taxonomy_contact_category ? contactItem.taxonomy_contact_category[0].title : "";
	const number =  contactItem.number ? contactItem.number : "";
	const street = contactItem.street ? contactItem.street : "";
	const complement = contactItem.complement ? contactItem.complement : "";
	const zipcode = contactItem.zipcode ? contactItem.zipcode : "" ;
	const city = contactItem.city ? contactItem.city : "" ;
	const country = contactItem.country ? contactItem.country : "" ;
	const phones = contactItem.phones ? contactItem.phones : "" ;
	const mails = contactItem.mails ? contactItem.mails : "" ;

	return (
		<div className="contactCard">
			<div className="contactImage">
			<img
				src={
					contactItem.image
						? contactItem.image.scales.preview.download
						: "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
				}
				alt={"alt de l'image"}
			/>
			</div>

			<div className="contactText">
				<div className="contactTextTitle">
					<span className="title">{title}</span>
				</div>
				<div className="contactTextAll">
						{category ? (<span>{category}</span>) : ""}
					<div className="adresse"> 
						{number ? (<span>{number + " "}</span>) : ""}
						{street ? (<span>{street + ", "}</span>) : ""}
						{complement ? (<span>{complement + ", "}</span>) : ""}
						{zipcode ? (<span>{zipcode + " "}</span>) : ""}
						{city ? (<span>{city}</span>) : ""}
					</div>
					<div className="itineraty">
						{street
							? (<a href={"https://www.google.com/maps/dir/?api=1&destination=" +street + "+" +number+ "+"+ complement+ "+"+zipcode+ "+"+city+"+"+country}>Itinéraire</a>)
							: ""
						}
					</div>
					<div className="phones">
						{phones
							? (phones.map((phone) =>{return <span>{phone.number}</span>})): ""
						}
					</div>
					<div className="mails">
						{mails
							? (mails.map((mail) =>{return <span>{mail.mail_address}</span>})): ""
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;