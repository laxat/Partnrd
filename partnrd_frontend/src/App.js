import { BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import Theme from './resources/theme'; 
import Pages from './pages'; 

function App() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <BrowserRouter basename={"/app"}>
          <Pages/>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
