import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import { Container, Typography } from "@material-ui/core";
import {ethers} from "ethers";
import './eth.css';

const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');


const useStyles = makeStyles((theme) => ({
    main: {
      maxWidth: '100vw',
      marginTop: '3em',
      marginBottom: "auto",
    },
  }));



  export const Eth = () => {

    const [block, setBlock] = useState(0);
    const [gas, setGas] = useState(0);
    const [price, setPrice] = useState(0);

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

   const classes = useStyles();

    const chainId = ChainId.MAINNET;
    const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'


   async function blockNumber() {
   const getNumber = await provider.getBlockNumber();
   const parse = JSON.stringify(getNumber);
   if (parse !== 0) {
    setBlock(parse) 
  } else {
    setBlock("waiting.....")
  }
   console.log(getNumber)
}

async function getGas() {
const gasPrice = await provider.getGasPrice()
const parsedGas = ethers.utils.formatUnits(gasPrice, "gwei")
const dec = parseFloat(parsedGas).toFixed(0);
if (dec !== 0) {
    setGas(dec) 
  } else {
    setGas("waiting.....")
  }
}

const init = async () => {
	const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, provider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(dai, weth, provider);
	const route = new Route([pair], weth);
	const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
	console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
	console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
	console.log("-".repeat(45));
	console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
    const ethPrice = trade.executionPrice.toSignificant(6);
    if (ethPrice !== 0) {
        setPrice(ethPrice) 
      } else {
        setPrice("waiting.....")
      }
}

getGas();
blockNumber();
init();

    return (
    
      <div className="about" >
        <Container component="main" className={classes.main} maxWidth="md" align="center" 
        style={{border: "1px solid rgba(255, 255, 255, 0.51)", borderRadius: "16px", margin: "24px"}}>
        <Typography component='h3' variant="h7" >
        <TextDecrypt text={'Block Number:'}/>
        </Typography>
        <Typography component='h2' variant="h5">
        <TextDecrypt text={block}/>
        </Typography>
  
        </Container>

        <Container component="main" className={classes.main} maxWidth="md" align="center"
        style={{border: "1px solid rgba(255, 255, 255, 0.51)", borderRadius: "16px", margin: "24px"}}>
        <Typography component='h3' variant="h7">
        <TextDecrypt text={'Price:'} />
        </Typography>
        <Typography component='h2' variant="h5">
        <TextDecrypt text={price} />
        </Typography>
        </Container>

        <Container component="main" className={classes.main} maxWidth="md" align="center"
        style={{border: "1px solid rgba(255, 255, 255, 0.51)", borderRadius: "16px", margin: "24px"}}>
        <Typography component='h3' variant="h7">
        <TextDecrypt text={'Gas:'} />
        </Typography>
        <Typography component='h2' variant="h5">
        <TextDecrypt text={gas} />
        </Typography>
        </Container>
      
        </div>

        
    );
  };