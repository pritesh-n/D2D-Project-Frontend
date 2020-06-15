import App from "next/app";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { AppProvider } from "../helpers/AppContext";

export default class MyApp extends App {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ Component, router, ctx }) {
    try {
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      return { pageProps };
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <AppProvider>
          <Head>
            <title>FunFiesta - {Component.name}</title>
            <link
              rel="preload"
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
              as="style"
              onLoad="this.onload=null;this.rel='stylesheet'"
            ></link>
            <meta name="robots" content="noindex,nofollow" />
          </Head>
          <Layout componentName={Component.name.toLowerCase()}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </React.Fragment>
    );
  }
}
