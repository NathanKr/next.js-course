import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h2>This is Home page !</h2>
      <Image width="800" height="533" src="/images/home-domenico-loia-hGV2TfOh0ns-unsplash.jpg" alt="home" />
    </div>
  );
};

export default Home;
