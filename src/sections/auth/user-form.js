import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/hooks/use-router';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { gray } from 'src/theme/colors';

const initialValues = {
  email: '',
  name: '',
  password: '',
  policy: false,
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name: Yup.string().max(255).required('Name is required'),
  password: Yup.string().min(7).max(255).required('Password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const documentOptions = [
  {
    value: "cc",
    label: "Cedula de Cíudadania",
  },
  {
    value: "pasaporte",
    label: "Pasaporte",
  }
];

export const UserForm = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { issuer, signUp } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signUp(values.email, values.name, values.password);

        if (isMounted()) {
          router.push(paths.dashboard.index);
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

  return (
    <Stack
      justifyContent="center"
      spacing={4}
    >
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Apellido"
              name="lastname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
            <TextField
              fullWidth
              label="Tipo de documento"
              select
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            >
              {documentOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Número"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Correo Electrónico"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingTop: '24px' }}
          >
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
              sx={{
                '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                  backgroundColor: 'white',
                  border: `solid 1px ${gray[900]}`,
                  height: '56px',
                  boxShadow: `3px 3px 3px ${gray[700]}`,
                },
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
            mt: 1,
          }}
        >
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
          />
          <Typography
            color="text.secondary"
            variant="body2"
          >
            I have read the{' '}
            <Link
              component="a"
              href="#"
            >
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {!!(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}
        {formik.errors.submit && (
          <FormHelperText
            error
            sx={{ mt: 3 }}
          >
            {formik.errors.submit}
          </FormHelperText>
        )}
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </form>
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
          ¿Ya posees una cuenta? &nbsp;
          <Link
            component={RouterLink}
            href={paths.auth.jwt.login}
            underline="hover"
            variant="subtitle2"
          >
            Inicia sesión
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

UserForm.propTypes = {
  issuer: PropTypes.string.isRequired,
};
