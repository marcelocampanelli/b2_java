import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">Configurações para: {account.login}</h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="Primeiro nome"
              id="firstName"
              placeholder="Primeiro nome bb"
              validate={{
                required: { value: true, message: 'Bota o nome ae menó.' },
                minLength: { value: 1, message: 'Carai menó, é um nome, não uma letra' },
                maxLength: { value: 50, message: 'Caraio menó, é um nome não um texto!' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Ultimo nome menó"
              id="lastName"
              placeholder="Ultimo nome"
              validate={{
                required: { value: true, message: 'Bota o nome ae menó.' },
                minLength: { value: 1, message: 'Carai menó, é um nome, não uma letra' },
                maxLength: { value: 50, message: 'Caraio menó, é um nome não um texto!' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder={'Seu email BB'}
              type="email"
              validate={{
                required: { value: true, message: 'Bota o nome ae menó.' },
                minLength: { value: 5, message: 'Carai menó you burrão!' },
                maxLength: { value: 240, message: 'Caraio menó, é um nome não um texto!' },
                validate: v => isEmail(v) || 'xiiii deu ruim com esse email, bota oto ai bb =3.',
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              Salvar
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
