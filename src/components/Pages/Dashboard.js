import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Charts from '../Charts';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return <Container>
            <Row>
                <Col xs={12} sm={12}>
                <Col xs={12} sm={4}>
                <Col xs={6} sm={6}>
                    <Row>
                    <h5 className={"pieTitle"}>{"Project assigned"}</h5>
                    </Row>
                    <Row>
                    <Charts
                        title="Request"
                        type="doughnut"
                        labels={["","Other","Radio","YouTube","Television","Google Search","Billboard","Magazine Ad"]}
                        records={[15,1,7,1,4,2,2,1]}
                        labelCurrency={'$'}
                    />
                    </Row>
                </Col>
                <Col xs={6} sm={6}>
                    <Row>
                    <h5 className={"pieTitle"}>{"Ongoing Projects"}</h5>
                    </Row>
                    <Row>
                    <Charts
                        title="Request"
                        type="doughnut"
                        labels={["","Other","Radio","YouTube","Television","Google Search","Billboard","Magazine Ad"]}
                        records={[15,1,7,1,4,2,2,1]}
                        labelCurrency={'$'}
                    />
                    </Row>
                </Col>
                </Col>
                <Col xs={12} sm={4} >
                <Col xs={6}>
                    <Row>
                    <h5 className={"pieTitle"}>{"Closed Projects"}</h5>
                    </Row>
                    <Row>
                    <Charts
                        title="Request"
                        type="doughnut"
                        labels={["","Other","Radio","YouTube","Television","Google Search","Billboard","Magazine Ad"]}
                        records={[15,1,7,1,4,2,2,1]}
                        labelCurrency={'$'}
                    />
                    </Row>
                </Col>
                
                <Col xs={6}>
                    <Row>
                    <h5 className={"pieTitle"}>{"Archived Projects"}</h5>
                    </Row>
                    <Row>
                    <Charts
                        title="Request"
                        type="doughnut"
                        labels={["","Other","Radio","YouTube","Television","Google Search","Billboard","Magazine Ad"]}
                        records={[15,1,7,1,4,2,2,1]}
                        labelCurrency={'$'}
                    />
                    </Row>
                </Col>
                </Col>
                </Col>
            </Row>
        </Container>
    }
}


export default Dashboard;