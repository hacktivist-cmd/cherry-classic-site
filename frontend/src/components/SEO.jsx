import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => (
  <Helmet>
    <title>{title} | Cherry Classic Hair</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

export default SEO;
