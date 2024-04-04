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

// const useFoodPreferences = () => {
//   const isMounted = useMounted();
//   const [customer, setCustomer] = useState(null);

//   const handleCustomerGet = useCallback(async () => {
//     try {
//       const response = await customersApi.getCustomer();

//       if (isMounted()) {
//         setCustomer(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);

//   useEffect(
//     () => {
//       handleCustomerGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return customer;
// };

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
            {currentTab === 'dieta' && (
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
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
