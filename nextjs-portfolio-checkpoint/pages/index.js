import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  return {
    props: {
      renderedAt: new Date().toISOString()
    }
  };
}

export default function Home({ renderedAt }) {
  return (
    <>
      <Head>
        <title>Taher Amine ELHOUARI | Portfolio</title>
        <meta
          name="description"
          content="Next.js portfolio showcasing skills, projects and contact information."
        />
      </Head>

      <Layout>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Next.js Portfolio Checkpoint</span>
            <h1>Taher Amine ELHOUARI</h1>
            <p className={styles.lead}>
              Cybersecurity leader, advisor and software engineering student
              building secure, practical and modern digital solutions.
            </p>

            <div className={styles.actions}>
              <a href="/projects" className={styles.primaryButton}>
                View Projects
              </a>
              <a href="/contact" className={styles.secondaryButton}>
                Contact Me
              </a>
            </div>

            <p className={styles.ssrNote}>
              Server-rendered at: {new Date(renderedAt).toLocaleString()}
            </p>
          </div>

          <div className={styles.heroImageWrap}>
            <Image
              src="/profile.svg"
              alt="Taher Amine ELHOUARI profile illustration"
              width={420}
              height={420}
              priority
              className={styles.heroImage}
            />
          </div>
        </section>

        <section className={styles.summaryGrid}>
          <article>
            <strong>Cybersecurity</strong>
            <span>Governance, resilience, advisory and assurance</span>
          </article>

          <article>
            <strong>Software Engineering</strong>
            <span>React, Next.js, TypeScript and modern web development</span>
          </article>

          <article>
            <strong>Leadership</strong>
            <span>Training, mentoring and multidisciplinary delivery</span>
          </article>
        </section>
      </Layout>
    </>
  );
}
