import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
}

export default function SEO({ title, description, path = "/", type = "website" }: SEOProps) {
  const url = `https://fulrani.com${path}`;
  const fullTitle = path === "/" ? title : `${title} | Fulrani Advertising & Marketing`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
