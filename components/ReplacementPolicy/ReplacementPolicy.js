import React from 'react';
import PickList from '../../shared/Picklist/Picklist';

const replacementPolicy = (props) => {
   const options = ["-", "Least recently used", "FIFO"];

   return (<PickList name="Replacement policy" options={options} onChangeHandler={props.replacementPolicyHandler}></PickList>);
}

export default replacementPolicy;