import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/router'

export default function NavBarColorTabs() {
  const [value, setValue] = React.useState('0');
  const router = useRouter();

  const routes = ['/' , '/blogs' , '/comments' , '/portfolio' , '/about']

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    let index = Number(newValue);
    router.push(routes[index])
  };

  return (
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="0" label="HOME" />
        <Tab value="1" label="BLOGS" />
        <Tab value="2" label="COMMENTS" />
        <Tab value="3" label="PORTFOLIO" />
        <Tab value="4" label="ABOUT" />
      </Tabs>
  );
}
