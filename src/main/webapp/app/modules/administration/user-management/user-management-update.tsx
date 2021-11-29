import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(props.match.params.login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.login]);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Criar ou editar um usuário</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Carregando</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'campo necessário',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Seu login é necessário burrao',
                  },
                  minLength: {
                    value: 1,
                    message: 'tudo isso? ta economizando teclado? escreve mais ai carai.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'quer escrever musica? .',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="Primeiro nome"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'tudo isso? ta economizando teclado? escreve mais ai carai.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Ultimo nome"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'tudo isso? ta economizando teclado? escreve mais ai carai.',
                  },
                }}
              />
              
              <ValidatedField
                name="email"
                label="Email"
                placeholder={'Seu email'}
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Nao pode ser nulo garai',
                  },
                  minLength: {
                    value: 5,
                    message: 'tudo isso? ta economizando teclado? escreve mais ai carai.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'ma que carai quer escrever musica carai.',
                  },
                  validate: v => isEmail(v) || 'Your email is invalid.',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="Ativo?" />
              <ValidatedField type="select" name="authorities" multiple label="Role">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Voltar</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Salvar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
