import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getAllReservation } from '../../Redux/Actions/Reservations'
import {
  Table,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import NavbarMain from '../../Components/NavbarMain'
import Styled from 'styled-components'
import Sidebar from '../../Components/Sidebar'
import Pagination from '../../Components/Paginations'
import { FaSearch, FaTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { MdPlaylistAdd } from 'react-icons/md'

const Bar = Styled('div')`
position: absolute;
top: 100px;
margin-left: 50px;
margin-top: 30px;
`
const BtnSearch = Styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 5px;
  background: #F96E16;
  margin-left: -70px;
`

class Reservations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busses: [],
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null,
      },
      currentPage: 1,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
      name: '',
      sortValue: 0,
    }
    this.searchBus = e => {
      this.setState({
        name: e.currentTarget.value,
      })
    }
    this.onSearch = name => {
      console.log(name, 'SEARCH NAMEEE')
      this.props.getAllReservation(`reservations/all?&limit=5&sort[name]=1&search[value]=${name}`)
    }
    this.onSort = coloumn => {
      const sortValue = this.state.sortValue === 0 ? this.state.sortValue + 1 : this.state.sortValue - 1
      this.setState({
        sortValue: sortValue,
      })
      this.props.getAllReservation(`reservations/all?sort[${coloumn}]=${sortValue}&limit=5`)
    }
    this.ktikaDiKlik = e => {}
    this.onPageChanged = data => {
      const { currentPage, totalPages, pageLimit } = data
      this.props.getAllReservation(`reservations/all?&limit=5&sort[name]=1&page=${currentPage}`)
      console.log(data, 'WHEEE')
    }
    this.deleteBusses = id => {
      this.props.history.push('/busses')
    }
  }

  componentDidMount() {
    console.log('MOUNTED')
  }
  render() {
    console.log('props', this.props)
    console.log('data', this.state.busses)
    return (
      <>
        <NavbarMain />
        <Row>
          <Col md={1}>
            <Sidebar />
          </Col>
        </Row>
        <Container>
          <Bar>
            <Row>
              <Col md={6}>
                <Form>
                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Search Bus ...'
                      onChange={e => this.setState({ name: e.currentTarget.value })}
                    />
                  </FormGroup>
                </Form>
              </Col>
              <Col md={3}>
                <BtnSearch className='blue' onClick={() => this.onSearch(this.state.name)}>
                  <FaSearch />
                </BtnSearch>
              </Col>
              <Col md={3}>
                <Link className='btn' to={`busses/create`} style={{ marginLeft: '100px', backgroundColor: '#42A845' }}>
                  <MdPlaylistAdd color='black' size='30px' title='CREATE BUS' position='center' />
                </Link>
              </Col>
            </Row>
            {this.props.reservation.reservations && this.props.reservation.reservations.length !== 0 ? (
              <Table bordered>
                <thead>
                  <tr>
                    <th>No</th>
                    <th onClick={() => this.onSort('id_reservation')}>ID Reservation</th>
                    <th onClick={() => this.onSort('departure_at')}>Route</th>
                    <th onClick={() => this.onSort('bus_name')}>Bus Name</th>
                    <th onClick={() => this.onSort('class')}>Bus Class</th>
                    <th onClick={() => this.onSort('date')}>Date </th>
                    <th onClick={() => this.onSort('time')}>Time</th>
                    <th onClick={() => this.onSort('name')}>Passenger Name</th>
                    <th onClick={() => this.onSort('name_agents')}>Travel Name</th>
                    <th>Seat Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.reservation.reservations.length &&
                    this.props.reservation.reservations.map((v, i) => {
                      const { page, perPage } = this.props.reservation.pageInfo
                      return (
                        <tr key={this.props.reservation.reservations[i].id}>
                          <td>{(page - 1) * parseInt(perPage) + (i + 1)}</td>
                          <td>{v.id_reservation}</td>
                          <td>
                            {v.departure_at} - {v.arrival_at}
                          </td>
                          <td>{v.bus_name}</td>
                          <td>{v.class}</td>
                          <td>{v.date}</td>
                          <td>{v.time}</td>
                          <td>{v.name}</td>
                          <td>{v.name_agents}</td>
                          <td>{v.sheets}</td>
                          <td class='text-center'>
                            <Link to={`busses/edit/${v.id}`}>
                              <FiEdit color='black' size='25px' title='EDIT' position='center' />
                            </Link>
                            <FaTrashAlt
                              color='black'
                              size='25px'
                              title='DELETE'
                              position='center'
                              onClick={() =>
                                this.setState({
                                  showModal: true,
                                  selectedId: v.id,
                                })
                              }
                            />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            ) : (
              <div>Data tidak tersedia</div>
            )}

            <Row>
              <Col md={12} className='text-right'>
                Page {this.props.reservation.pageInfo && this.props.reservation.pageInfo.page}/
                {this.props.reservation.pageInfo && this.props.reservation.pageInfo.totalPage} Total Data{' '}
                {this.props.reservation.pageInfo && this.props.reservation.pageInfo.totalData} Limit{' '}
                {this.props.reservation.pageInfo && this.props.reservation.pageInfo.perPage}
              </Col>
            </Row>
            <Row>
              <Col
                md={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Pagination
                  totalRecords={this.props.reservation.pageInfo && this.props.reservation.pageInfo.totalData}
                  pageLimit={this.props.reservation.pageInfo && this.props.reservation.pageInfo.perPage}
                  pageNeighbours={0}
                  onPageChanged={this.onPageChanged}
                />
              </Col>
            </Row>
          </Bar>
        </Container>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Delete Bus</ModalHeader>
          <ModalBody>Really want to delete?</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={() => this.deleteBusses(this.state.selectedId)}>
              OK
            </Button>
            <Button color='danger' onClick={() => this.setState({ showModal: false, selectedId: 0 })}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reservations,
  }
}

export default connect(mapStateToProps, {
  getAllReservation,
})(Reservations)
