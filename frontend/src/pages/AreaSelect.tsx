
import Map from '../components/Map';
import { Link } from 'react-router-dom';

function Create() {

  return (
    <div>
      <header>
        <h1 style={{marginBottom: '30px' }}>Select Restricted Area</h1>
      </header>
      <main>
        <Map />
        <Link to={'Prove'} style={{border: '1px', padding: '10px', borderRadius: '5px'}}>Continue</Link>
      </main>
    </div>
  );
}

export default Create;
