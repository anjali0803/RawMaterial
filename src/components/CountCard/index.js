import React from 'react';
import {Col, Container, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import './styles.css';

const CardContent = ({label, value}) => (
  <div>
    <Row className="rowRecords">
      <Col className="records" xs={7}>{label}</Col>
      <Col className="records" xs={5}>{value}</Col>
    </Row>
  </div>
);

const WrappedContent = ({linkTo, ...rest}) => (
  <Link to={linkTo} className="path">
    <CardContent {...rest}/>
  </Link>
);

const CardItem = ({linkTo, ...rest}) => (
  linkTo ? <WrappedContent linkTo={linkTo} {...rest}/> : <CardContent {...rest}/>
);

const CountCard = ({ glyph, title, items }) => (
  <Col md={4} className="boxAnalytic">
        <Container fluid={true}>
          <Row className="cardRow">
            <Col xs={12} className="padd25">
              <h3 className="title">{title}</h3>
              {items.map((item, i) => <CardItem key={`${title}_${i}`} {...item}/>)}
            </Col>
          </Row>
        </Container>
  </Col>
);

export default CountCard;
