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

export const FoodForm = (props) => {
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
        <CardContent sx={{ width: "750px", pt: 0,  padding: '0',}}>
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
                image="/assets/banners/food-banner.png"
                sx={{ height: 150, borderRadius: '12px'}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{ paddingTop: '58px' }}
            >
              <TextField
                fullWidth
                label="Dieta"
                select
                sx={{
                  '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                    backgroundColor: 'white',
                    border: 'solid 1px #656769',
                    height: '56px',
                    boxShadow: '3px 3px 3px #ABAEB1',
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
              md={6}
              xs={12}
              sx={{ paddingTop: '58px' }}
            >
              <TextField
                fullWidth
                label="Comida Preferida"
                select
                sx={{
                  '& .css-298dwa-MuiInputBase-root-MuiFilledInput-root': {
                    backgroundColor: 'white',
                    border: 'solid 1px #656769',
                    height: '56px',
                    boxShadow: '3px 3px 3px #ABAEB1',
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
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3, paddingTop: '80px', justifyContent: 'center'}}
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

FoodForm.propTypes = {
  foodPreferences: PropTypes.object.isRequired,
};
