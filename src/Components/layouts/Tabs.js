import React, { useMemo } from 'react';
import { Fade, Tab, Tabs as MuiTabs, ThemeProvider } from '@material-ui/core';
import { denseTabsTheme, tabsTheme } from '../../lib/muiThemes';
import Hr from './Hr';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

const Tabs = ({ dense = false, tabs = [], currentTab = 0 }) => {
  const [tab, setTab] = useState(() => currentTab);

  // Constants
  const tabKey = useMemo(() => tabs.map(_ => nanoid(6)), []);
  const fadeKeys = useMemo(() => tabs.map(_ => nanoid(6)), []);

  // Handlers
  const handleSwitchTab = (e, tab) => {
    setTab(tab);
  };

  // Helpers
  const a11yProps = index => {
    return {
      key: index,
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  };

  useEffect(() => {
    setTab(currentTab);
  }, [currentTab]);

  return (
    <ThemeProvider theme={dense ? denseTabsTheme : tabsTheme}>
      <div className='flex flex-col space-y-3.5'>
        <MuiTabs
          color='inherit'
          value={tab}
          onChange={handleSwitchTab}
          aria-label='tabs'
        >
          {tabs.map((t, i) => (
            <Tab key={tabKey[i]} label={t.label} {...a11yProps(i)} />
          ))}
        </MuiTabs>
        <Hr className='w-4/5 self-center text-blacks-dark opacity-30' />
        {tabs.map(({ component }, i) => (
          <Fade key={fadeKeys[i]} in={tab === i}>
            <TabPanel key={i} value={tab} index={i}>
              {component}
            </TabPanel>
          </Fade>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default Tabs;

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className='pt-2 w-full'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};
