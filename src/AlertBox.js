import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBug, faExclamationTriangle, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { subscribe } from './utils/lib';
import { AlertEvent } from './utils/lib';
import styled from "styled-components";

const OverlayDiv = styled.div`
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1051;
  }
`
const OverlayDialog = styled.div`
  background: ${props => props.inputColor || "white"};
  border: #333333 solid 0px;
  color: ${props => props.textColor || "black"};
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1052;
  width: 100%;
  height: 4em;
  box-shadow: 0 5px 10px rgb(0 0 0 / 30%);
`

const SpacedDiv = styled.div`
  margin: 0.5em;
  padding:0.5em;
`


const Alert = ({type, text, setVisible}) => {
  switch(type) {
    case 'error':
      return 
        (<OverlayDialog inputColor="#F00" textColor="#FFF">
          <SpacedDiv>
            <FontAwesomeIcon icon={faBug} />
            <strong> Error: </strong> {text} &nbsp;
            <a onClick={()=>setVisible(false)}><FontAwesomeIcon icon={faTimes} /></a>
          </SpacedDiv>
        </OverlayDialog>
      );
      break;
    case 'info':
      return 
        (<OverlayDialog inputColor="#EEE" textColor="#000">
          <SpacedDiv>
            <FontAwesomeIcon icon={faInfoCircle} />
            <strong> Info:</strong>{text} &nbsp;
            <a onClick={()=>setVisible(false)}><FontAwesomeIcon icon={faTimes} /></a>
          </SpacedDiv>
        </OverlayDialog>
      );
      break;
    case 'warning':
      return 
        (<OverlayDialog inputColor="#CA0" textColor="#FEE">
          <SpacedDiv>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <strong> Warn: </strong>{text} &nbsp;
            <a onClick={()=>setVisible(false)}><FontAwesomeIcon icon={faTimes} /></a>
          </SpacedDiv>
        </OverlayDialog>
      );
      break;
    case 'success':
      return 
        (<OverlayDialog inputColor="#3A5" textColor="#FFF">
          <SpacedDiv>
            <FontAwesomeIcon icon={faCheck} />
            <strong> Success: </strong>{text} &nbsp;
            <a onClick={()=>setVisible(false)}><FontAwesomeIcon icon={faTimes} /></a>
          </SpacedDiv>
        </OverlayDialog>
      );
      break;
  }

}

const AlertBox = () => {

  const [visible, setVisible] = useState(false);
  const [alertData, setAlertData] = useState({type:'info', text:''});

  useEffect(() => {
    const handle = subscribe(AlertEvent, (config) => {
      console.log(config);
      setVisible(config.state === 'open' ? true : false);
      setAlertData(config.data);
    });

    return function cleanup() {
      handle.unsubscribe();
    };
  });

  return visible && (
    <OverlayDiv>
      <Alert type={alertData.type} text={alertData.text} setVisible={setVisible} />
    </OverlayDiv>
  );
};

export default AlertBox;