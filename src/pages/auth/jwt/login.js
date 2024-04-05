import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { paths } from 'src/paths';
import { TenantSwitch } from 'src/layouts/dashboard/tenant-switch';
import { Issuer } from 'src/utils/auth';

const initialValues = {
  email: 'demo@devias.io',
  password: 'Password123!',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { issuer, signIn } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password);

        if (isMounted()) {
          router.push(paths.dashboard.registry);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Stack
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            sx={{ p: 3 }}
          >
            <CardMedia
                image="/assets/logos/logo-sportapp.svg"
                sx={{ height: 122, width: 409, mb: 6 }}
              />
          </Stack>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                autoFocus
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Correo Electrónico"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Stack>
            {formik.errors.submit && (
              <FormHelperText
                error
                sx={{ mt: 3 }}
              >
                {formik.errors.submit}
              </FormHelperText>
            )}
            <Stack
              alignItems="center"
              justifyContent="center"
              direction="row"
              sx={{ p: 3 }}
            >
              <Button
                disabled={formik.isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Typography
            color="text.secondary"
            variant="body2"
          >
            ¿No tienes una cuenta aún? &nbsp;
            <Link
              component={RouterLink}
              href={paths.auth.jwt.register}
              underline="hover"
              variant="subtitle2"
            >
              Registrate
            </Link>
          </Typography>
        </Stack>
      </div>
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
