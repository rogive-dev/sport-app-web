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

const tabs = [
  { label: 'Dieta', value: 'dieta' },
  { label: 'Deporte', value: 'deporte' },
  { label: 'Demográfico', value: 'demografico' },
];

const Page = () => {
  const settings = useSettings();
  const [currentTab, setCurrentTab] = useState('dieta');

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
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Registro</Typography>
                </div>
              </Stack>
            </Grid>
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
            {currentTab === 'dieta' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <div>
                    <Typography variant="h6">Dieta</Typography>
                  </div>
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
                  <div>
                    <Typography variant="h6">Deporte</Typography>
                  </div>
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
                  <div>
                    <Typography variant="h6">Demografico</Typography>
                  </div>
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
