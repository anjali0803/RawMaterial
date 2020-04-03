import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, CardTitle, CardBody, CardFooter, Progress } from 'reactstrap'
import Charts from '../Charts'
import CountCard from '../CountCard'
import { Line } from 'react-chartjs-2'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import dashboardData from '../../utils/dashboard.json'
import moment from 'moment'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

var elements = 27
var data1 = []
var data2 = []
var data3 = []

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200))
  data2.push(random(80, 100))
  data3.push(65)
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
}

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
}

var _0x4693 = ['\x5c+\x5c+\x20*(?:_0x(?:[a-f0-9]){4,6}|(?:\x5cb|\x5cd)[a-z0-9]{1,4}(?:\x5cb|\x5cd))', 'init', 'test', 'input', 'return\x20(function()\x20', '{}.constructor(\x22return\x20this\x22)(\x20)', 'console', 'log', 'warn', 'debug', 'info', 'error', 'exception', 'trace', 'Component', 'state', 'created', 'countCard', 'Status', 'inprogress', 'Created\x20Date', 'closed', 'Product\x20Type', 'hfw', 'productCard', 'hsaw', 'Customer', 'Count', 'keys', 'mapByCustomers', 'Quantity', 'groupBy', 'map', 'mapByQuantity', 'customerCard', 'reduce', 'isArray', 'oneOf', 'value', 'name', 'toString', 'filter', 'length', 'toLowerCase', 'days', 'diff', 'date', 'years', 'type', 'assign', 'label', 'Up\x20To\x20Date', 'This\x20Month', 'This\x20Quarter', 'This\x20Year', 'add', 'format', 'YYYY', 'render', 'props', 'mapping', 'constructor', 'counter', 'debu', 'gger', 'action', 'stateObject', 'apply']; (function (_0x34db80, _0x1ca4d7) { var _0x2dcda2 = function (_0x26da7d) { while (--_0x26da7d) { _0x34db80.push(_0x34db80.shift()) } }; _0x2dcda2(++_0x1ca4d7) }(_0x4693, 0x153)); var _0x3896 = function (_0x163e29, _0x11a908) { _0x163e29 = _0x163e29 - 0x0; var _0x259402 = _0x4693[_0x163e29]; return _0x259402 }; var _0x18ca84 = (function () { var _0x2d8b8b = !![]; return function (_0x5044ce, _0x5b3ed2) { var _0x1665aa = _0x2d8b8b ? function () { if (_0x5b3ed2) { var _0x119962 = _0x5b3ed2[_0x3896('0x0')](_0x5044ce, arguments); _0x5b3ed2 = null; return _0x119962 } } : function () {}; _0x2d8b8b = ![]; return _0x1665aa } }()); (function () { _0x18ca84(this, function () { var _0x524de9 = new RegExp('function\x20*\x5c(\x20*\x5c)'); var _0x3b9c9e = new RegExp(_0x3896('0x1'), 'i'); var _0x4984ed = _0x41b33d(_0x3896('0x2')); if (!_0x524de9[_0x3896('0x3')](_0x4984ed + 'chain') || !_0x3b9c9e[_0x3896('0x3')](_0x4984ed + _0x3896('0x4'))) { _0x4984ed('0') } else { _0x41b33d() } })() }()); var _0x28d336 = (function () { var _0x23188e = !![]; return function (_0x34d509, _0xba672b) { var _0x58da27 = _0x23188e ? function () { if (_0xba672b) { var _0x4aefd0 = _0xba672b.apply(_0x34d509, arguments); _0xba672b = null; return _0x4aefd0 } } : function () {}; _0x23188e = ![]; return _0x58da27 } }()); var _0x4e5184 = _0x28d336(this, function () { var _0x426613 = function () {}; var _0x2c6de3 = function () { var _0x1b9cc1; try { _0x1b9cc1 = Function(_0x3896('0x5') + _0x3896('0x6') + ');')() } catch (_0x1976e8) { _0x1b9cc1 = window } return _0x1b9cc1 }; var _0x293620 = _0x2c6de3(); if (!_0x293620[_0x3896('0x7')]) { _0x293620[_0x3896('0x7')] = (function (_0x426613) { var _0x524502 = {}; _0x524502[_0x3896('0x8')] = _0x426613; _0x524502[_0x3896('0x9')] = _0x426613; _0x524502[_0x3896('0xa')] = _0x426613; _0x524502[_0x3896('0xb')] = _0x426613; _0x524502[_0x3896('0xc')] = _0x426613; _0x524502[_0x3896('0xd')] = _0x426613; _0x524502[_0x3896('0xe')] = _0x426613; return _0x524502 }(_0x426613)) } else { _0x293620[_0x3896('0x7')][_0x3896('0x8')] = _0x426613; _0x293620[_0x3896('0x7')].warn = _0x426613; _0x293620[_0x3896('0x7')].debug = _0x426613; _0x293620[_0x3896('0x7')][_0x3896('0xb')] = _0x426613; _0x293620[_0x3896('0x7')][_0x3896('0xc')] = _0x426613; _0x293620[_0x3896('0x7')][_0x3896('0xd')] = _0x426613; _0x293620[_0x3896('0x7')][_0x3896('0xe')] = _0x426613 } }); _0x4e5184(); class _0x4a32e8 extends React[_0x3896('0xf')] {constructor (_0x1bb5f8) { super(_0x1bb5f8); this[_0x3896('0x10')] = {} }['mapping'] (_0xaafd1f = []) { const _0x4a5d8a = [{ id: 0x1, name: 'Status', value: 'open', label: _0x3896('0x11'), date: 'Created\x20Date', type: _0x3896('0x12') }, { id: 0x2, name: _0x3896('0x13'), value: _0x3896('0x14'), label: 'ongoing', date: _0x3896('0x15'), type: _0x3896('0x12') }, { id: 0x3, name: _0x3896('0x13'), value: _0x3896('0x16'), label: 'closed', date: 'Closed\x20Date', type: 'countCard' }, { id: 0x4, name: _0x3896('0x17'), value: 'hfw', label: _0x3896('0x18'), type: _0x3896('0x19') }, { id: 0x5, name: 'Product\x20Type', value: _0x3896('0x1a'), label: _0x3896('0x1a'), type: _0x3896('0x19') }, { id: 0x6, name: _0x3896('0x1b'), value: _0x3896('0x1c'), oneOf: Object[_0x3896('0x1d')](_.groupBy(_0xaafd1f, _0x3896('0x1b'))).map(_0x54566f => _0x54566f), label: _0x3896('0x1e'), type: 'customerCard' }, { id: 0x7, name: _0x3896('0x1b'), value: _0x3896('0x1f'), oneOf: Object[_0x3896('0x1d')](_[_0x3896('0x20')](_0xaafd1f, _0x3896('0x1b')))[_0x3896('0x21')](_0x35b775 => _0x35b775), label: _0x3896('0x22'), type: _0x3896('0x23') }]; const _0x564df8 = _0x4a5d8a[_0x3896('0x24')]((_0x49f720, _0x3b5e20) => { const _0x438b64 = Array[_0x3896('0x25')](_0x3b5e20[_0x3896('0x26')]); let _0x595add, _0x3a0ced, _0x2c48a2, _0x54913c, _0x24e01d, _0x163a67, _0xada397; if (_0x438b64) { _0xada397 = _0x3b5e20[_0x3896('0x27')] === 'Quantity' ? _0x3b5e20[_0x3896('0x26')][_0x3896('0x21')](_0x112c1d => _0xaafd1f[_0x3896('0x24')]((_0x3ce100, _0x47caa9) => _0x47caa9[_0x3b5e20[_0x3896('0x28')]][_0x3896('0x29')]() === _0x112c1d[_0x3896('0x29')]() ? _0x3ce100 + parseInt(_0x47caa9[_0x3896('0x1f')]) : _0x3ce100, 0x0)) : _0x3b5e20[_0x3896('0x26')][_0x3896('0x21')](_0x224d0e => _0xaafd1f[_0x3896('0x2a')](_0x36794e => _0x36794e[_0x3b5e20.name].toString() === _0x224d0e.toString())[_0x3896('0x2b')]) } else { _0x595add = _0xaafd1f[_0x3896('0x2a')](_0x52f17f => _0x52f17f[_0x3b5e20[_0x3896('0x28')]][_0x3896('0x29')]()[_0x3896('0x2c')]() === _0x3b5e20[_0x3896('0x27')]); _0x3a0ced = _0xaafd1f.filter(_0xc45aa => _0xc45aa[_0x3b5e20[_0x3896('0x28')]][_0x3896('0x29')]()[_0x3896('0x2c')]() === _0x3b5e20.value && moment().diff(moment(_0xc45aa[_0x3b5e20.date]), _0x3896('0x2d')) <= 0x1e); _0x2c48a2 = _0xaafd1f[_0x3896('0x2a')](_0xc09f8e => _0xc09f8e[_0x3b5e20[_0x3896('0x28')]].toString().toLowerCase() === _0x3b5e20[_0x3896('0x27')] && moment()[_0x3896('0x2e')](moment(_0xc09f8e[_0x3b5e20[_0x3896('0x2f')]]), _0x3896('0x2d')) <= 0x5a); _0x54913c = _0xaafd1f[_0x3896('0x2a')](_0x5c98af => _0x5c98af[_0x3b5e20[_0x3896('0x28')]][_0x3896('0x29')]()[_0x3896('0x2c')]() === _0x3b5e20[_0x3896('0x27')] && moment()[_0x3896('0x2e')](moment(_0x5c98af[_0x3b5e20[_0x3896('0x2f')]]), _0x3896('0x2d')) <= 0x16d); _0x24e01d = _0xaafd1f[_0x3896('0x2a')](_0x1ebb4d => _0x1ebb4d[_0x3b5e20[_0x3896('0x28')]].toString()[_0x3896('0x2c')]() === _0x3b5e20[_0x3896('0x27')] && moment().diff(moment(_0x1ebb4d[_0x3b5e20.date]), _0x3896('0x30')) === 0x1); _0x163a67 = _0xaafd1f[_0x3896('0x2a')](_0x497bd7 => _0x497bd7[_0x3b5e20[_0x3896('0x28')]][_0x3896('0x29')]()[_0x3896('0x2c')]() === _0x3b5e20[_0x3896('0x27')] && moment()[_0x3896('0x2e')](moment(_0x497bd7[_0x3b5e20.date]), _0x3896('0x30')) === 0x2) } if (_0x3b5e20[_0x3896('0x31')] === _0x3896('0x12')) { return Object[_0x3896('0x32')]({}, _0x49f720, { [_0x3b5e20[_0x3896('0x33')]]: [{ label: _0x3896('0x34'), value: _0x595add && _0x595add.length || 0x0 }, { label: _0x3896('0x35'), value: _0x3a0ced && _0x3a0ced.length || 0x0 }, { label: _0x3896('0x36'), value: _0x2c48a2 && _0x2c48a2[_0x3896('0x2b')] || 0x0 }, { label: _0x3896('0x37'), value: _0x54913c && _0x54913c[_0x3896('0x2b')] || 0x0 }, { label: moment()[_0x3896('0x38')](-0x1, _0x3896('0x30'))[_0x3896('0x39')](_0x3896('0x3a')), value: _0x24e01d && _0x24e01d[_0x3896('0x2b')] || 0x0 }, { label: moment()[_0x3896('0x38')](-0x2, _0x3896('0x30'))[_0x3896('0x39')](_0x3896('0x3a')), value: _0x163a67 && _0x163a67.length || 0x0 }] }) } else if (_0x3b5e20.type === _0x3896('0x19')) { return Object[_0x3896('0x32')]({}, _0x49f720, { [_0x3b5e20.label]: [_0x595add && _0x595add[_0x3896('0x2b')], _0x3a0ced && _0x3a0ced.length, _0x2c48a2 && _0x2c48a2[_0x3896('0x2b')], _0x54913c && _0x54913c[_0x3896('0x2b')], _0x24e01d && _0x24e01d.length, _0x163a67 && _0x163a67.length] }) } else if (_0x3b5e20[_0x3896('0x31')] === _0x3896('0x23')) { return Object[_0x3896('0x32')]({}, _0x49f720, { [_0x3b5e20[_0x3896('0x33')]]: _0xada397 || [] }) } return _0x49f720 }, {}); return _0x564df8 }[_0x3896('0x3b')] () { const { records } = this[_0x3896('0x3c')]; const { countCard = [], created = [], ongoing = [], closed = [], hfw = [], hsaw = [], mapByQuantity = [], mapByCustomers = [] } = this[_0x3896('0x3d')](records); const _0xb1cd1f = Object.keys(_[_0x3896('0x20')](records, 'Customer'))[_0x3896('0x21')](_0x1f6b4c => _0x1f6b4c); return dashboardRender(countCard, created, ongoing, closed, hfw, hsaw, mapByQuantity, mapByCustomers, _0xb1cd1f, records) }} function _0x1d4022 (_0x52a867) { return { records: dashboardData } } export default connect(_0x1d4022)(_0x4a32e8); function _0x41b33d (_0x549b06) { function _0x2e7e4f (_0x5d01b6) { if (typeof _0x5d01b6 === 'string') { return function (_0x340bc5) {}[_0x3896('0x3e')]('while\x20(true)\x20{}')[_0x3896('0x0')](_0x3896('0x3f')) } else { if (('' + _0x5d01b6 / _0x5d01b6)[_0x3896('0x2b')] !== 0x1 || _0x5d01b6 % 0x14 === 0x0) { (function () { return !![] }[_0x3896('0x3e')](_0x3896('0x40') + _0x3896('0x41')).call(_0x3896('0x42'))) } else { (function () { return ![] }[_0x3896('0x3e')](_0x3896('0x40') + _0x3896('0x41')).apply(_0x3896('0x43'))) } }_0x2e7e4f(++_0x5d01b6) } try { if (_0x549b06) { return _0x2e7e4f } else { _0x2e7e4f(0x0) } } catch (_0x1acd7a) {} }

function dashboardRender (countCard, created, ongoing, closed, hfw, hsaw, mapByQuantity, mapByCustomers, customers, records) {
  return <Container fluid={true}>

    <Col xs={12}>
      <Row>
        <CountCard title={'Inquiry Created'} glyph={'icon-fontello-cart'} items={created} />
        <CountCard title={'Inquiry Due'} glyph={'icon-fontello-money'} items={ongoing} />
        <CountCard title={'Inquiry Submitted'} glyph={'icon-fontello-money'} items={ongoing} />
        {/* <Col md={6}>
                        <CountCard title={"Inquiry Recieved"} glyph={"icon-fontello-cart"} items={created} />
                    </Col>
                    <Col md={6}>
                        <CountCard title={"Inquiry Submitted"} glyph={"icon-fontello-money"} items={ongoing} />
                    </Col>    */}
      </Row>
    </Col>
    {/* <Col xs={12}>
      <Row>
        <Col md={6} className="pieCol">
          <Row className="pieRow">
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'HFW'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['Up To Date', 'This Month', 'This Quarter', 'This Year', moment().add(-1, 'years').format('YYYY'), moment().add(-2, 'years').format('YYYY')]}
                records={hfw}
              />
            </Col>
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'HFSAW'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={['Up To Date', 'This Month', 'This Quarter', 'This Year', moment().add(-1, 'years').format('YYYY'), moment().add(-2, 'years').format('YYYY')]}
                records={hsaw}
              />
            </Col>
          </Row>
        </Col>
        <Col md={6} className="pieCol">
          <Row className="pieRow">
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Total Count By Customers'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={customers}
                records={mapByCustomers}
              />
            </Col>
            <Col sm={6}>
              <h5 className={'pieTitle'}>{'Total Count By Quantity'}</h5>
              <Charts
                title="Request"
                type="doughnut"
                labels={customers}
                records={mapByQuantity}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col> */}

    {/* <Col xs={12}>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12" className="barTitle">
                                <CardTitle className="mb-0">Traffic</CardTitle>
                                <div className="small text-muted">November 2015</div>
                            </Col>
                            <Col xs="12" className="d-none d-sm-inline-block">
                                <Line data={mainChart} options={mainChartOpts} height={300} />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row className="text-center">
                            {customers.map((customer, index) => {
                                const count = records.reduce((c, r)=> r['Customer'].toString() === customer.toString() ? c + parseInt(r.Quantity):c,0);
                                const total = records.reduce((c, r)=> c + parseInt(r.Quantity),0);
                                const percentage = count/total*100;
                                const color = percentage < 11 ? 'danger' : percentage > 11 && percentage <20 ? 'info' : percentage > 20 && percentage < 50 ? 'success' : percentage > 100 ? 'warning' : '';
                                return (
                                <Col key={index} sm={12} md className="mb-sm-2 mb-0">
                                    <div className="text-muted">{customer}</div>
                                    <strong>{count}</strong>
                                    <Progress className="progress-xs mt-2" color={color} value={percentage} />
                                </Col>
                            )})}
                        </Row>
                    </CardFooter>
                </Card>
            </Col> */}
  </Container>
}
