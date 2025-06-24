import Head from 'next/head'

const DEFAULT_TITLE =
  'ZATechRadio - Helping techies get in, stay in and thrive in tech'
const DEFAULT_DESCRIPTION =
  'Helping techies get in, stay in and thrive in tech. One conversation at a time'
const DEFAULT_IMAGE = '/images/zatechradio_poster.jpg' // Update this path as needed
const SITE_URL = 'https://zatechradio.com' // Update with your actual domain

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
  children,
}) {
  const siteTitle = title === DEFAULT_TITLE ? title : `${title} | ZATechRadio`
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="ZATechRadio" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {children}
    </Head>
  )
}
