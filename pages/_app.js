import App from "next/app";
import Layout from "../components/layout/Layout";
import Head from "next/head";

export default class MyApp extends App {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ Component, router, ctx }) {
    try {
      let pageProps = {};
      console.log(Component.name);
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
        <Head>
          <title>FunFiesta - {Component.name}</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href={`/static/css/${Component.name.toLowerCase()}.css`}
            rel="stylesheet"
            key="test"
          />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <Layout componentName={Component.name.toLowerCase()}>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
