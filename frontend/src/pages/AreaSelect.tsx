
import Map from '../components/Map';

function Create() {
  return (
    <div>
      <header>
        <h1 style={{marginBottom: '30px' }}>Interactive Map</h1>
      </header>
      <main>
        <Map />
        <button>Continue</button>
      </main>
    </div>
  );
}

export default Create;
