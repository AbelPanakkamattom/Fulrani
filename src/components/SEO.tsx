import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  type?: string;
}

export default function SEO({ title, description, keywords, path = "/", type = "website" }: SEOProps) {
  const url = `https://fulrani.com${path}`;
  const fullTitle = path === "/" ? title : `${title} | Fulrani Advertisement Agency & Digital Marketing Company`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Fulrani Advertising & Marketing" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
