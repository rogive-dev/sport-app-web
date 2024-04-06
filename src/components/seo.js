import Head from 'next/head';
import PropTypes from 'prop-types';

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title ? title + ' | SportApp' : 'SportApp';

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
