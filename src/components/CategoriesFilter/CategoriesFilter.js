import React from 'react';
import { useEffect, useCallback, useState } from "react";

function CategoriesFilter(props) {
  const [categoryArray, setcategoryArray] = useState([]);
  const [categoryFirstLevel, setcategoryFirstLevel] = useState([]);


  useEffect(() => {

    if(props.contactArray.length > 0){
        const arr = [];
        props.contactArray.map((item,i) => {
            arr.push(item.taxonomy_contact_category[0].title);
        });
        const uniqueSet = new Set(arr);
        const backToArray = [...uniqueSet];

        const arr2 = [];

        
        setcategoryArray(backToArray)
    }
  }, [props.contactArray]);

    function handleChange(event) {
        props.onChange(event.target.value);
    }
    return(
        <form className="pivot-select-form">
            <div className="pivot-select-container" for="exampleForm.SelectCustom">
                <label>Catégories</label>
                <select value={props.value} onChange={handleChange} as="select" custom>
                <option value={"all"}>Toutes les catégories</option>
            {props.category && props.category.map((option, i) => <option key={i}>{option}</option>)}
                </select>
            </div>
        </form>
    );
}

export default CategoriesFilter;