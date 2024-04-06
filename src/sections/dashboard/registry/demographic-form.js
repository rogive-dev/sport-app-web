import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { gray } from 'src/theme/colors';

import { wait } from 'src/utils/wait';

export const DemographicForm = (props) => {
  const { foodPreferences, ...other } = props;
  const formik = useFormik({
    initialValues: {
      estatura: foodPreferences?.estatura || '',
      address2: foodPreferences?.address2 || '',
      country: foodPreferences?.country || '',
      email: foodPreferences?.email || '',
      hasDiscount: foodPreferences?.hasDiscount || false,
      isVerified: foodPreferences?.isVerified || false,
      name: foodPreferences?.name || '',
      phone: foodPreferences?.phone || '',
      state: foodPreferences?.state || '',
      submit: null,
    },
    validationSchema: Yup.object({
      estatura: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const dietOptions = [
    {
      value: "vegano",
      label: "vegano",
    },
    {
      value: "vegetariano",
      label: "vegano",
    },
    {
      value: "ninguno",
      label: "ninguno",
    }
  ];

  const foodOptions = [
    {
      value: "carnes",
      label: "carnes",
    },
    {
      value: "ensaladas",
      label: "ensaladas",
    },
    {
      value: "comidas rápidas",
      label: "comidasrapidas",
    }
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
        <CardContent sx={{ width: "886px", pt: 0,  padding: '0',}}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <CardMedia
                image="/assets/banners/demographic-banner.png"
                sx={{ height: 150, borderRadius: '12px'}}
              />
            </Grid>
            <Grid
              container
              item
              md={6}
              xs={12}
            >
              <Grid
                item
                xs={12}
                sx={{
                  paddingTop: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    paddingTop: 0,
                  }}
                >
                  Perfil
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.estatura && formik.errors.estatura)}
                  fullWidth
                  helperText={formik.touched.estatura && formik.errors.estatura}
                  label="Estatura(mt)"
                  name="estatura"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.estatura}
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
                md={6}
              >
                <TextField
                  error={!!(formik.touched.peso && formik.errors.peso)}
                  fullWidth
                  helperText={formik.touched.peso && formik.errors.peso}
                  label="Peso(kg)"
                  name="peso"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.peso}
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
                sx={{ paddingTop: '15px' }}
              >
                <TextField
                  fullWidth
                  label="Ciudad de Residencia"
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
                  {dietOptions.map((option) => (
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
                xs={12}
                sx={{ paddingTop: '15px' }}
              >
                <TextField
                  fullWidth
                  label="Ciudad de Nacimiento"
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
                  {foodOptions.map((option) => (
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
                xs={9}
                sx={{ paddingTop: '15px' }}
              >
                <TextField
                  fullWidth
                  label="Edad"
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
                  {foodOptions.map((option) => (
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
                xs={3}
                sx={{ paddingTop: '15px' }}
              >
                <TextField
                  error={!!(formik.touched.address2 && formik.errors.address2)}
                  fullWidth
                  helperText={formik.touched.address2 && formik.errors.address2}
                  label="IMC"
                  name="imc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address2}
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
            <Grid
              container
              item
              md={6}
              xs={12}
              sx={{
                height: '290px',
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  paddingTop: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    paddingTop: 0,
                  }}
                >
                  Química de la sangre
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ paddingTop: '8px' }}
              >
                <TextField
                  error={!!(formik.touched.glucosa && formik.errors.glucosa)}
                  fullWidth
                  helperText={formik.touched.glucosa && formik.errors.glucosa}
                  label="Glucosa"
                  name="glucosa"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.glucosa}
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
                md={6}
                sx={{ paddingTop: '8px' }}
              >
                <TextField
                  error={!!(formik.touched.acidoUrico && formik.errors.acidoUrico)}
                  fullWidth
                  helperText={formik.touched.acidoUrico && formik.errors.acidoUrico}
                  label="Ácido Úrico"
                  name="acidoUrico"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.acidoUrico}
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
                md={6}
                sx={{ paddingTop: '0' }}
              >
                <TextField
                  error={!!(formik.touched.urea && formik.errors.urea)}
                  fullWidth
                  helperText={formik.touched.urea && formik.errors.urea}
                  label="Urea"
                  name="urea"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.urea}
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
                md={6}
                sx={{ paddingTop: '0' }}
              >
                <TextField
                  error={!!(formik.touched.Colesterol && formik.errors.Colesterol)}
                  fullWidth
                  helperText={formik.touched.Colesterol && formik.errors.Colesterol}
                  label="Colesterol"
                  name="Colesterol"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address2}
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
                md={6}
                sx={{ paddingTop: '0' }}
              >
                <TextField
                  error={!!(formik.touched.trigliceridos && formik.errors.trigliceridos)}
                  fullWidth
                  helperText={formik.touched.trigliceridos && formik.errors.trigliceridos}
                  label="Triglicéridos"
                  name="trigliceridos"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.trigliceridos}
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
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3, justifyContent: 'center', paddingTop: '35px' }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
            sx={{ width: '106px', height: '36px', borderRadius: '8px'}}
          >
            Guardar
          </Button>
        </Stack>
    </form>
  );
};

DemographicForm.propTypes = {
  foodPreferences: PropTypes.object.isRequired,
};
