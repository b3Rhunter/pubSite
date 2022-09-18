/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";

import './Works.css';

// Import ../../assets/recentprojects/
import Portfolio from '../../assets/recentprojects/react-portfolio.png';
import Veritru from '../../assets/recentprojects/veritru.png';
import Lofo from '../../assets/recentprojects/lofo.png';
import Startup from '../../assets/recentprojects/startup.png';
import Lacalle from '../../assets/recentprojects/lacalle.png';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
  },
}));

export const Works = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([
    { 
      id: 1,
      title: 'Good Morning News', 
      description: `Designed and developed with Scaffold ETH, React js, ethers js and Solidity. Deployed
      on Polygon, Optimism and Arbritum. A dynamic NFT that updates daily with the latest news and information.`,
      alter: 'React Portfolio',
      image: `${Portfolio}`,
    },
    { 
      id: 2,
      title: 'Newsies', 
      description: `A generative profile picture NFT project with programmed retroactive funding paid
       out to organizations and people that helped me get to where I am today.`,
      alter: 'VeriTru Project',
      image: `${Veritru}`,
    },
    { 
      id: 3,
      title: 'Weekly Wei', 
      description: `A derivative of Good Morning News, this project demonstrates the ability to publish multiple
      pages as an NFT on Ethereum Mainnet.`,
      alter: 'LoFo Project',
      image: `${Lofo}`,
    },
    { 
      id: 4,
      title: 'GMN German Edition', 
      description: `Another GMN derivative, translated for our German audience and available on the Polygon blockchain.`,
      alter: 'Startup Project',
      image: `${Startup}`,
    },
    { 
      id: 5,
      title: 'Feesh', 
      description: `A fun collection of NFTs that are completely random and have all the artwork stored directly
      on the smart contract.`,
      alter: 'Startup Project',
      image: `${Lacalle}`,
    },
  ]);

  return (
    <section id="works">

      <Container component="main" className={classes.main} maxWidth="md">
        {projects.map((project) => (
          <div className="project" key={ project.id }>
            <div className="__img_wrapper">
              <img src={ project.image } alt={ project.alter }/>
            </div>
            <div className="__content_wrapper">
              <h3 className="title">
                <TextDecrypt text={ project.id + '. ' + project.title } />
              </h3>
              <p className="description">
                { project.description }
              </p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};
