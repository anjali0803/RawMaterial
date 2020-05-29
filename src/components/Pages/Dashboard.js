import React from 'react'
import './index.css'
import LoadingScreen from './LoadingScreen/loadingScreen'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, CardTitle, CardBody, CardFooter, Progress } from 'reactstrap'
import Charts from '../Charts'
import CountCard from '../CountCard'
import { Line } from 'react-chartjs-2'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import dashboardData from '../../utils/dashboard.json'
import moment from 'moment'
import {backendUrl} from '../../constant'
import axios from 'axios'

export default class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      data: {
        createdCount: [],
        dueCount: [],
        submitCount: [],
        failCount: []
      },
      piechartCreated: {},
      piechartSubmitted: {},
      piechartDelayed: {},
      piechartOnTime: {}
    }
  }

  async componentDidMount(){
    this.setState({
      isLoading: true
    })
    // const dashboardRes = await axios.get(
    //   `${backendUrl}/dashboard/get_dashboard`
    // )
    // // this.setState({
    // //   data: dashboardRes.data.data
    // // })

    // const keys = Object.keys(dashboardRes.data.data);

    // keys.forEach(card => {
    //   const ks = Object.keys(dashboardRes.data.data[card]);
    //   let obj = [];
    //   ks.forEach(k => {
    //     obj.push(
    //       {
    //         label: (k.charAt(0).toUpperCase() + k.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" "),
    //         value: dashboardRes.data.data[card][k]
    //       }
    //     )
    //   })
    //   let newObj = {
    //     ...this.state.data
    //   };
    //   newObj[card] = obj
    //   this.setState({
    //     data: newObj,
    //   })
    // });
    // this.setState({
    //   piechartCreated: dashboardRes.data.data.piechartCreated,
    //   piechartSubmitted: dashboardRes.data.data.piechartSubmitted,
    //   piechartDelayed: dashboardRes.data.data.piechartDelayed,
    //   piechartOnTime: dashboardRes.data.data.piechartOnTime,
    //   isLoading: false
    // })
    this.setState({
      isLoading:false
    })
  }

  render () {
    return this.state.isLoading === false ? 
      <Container fluid={true}>
        Dashboard
        {/* <Col xs={12}>
          <Row>
            <CountCard title={'Inquiry Created'} glyph={'icon-fontello-cart'} items={this.state.data.createdCount} />
            <CountCard title={'Inquiry Due'} glyph={'icon-fontello-money'} items={this.state.data.dueCount} />
          </Row>
          <Row>
            <CountCard title={'Inquiry Submitted'} glyph={'icon-fontello-money'} items={this.state.data.submitCount} />
            <CountCard title={'Inquiry Delayed'} glyph={'icon-fontello-money'} items={this.state.data.failCount} />
          </Row>
        </Col>
        <Col xs={12}>
      <Row>
        <Col md={6} className="pieCol-1">
          <Row className="pieRow">
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Project Created'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['HFW', 'HSAW',]}
                records={[this.state.piechartCreated['hfw'], this.state.piechartCreated['hsaw']]}
              />
            </Col>
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Project Submitted'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['HFW', 'HSAW']}
                records={[this.state.piechartSubmitted['hfw'], this.state.piechartSubmitted['hsaw']]}
              />
            </Col>
          </Row>
        </Col>
        <Col md={6} className="pieCol-2">
          <Row className="pieRow">
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Project Delayed'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['HFW', 'HSAW']}
                records={[this.state.piechartDelayed['hfw'], this.state.piechartDelayed['hsaw']]}
              />
            </Col>
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Project on Time'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['HFW', 'HSAW']}
                records={[this.state.piechartOnTime['onTime'], this.state.piechartOnTime['delayed']]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col> */}
      </Container>
     : 
      <LoadingScreen />
    
  }
}
