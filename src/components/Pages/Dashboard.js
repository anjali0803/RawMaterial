import React from 'react'
import './index.css'
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
      data: {
        createdCount: [],
        dueCount: [],
        submitCount: [],
        failCount: []
      }
    }
  }

  async componentDidMount(){
    const dashboardRes = await axios.get(
      `${backendUrl}/dashboard/get_dashboard`
    )
    // this.setState({
    //   data: dashboardRes.data.data
    // })

    const keys = Object.keys(dashboardRes.data.data);

    keys.forEach(card => {
      const ks = Object.keys(dashboardRes.data.data[card]);
      let obj = [];
      ks.forEach(k => {
        obj.push(
          {
            label: k,
            value: dashboardRes.data.data[card][k]
          }
        )
      })
      let newObj = {
        ...this.state.data
      };
      newObj[card] = obj
      this.setState({
        data: newObj
      })
    });
  }

  render () {
    return (
      <Container fluid={true}>
        <Col xs={12}>
          <Row>
            <CountCard title={'Inquiry Created'} glyph={'icon-fontello-cart'} items={this.state.data.createdCount} />
            <CountCard title={'Inquiry Due'} glyph={'icon-fontello-money'} items={this.state.data.dueCount} />
          </Row>
          <Row>
            <CountCard title={'Inquiry Submitted'} glyph={'icon-fontello-money'} items={this.state.data.submitCount} />
            <CountCard title={'Inquiry Delayed'} glyph={'icon-fontello-money'} items={this.state.data.failCount} />
          </Row>
        </Col>
      </Container>
    )
  }
}
