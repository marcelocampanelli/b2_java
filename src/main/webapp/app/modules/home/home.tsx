import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Eaee menó!</h2>
        <p className="lead">Salve fiote</p>
        {account?.login ? (
          <div>
            <Alert color="success">Logado com sucesso! Seu usuário é:{account.login}.</Alert>
          </div>
        ) : (
            <div>
            <Alert color="warning">
              Você pode testar os dois tipo de constas
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {' '}
                só realizando o login
              </Link>
              , e usar as contas padrões
              <br />- adm (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- user (login=&quot;user&quot; and password=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              Não tem uma conta??&nbsp;
              <Link to="/account/register" className="alert-link">
                Crie a sua agora mesmo
              </Link>
            </Alert>
          </div>
        )}  
      </Col>
    </Row>
  );
};

export default Home;
