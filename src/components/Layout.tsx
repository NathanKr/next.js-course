import { Divider } from '@mui/material';
import  { FC, ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar'
import styles from '../../styles/layout.module.css'

interface IProps{
    children : ReactNode;
}

const Layout : FC<IProps> = ({ children }) =>  {
    return (
      <div className={styles.layout}>
        <NavBar />
        <Divider/>
        <main>{children}</main>
        <Footer />
      </div>
    )
  }

export default Layout;