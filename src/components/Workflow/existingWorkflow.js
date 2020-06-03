import React, { Component } from 'react'
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardBody, CardFooter, Progress, Button } from 'reactstrap'
import './workflow.scss'

// import {Card} from 'primereact/card';
// import {Button} from 'primereact/button';

export default class ExistingWorkflow extends React.Component {
    render() {
        return <Container fluid={true}>
            <Row>
                <WorkflowCard title={"Title"} subtitle={"Subtitle"} text={"Text"}/>
                <WorkflowCard title={"Title2"} subtitle={"Subtitle2"} text={"Text2"}/>
            </Row>

        </Container>
    }
}


const WorkflowCard = (props) => {
    return (
        <div>
            <Container style={{padding:'30px'}}>
            <Card body>
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardSubtitle>{props.subtitle}</CardSubtitle>
                    {/* </CardBody> */}
                    {/* <img width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                    {/* <CardBody> */}
                    <CardText>{props.text}</CardText>
                    {/* <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink> */}
                    <button className = "control-button save-btn">Save</button>
                    <button className = "control-button delete-button">Cancel</button>
                </CardBody>
            </Card>
            </Container>
        </div>
    );
};