import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

const HolidayCard = props => {
  const {holidayData} = props
  const {counties, countryCode, date, launchYear, localName, name, type} = holidayData

  return (
    <li className="holiday-item col-12 shadow m-3 p-3">
      <div>
      <h1 className="local-name">{localName}</h1>
      <p className="name"> {name}</p>
      <p> CountryCode:{countryCode}</p>
      <p> {counties}</p>
      <p> {launchYear}</p>
      <p>Type:{type}</p>
      </div>
      <div>
      <p className="date"> {date}</p>
      </div>
      
      
      
      
 </li>
  )
}
export default HolidayCard