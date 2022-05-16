import './App.css';
import CGU_Login from './Components/CGU_Login';
import User_Name from './Components/User_Name';
import Password from './Components/Password';
import Button from './Components/Button';

function App() {
    return (
        <div className="App">
            <CGU_Login/>
            <User_Name/>
            <Password/>
            <Button/>
        </div>
    );
}

export default App;
