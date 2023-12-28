import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";

type FeatureItem = {
  title: JSX.Element;
  link: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="intro-title">Introduction</Translate>,
    link: "/docs/intro",
    description: (
      <Translate id="intro-desc">
        Introduction to the Druid project and its goals. Learn about the Druid
      </Translate>
    ),
  },
  {
    title: <Translate id="guides-title">Guides</Translate>,
    link: "/docs/category/guides",
    description: (
      <Translate id="guides-desc">
        Guides for using Druid. Learn how to use Druid to solve common problems.
      </Translate>
    ),
  },
  {
    title: <Translate id="contribute-title">How to contribute</Translate>,
    link: "/docs/intro",
    description: (
      <Translate id="contribute-desc">
        Learn how to contribute to Druid.
      </Translate>
    ),
  },
];

function Feature({ title, link, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Link to={link}>
          <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
