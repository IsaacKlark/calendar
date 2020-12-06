import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import Month from './components/Month/Month';
import Week from './components/Week/Week';
import Day from './components/Day/Day';

function App() {
  return (
    <HashRouter>
      <Header />
      <Aside />
      <Route path="/" exact>
        <Redirect to="/calendar/month" />
      </Route>
      <Route path="/calendar" exact>
        <Redirect to="/calendar/month" />
      </Route>
      <Route path="/calendar/month">
        <Calendar>
          <Month />
        </Calendar>
      </Route>
      <Route path="/calendar/week">
        <Calendar>
          <Week />
        </Calendar>
      </Route>
      <Route path="/calendar/day">
        <Calendar>
          <Day />
        </Calendar>
      </Route>
    </HashRouter>
  );
}

export default App;
