import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Page.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Taher Amine ELHOUARI</title>
      </Head>

      <Layout>
        <section className={styles.pageHeader}>
          <span>About</span>
          <h1>Building at the intersection of software and security.</h1>
          <p>
            My professional journey began in programming and web development
            before expanding into cybersecurity, advisory, training and
            leadership. This portfolio represents my continued development in
            modern software engineering.
          </p>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.panel}>
            <h2>Core Skills</h2>
            <ul>
              <li>React and Next.js</li>
              <li>JavaScript and TypeScript</li>
              <li>HTML and CSS</li>
              <li>Git and GitHub</li>
              <li>Cybersecurity architecture and governance</li>
              <li>Secure software thinking</li>
            </ul>
          </article>

          <article className={styles.panel}>
            <h2>Current Focus</h2>
            <p>
              I am strengthening my software engineering capabilities while
              combining them with extensive cybersecurity experience to create
              solutions that are useful, maintainable and secure by design.
            </p>
          </article>
        </section>
      </Layout>
    </>
  );
}
