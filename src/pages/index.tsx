import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

export default function Home(): JSX.Element {
  return (
    <Layout title="Druid Docs">
      <section className="margin-bottom--xl">
        <div className="container">
          <Heading className="text--center margin-vert--lg" as="h1">
            Druid Documentation
          </Heading>
        </div>
      </section>
      <HomepageFeatures />
    </Layout>
  );
}
