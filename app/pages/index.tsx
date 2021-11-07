import { invokeWithMiddleware, QueryClient, getQueryKey, dehydrate, useQuery } from "blitz"

import MintButton from "app/mint/components/MintButton"
import getSession from "app/users/queries/getSession"

import Layout from "app/core/layouts/Layout"

export const getServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getSession, null)
  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getSession, {}, { req, res })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Home = () => {
  const [session] = useQuery(getSession, null)

  return <div>{session ? <MintButton /> : null}</div>
}

Home.getLayout = (page) => <Layout>{page}</Layout>
export default Home
