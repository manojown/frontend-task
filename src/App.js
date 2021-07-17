import { Header, ErrorBoundries } from "./components/_shared";
import Dashboard from './components/Dashboard'
import './styles/App.css';

function App() {
  return (
    <div className='App' data-test='App'>
    <ErrorBoundries>
      <Header className='navbar' />
      <Dashboard/>
      {/* <MainComponent /> */}
    </ErrorBoundries>
  </div>
  );
}

export default App;
