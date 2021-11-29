import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './blog.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BlogDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const blogEntity = useAppSelector(state => state.blog.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="blogDetailsHeading">Blog</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{blogEntity.id}</dd>
          <dt>
            <span id="name">Nome</span>
          </dt>
          <dd>{blogEntity.name}</dd>
          <dt>
            <span id="handle">Assunto</span>
          </dt>
          <dd>{blogEntity.handle}</dd>
          <dt>User</dt>
          <dd>{blogEntity.user ? blogEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/blog" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Voltar</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/blog/${blogEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BlogDetail;
