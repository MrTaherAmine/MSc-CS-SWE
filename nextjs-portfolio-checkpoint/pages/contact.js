import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Page.module.css";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Taher Amine ELHOUARI</title>
      </Head>

      <Layout>
        <section className={styles.pageHeader}>
          <span>Contact</span>
          <h1>Let&apos;s connect.</h1>
          <p>
            This checkpoint uses a simple front-end contact form. A production
            version could connect the form to an API route or external service.
          </p>
        </section>

        <form className={styles.contactForm}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="6"
              placeholder="Write your message..."
            />
          </label>

          <button type="submit">Send Message</button>
        </form>
      </Layout>
    </>
  );
}
