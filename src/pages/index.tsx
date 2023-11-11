import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import { Redirect } from "@docusaurus/router";

export default function Home(): JSX.Element {
  return <Redirect to="/docs/intro" />;
}
