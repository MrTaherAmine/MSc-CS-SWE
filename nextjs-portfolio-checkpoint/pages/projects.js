import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Page.module.css";

const projects = [
  {
    title: "MovieVerse",
    description:
      "A React movie application using hooks, filtering, forms and routing.",
    image: "/project-movie.svg",
    stack: "React • Hooks • Router"
  },
  {
    title: "TaskFlow",
    description:
      "A persistent task manager demonstrating state management and localStorage.",
    image: "/project-task.svg",
    stack: "React • State • localStorage"
  },
  {
    title: "Redux Todo",
    description:
      "A Todo application using Redux Toolkit for global application state.",
    image: "/project-redux.svg",
    stack: "React • Redux Toolkit"
  }
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Taher Amine ELHOUARI</title>
      </Head>

      <Layout>
        <section className={styles.pageHeader}>
          <span>Projects</span>
          <h1>Selected software engineering work.</h1>
          <p>
            A selection of projects completed while developing modern front-end
            and application-state skills.
          </p>
        </section>

        <section className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <Image
                src={project.image}
                alt={`${project.title} project illustration`}
                width={720}
                height={430}
                className={styles.projectImage}
              />
              <div className={styles.projectBody}>
                <span>{project.stack}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </section>
      </Layout>
    </>
  );
}
