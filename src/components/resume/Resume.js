import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { TextDecrypt } from '../content/TextDecrypt';
import {
  ResumeIcon
} from '../content/ResumeButton';
import { ethers } from 'ethers';



const useStyles = makeStyles((theme) => ({
  footerText: {
    position: 'fixed',
    bottom: theme.spacing(6),
    left: theme.spacing(6),
    '&:hover': {
      color: theme.palette.primary.main,
    },
    transition: 'all 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  
}));



export const Resume = () => {

  const classes = useStyles();
  const [isConnected, connected] = useState(false);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");

  function changeState() {
    setShow(!show);
  }



  async function connect() {
  
    const provider = new ethers.providers.Web3Provider(window.ethereum)
     await provider.send("eth_requestAccounts", []);
     const signer = provider.getSigner()
     const address = await signer.getAddress()
     const ens = await provider.lookupAddress(address);
     if (ens !== null) {
      setName(ens)
    } else {
      setName(address)
    }
    connected(true)
    changeState()
  }

  return (
 <div>
      {show ? (
        <Button onClick={connect} className={classes.footerText} variant="outlined">
          <Typography component='span'>
            <TextDecrypt text={' Connect'} />
          </Typography>
        </Button>

      ) : (
        <Button onClick={connect} className={classes.footerText} variant="outlined">
          <ResumeIcon />
          <Typography component='span'>
          <TextDecrypt text={name} />
          </Typography>
        </Button>

      )}
    </div>
  );
};
