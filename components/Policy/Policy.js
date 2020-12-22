import React from 'react';
import PickList from '../../shared/Picklist/Picklist';

const policy = (props) => {
   const options = ["-", "Direct-mapped", "Fully associative", "N-set associative"];

   return (<PickList name="Associativity" options={options} onChangeHandler={props.policyOptionHandler} value={props.value}></PickList>);
}

export default policy;