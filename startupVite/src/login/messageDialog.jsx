import React from 'react';

export function MessageDialog(props) {

  if (!props.message) return null;

  return (
 
    <div className="modal-overlay">
    <div className="modal-container">
        <p>{props.message}</p>
        <p id="button" className="click" onClick={props.onHide}>Close</p>
      </div>
    </div>
  
  );
}
