import React from 'react';
import Layout from '@theme/Layout';
import '/src/css/custom.css';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Index() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <div className="container">
        <div className="row mainpage-row">
          <div className="col col--6 mainpage-col">
            <h1 className="hero__title">Вкусно о данных</h1>
            <p className="hero__subtitle">
              База знаний аналитика. Говорим о данных без снобизма и простыми словами. Документация, рабочие кейсы, скрипты, обзоры инструментов и многое другое.
            </p>
            <div className="mainpage-button">
              <Link className="button button--primary button--lg" to="/docs">
                  Инструкции
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                  Блог
              </Link>
            </div>
          </div>
          <div className="col col--6">
            <img src="/img/pizdata_main.png" alt="Docusaurus Logo" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;