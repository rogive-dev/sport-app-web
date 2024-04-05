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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { purple, gray } from 'src/theme/colors';
import { wait } from 'src/utils/wait';

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

const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const SportForm = (props) => {
  const { foodPreferences, ...other } = props;
  const formik = useFormik({
    initialValues: {
      VO2Max: foodPreferences?.VO2Max || '',
      FTP: foodPreferences?.FTP || '',
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
      VO2Max: Yup.string().max(255),
      FTP: Yup.string().max(255),
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
        <CardContent sx={{ width: "750px", pt: 0,  padding: '0',}}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
              sx={{ paddingTop: '24px' }}
            >
              <CardMedia
                image="/assets/banners/sport-banner.png"
                sx={{ height: 150, borderRadius: '12px'}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{ paddingTop: '48px' }}
            >
              <TextField
                fullWidth
                label="Deporte"
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
              xs={12}
              md={6}
              sx={{ paddingTop: '48px' }}
            >
              <TextField
                error={!!(formik.touched.VO2Max && formik.errors.VO2Max)}
                fullWidth
                helperText={formik.touched.VO2Max && formik.errors.VO2Max}
                label="VO2 Max"
                name="VO2Max"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.VO2Max}
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
              sx={{ paddingTop: '20px' }}
            >
              <TextField
                fullWidth
                label="Preferencia Horaria"
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
              xs={12}
              md={6}
              sx={{ paddingTop: '20px' }}
            >
              <TextField
                error={!!(formik.touched.FTP && formik.errors.FTP)}
                fullWidth
                helperText={formik.touched.FTP && formik.errors.FTP}
                label="FTP"
                name="FTP"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.FTP}
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
              xs={12}
              md={12}
              sx={{
                paddingTop: '30px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  marginBottom: '20px'
                }}
              >
                Días de entrenamiento
              </Typography>
              {weekDays.map((day, index) => (
                <FormControlLabel
                  key={`checkbox-day-${index + 1}`}
                  control={
                    <Checkbox
                      sx={{
                        '&.Mui-checked': {
                          color: purple.main,
                        },
                      }}
                    />
                  }
                  label={day}
                  labelPlacement='top'
                  sx={{
                    color: 'primary.main',
                    margin: 0
                  }}
                />
              ))}
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

SportForm.propTypes = {
  foodPreferences: PropTypes.object.isRequired,
};
