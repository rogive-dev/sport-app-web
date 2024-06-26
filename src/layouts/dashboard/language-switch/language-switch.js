import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { usePopover } from 'src/hooks/use-popover';

import { LanguagePopover } from './language-popover';

const languages = {
  pt: '/assets/flags/flag-br.svg',
  escl: '/assets/flags/flag-cl.svg',
  es: '/assets/flags/flag-co.svg',
};

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const popover = usePopover();

  const flag = languages[i18n.language];

  return (
    <>
      <Tooltip title="Language">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <Box
            sx={{
              width: 28,
              '& img': {
                width: '100%',
              },
            }}
          >
            <img src={flag} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
