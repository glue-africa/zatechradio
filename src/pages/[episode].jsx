import { useMemo } from 'react'
import Head from 'next/head'
import { parse } from 'rss-to-json'
import { NextSeo } from 'next-seo';

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { PlayButton } from '@/components/player/PlayButton'

export default function Episode({ episode }) {
  let date = new Date(episode.published)

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  return (
    <>
      <Head>
        <title>{`${episode.title} - Their Side`}</title>
        <meta name="description" content={episode.description} />
      </Head>
      <NextSeo
        title={`${ episode.title } - ZATechRadio`}
        description={`${episode.description}`}
        canonical={`${episode.url}`}
        openGraph={{
          url: `https://zatechradio/${episode.id}`,
          title: episode.title,
          description: episode.description,
          images: [
            {
              url: './public/icon-512x512.png',
              width: 512,
              height: 512,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          siteName: 'ZATechRadio',
        }}
        twitter={{
          handle: '@zatechradio',
          site: '@zatechradio',
          cardType: 'summary_large_image',
        }}
      />
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: episode.description }} />
          </header>
          <hr className="my-12 border-gray-200" />
          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          />
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  const feed = await parse('https://iono.fm/rss/chan/7095')
  let episodes = feed.items
  .map(({ id, title, description, enclosures, created, published }) => ({
    id: created,
    title: `${title}`,
    description,
    published,
    audio: enclosures.map((enclosure) => ({
      src: enclosure.url,
      type: enclosure.type,
    }))[0],
  }))
  
  const episode = episodes.filter((item) => item.id == params.episode)[0]


  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const feed = await parse('https://iono.fm/rss/chan/7095')
  return {
    paths: feed.items.map(({ id }) => ({
      params: {
        episode: id,
      },
    })),
    fallback: 'blocking',
  }
}
