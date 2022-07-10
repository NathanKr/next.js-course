import { Divider } from '@mui/material';
import styles from '../../styles/footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Divider/>
            <p>@ 2022 SPWS. ALL RIGHTS RESERVED</p>
        </div>
    );
};

export default Footer;