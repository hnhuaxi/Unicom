import './App.css';
import 'react-vant/es/styles';
import routers from './router';
import { useRoutes } from 'react-router-dom';

function App() {
  // const element = useRoutes(routers)

  return (
    <div className="App">
      {useRoutes(routers)}
    </div>
  );
}

export default App;
