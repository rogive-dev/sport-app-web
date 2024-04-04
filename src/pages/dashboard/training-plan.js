import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const tabs = [
  { label: 'Plan de Entrenamiento', value: 'plan-de-entrenamiento' },
  { label: 'Calendario', value: 'calendario' },
];

const Page = () => {
  const settings = useSettings();
  const [currentTab, setCurrentTab] = useState('plan-de-entrenamiento');

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
                textColor="primary"
                value={currentTab}
                variant="scrollable"
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
            {currentTab === 'plan-de-entrenamiento' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={4}
                >
                  <iframe src="/assets/pdf/plan-de-entrenamiento.pdf" width="70%" height="500px" />
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                </Box>
              </Grid>
            )}
            {currentTab === 'calendario' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
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
