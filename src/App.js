import { Component } from 'react'
import HolidayCard from './components/HolidayCard'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'



class App extends Component {
  state = { holidaysData: [], holidaysOrgData: [], searchInput: '', global: false, fixed: false, selectInput: "" }

  componentDidMount() {
    this.getHolidaysData()
  }

  getHolidaysData = async () => {
    const apiUrl = 'https://date.nager.at/api/v2/publicholidays/2020/US'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({ holidaysData: fetchedData, holidaysOrgData: fetchedData })
    }
  }


  onChangeSearchInput = event => {
    const { holidaysOrgData } = this.state
    const lowerCased = event.target.value.toLowerCase();
    const searchResults = holidaysOrgData.filter(eachHoliday =>
      eachHoliday.localName.toLowerCase().includes(lowerCased))
    this.setState({
      holidaysData: searchResults,
      searchInput: event.target.value,
    })
  }


  handleCheckbox = (val, name) => {
    console.log(val, name)
    const { holidaysOrgData } = this.state
    if (val) {
      const globalFilteredResults = holidaysOrgData.filter(eachHoliday => eachHoliday[name] === val)
      console.log(globalFilteredResults)
      this.setState({
        holidaysData: globalFilteredResults, [name]: val
      })
    } else {
      this.setState({ [name]: val, holidaysData: holidaysOrgData });
    }
  }

  onChangeSelectInput = val => {
    const { holidaysOrgData } = this.state
    const selectResults = holidaysOrgData.filter(eachHoliday => (new Date(eachHoliday.date).getMonth() == val))
    this.setState({
      holidaysData: selectResults, selectInput: val
    })
  }




  renderHolidaysList = () => {
    const { holidaysData } = this.state


    return (
      <>
        {holidaysData.length > 0 ? (<ul className="holidays-list col-12">{holidaysData.map(holiday => (<HolidayCard holidayData={holiday} key={holiday.id} />))}</ul>)
          : (<><div className='no-holidays'><h1>--No Holidays--</h1></div></>)}
      </>
    )
  }





  render() {
    const { searchInput } = this.state
    return (
      <div className="holiday-list-container">
        <h1 className='heading m-3'>List of Holidays</h1>

        <div className='query-container d-flex flex-column flex-md-row'>




          <div className='select-container '>
            <label htmlFor="months" className='p-2'> Search by Month</label>

            <select id="months" defaultValue={'DEFAULT'} className="form-select" onChange={(e) => this.onChangeSelectInput(e.target.value)}>
              <option value="DEFAULT" disabled hidden>Select an Option</option>
              <option value="0">January</option>
              <option value="1">February </option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June </option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October </option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>

          <div className='search-container'>
            <input type="search" className='form-control p-2' placeholder='Search Holiday' onChange={this.onChangeSearchInput} value={searchInput} />
          </div>

          <div className='d-flex flex-row'>
            <div>
              <input type="checkbox" id="global" onChange={(e) => this.handleCheckbox(e.target.checked, "global")} />
              <label htmlFor="global" className='p-2'> Global</label>
            </div>
            <div>
              <input type="checkbox" id="fixed" onChange={(e) => this.handleCheckbox(e.target.checked, "fixed")} />
              <label htmlFor="fixed" className='p-2'> Fixed</label>
            </div>

          </div>





        </div>

        <div className='container'>
          <div className='row'>
            {this.renderHolidaysList()}

          </div>

        </div>


      </div>
    )
  }
}

export default App