import { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';

import { Seo } from 'src/components/seo';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { Issuer } from 'src/utils/auth';
import { gray,orange } from 'src/theme/colors';
import { UserForm } from 'src/sections/auth/user-form';

const tabs = [
  { label: 'Usuario', value: 'user' },
  { label: 'Empresa', value: 'company' },
];

const Page = () => {
  const [currentTab, setCurrentTab] = useState('user');

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Register" />
      <Stack
        alignItems="start"
        justifyContent="start"
        direction="row"
        sx={{ p: 3, mb: 4, mr: 12, position: 'absolute', top: -15, left: -10 }}
      >
        <CardMedia
          image="/assets/logos/logo-sportapp.svg"
          sx={{ height: 86, width: 286, mb: 6 }}
        />
      </Stack>
      <Container maxWidth='xl'>
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
            sx={{ paddingTop: 0 }}
          >
            <Typography
              color="primary"
              variant="h3"
              sx={{ paddingBottom: '50px', textAlign: 'center' }}
            >
              Crear cuenta
            </Typography>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
              TabIndicatorProps={{
                style: { display: 'none' }
              }}
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
                  width: '170px',
                  border: `solid 1px ${orange.main}`,
                  backgroundColor: 'white',
                  height: '40px',
                  minHeight: '40px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
                '& .css-1uhvit7-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                  backgroundColor: 'primary.main',
                  border: 'solid 1px primary.main',
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
          </Grid>
          {currentTab === 'user' && (
            <Grid
              xs={12}
              sx={{ paddingTop: '15px' }}
            >
              <UserForm />
            </Grid>
          )}
          {currentTab === 'company' && (
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
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
