import React, { useRef } from 'react';

const InfoModal = ({ activate }) => {

    const ref = useRef(null);

    const onCloseHandler = () => {
        debugger;
        ref.current.className = ref.current.className.replace('is-active', '');
    }

    return (
        <div className="modal" ref={ref} className={activate ? 'is-active modal' : 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{background: 'white'}}>
                <p>Configure the cache. Some of the formulas applied:</p>
                <p>- On direct assignation, the block will be included based on cycles over.... TODO     </p>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onCloseHandler}>Close the modal!</button>
        </div>
    );
}

export default InfoModal;