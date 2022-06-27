import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(
<App notes={notes} />
)