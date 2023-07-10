import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";

import "bootstrap/dist/css/bootstrap.css";

export default function Playground() {
  return (
    <Layout>
      <BrowserOnly>
        {() => {
          const { Playground } = require("@site/src/components/Playground");
          return <Playground />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
