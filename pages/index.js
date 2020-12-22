import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import InfoModal from '../components/InfoModal/InfoModal';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UOC Computer architecture Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout headerTitle={"UOC Computer architecture Tools"}>
        <div className={styles.main}>
          <div className={'box'}>
            <div className={"content is-medium"}>
              <Link href="/cache-simulator">Cache Simulator</Link>
              <p>Simulates cache behaviour based on different policies. It allows to configure initial snapshots and executing
              a given sequence of read operations.
            </p>
              <div className={styles.grid}>
              </div>
            </div>
          </div>
          <div className={'box'}>
            <div className={"content is-medium"}>
              <Link href="/control-flags"><b>Control flags</b></Link>
              <p>Demonstrates behaviour on the CPU control flags over basic operations.
            </p>
              <div className={styles.grid}>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
