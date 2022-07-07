import  { FC, ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar'

interface IProps{
    children : ReactNode;
}

const Layout : FC<IProps> = ({ children }) =>  {
    return (
      <>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </>
    )
  }

export default Layout;