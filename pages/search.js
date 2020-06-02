import Head from "next/head";

const Search = ({ name }) => {
  return <div>{name}</div>;
};

Search.getInitialProps = async ({ req, query }) => {
  return { name: "search" };
};

export default Search;
