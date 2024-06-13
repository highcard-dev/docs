import configBlog from "./docusaurus-blog.config";
import configDocs from "./docusaurus-docs.config";

const mode: "BLOG" | "DOCS" = process.env.MODE || "DOCS";

export default mode === "DOCS" ? configDocs : configBlog;
