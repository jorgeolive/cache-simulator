import Layout from '../components/Layout/Layout';
import CacheSimulator from '../containers/CacheSimulator/CacheSimulator';
import Head from 'next/head';

function App() {
  return (
    <div>
       <Head>
        <title>Cache Simulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout headerTitle = {"Cache Simulator"}>
        <CacheSimulator></CacheSimulator>
      </Layout>
    </div>
  );
}

export default App;
