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

import { wait } from 'src/utils/wait';

export const SportForm = (props) => {
  const { foodPreferences, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: foodPreferences?.address1 || '',
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
      address1: Yup.string().max(255),
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
        <CardContent sx={{ width: "800px", pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <CardMedia
                image="/assets/banners/sport-banner.png"
                sx={{ height: 150 }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Category"
                select
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
            >
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Address 1"
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Category"
                select
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
            >
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label="Address 2"
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
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
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
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
