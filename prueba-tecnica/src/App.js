import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const API_URL = './data.json'
  const [users, setUsers] = useState()
  const [totalAmount, setTotalAmount] = useState()
  const [countries, setCountries] = useState()
  const [sortType, setSortType] = useState('desc')

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const users = json.users?.sort((a, b) => b.amount - a.amount);
        setUsers(users);
        const amounts = users.map((e) => e.amount);
        const getTotalAmount = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        setTotalAmount(getTotalAmount)
        const countries = json.countries;
        setCountries(countries);
      })
  }, [])

  useEffect(() => {
    if(sortType === 'asc'){
      const asc = users?.sort((a, b) => a.amount - b.amount);
      setUsers(asc);
    }

    if(sortType === 'desc'){
      const desc = users?.sort((a, b) => b.amount - a.amount);
      setUsers(desc);
    }
  }, [sortType, users])


  function numberToCurrency(number) {
    if (number) {
      return number.toLocaleString("en", {
        style: "currency",
        currency: "USD"
      });
    }
  }

  const handleOnclick = () => {
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
  }

  const usersInfo = () => {

    return (
      <tbody>
        {users ? users.map((e, i) =>
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{e.firstName} {e.lastName}</td>
            <td>{countries[e.countryCode]}</td>
            <td>{numberToCurrency(e.amount)}</td>
          </tr>
        ) : "No hay datos"}
      </tbody>
    )
  }


  return (
    <div className='container'>

      <p>Concurso Darwinex</p>
      <h2>Hall of Fame</h2>
      <hr />
      <div className='users'>
        <div>
          <h5>Usuarios Totales</h5>
          {users?.length}
        </div>
        <div>
          <h5 onClick={handleOnclick}>Asignación Total</h5>
          {numberToCurrency(totalAmount)}
        </div>
      </div>

      <p>Usuarios en la clasificación</p>

      <table className='table-container'>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Usuario</th>
            <th>País</th>
            <th onClick={() => handleOnclick()}>Asignación</th>
          </tr>
        </thead>
        {usersInfo()}

      </table>

    </div>
  );
}

export default App;
