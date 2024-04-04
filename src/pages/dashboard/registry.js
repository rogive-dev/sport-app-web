import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { FoodForm } from 'src/sections/dashboard/registry/food-form';
import { SportForm } from 'src/sections/dashboard/registry/sport-form';
import { DemographicForm } from 'src/sections/dashboard/registry/demographic-form';

const tabs = [
  { label: 'Dieta', value: 'dieta' },
  { label: 'Deporte', value: 'deporte' },
  { label: 'Demográfico', value: 'demografico' },
];

const Page = () => {
  const settings = useSettings();
  const [currentTab, setCurrentTab] = useState('dieta');
  const foodPreferences = null;
  const sportPreferences = null;
  const demographicPreferences = null;

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          backgroundColor: 'neutral.100',
          flexGrow: 1,
          py: 8,
          paddingTop: '32px'
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid
              xs={12}
            >
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                TabIndicatorProps={{
                  style: { display: 'none' }
                }}
                textColor="primary"
                value={currentTab}
                variant="scrollable"
                sx={{
                  '& .css-heg063-MuiTabs-flexContainer': {
                    justifyContent: 'center',
                    '& > .css-1uhvit7-MuiButtonBase-root-MuiTab-root:first-child': {
                      borderRadius: '50px 0 0 50px',
                    },
                    '& > .css-1uhvit7-MuiButtonBase-root-MuiTab-root:last-child': {
                      borderRadius: '0 50px 50px 0',
                    },
                  },
                  '& .css-1uhvit7-MuiButtonBase-root-MuiTab-root': {
                    width: '250px',
                    border: 'solid 1px #656769',
                    backgroundColor: 'white',
                    height: '33px',
                    minHeight: '33px',
                    boxShadow: '3px 3px 3px #ABAEB1',
                  },
                  '& .css-1uhvit7-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                    backgroundColor: '#f97316',
                    border: 'solid 1px #f97316',
                    color: 'white'
                  },
                  '& .css-1uhvit7-MuiButtonBase-root-MuiTab-root+.css-1uhvit7-MuiButtonBase-root-MuiTab-root': {
                    marginLeft: '0px'
                  },
                }}
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider />
            </Grid>
            {currentTab === 'dieta' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={4}
                >
                  <FoodForm data={foodPreferences} />
                </Stack>
              </Grid>
            )}
            {currentTab === 'deporte' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <SportForm data={sportPreferences} />
                </Stack>
              </Grid>
            )}
            {currentTab === 'demografico' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={10}
                >
                  <DemographicForm data={demographicPreferences} />
                </Stack>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
