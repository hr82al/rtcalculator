import './App.css'
import { ButtonsSection } from './components/buttons-section'
import { Display } from './components/display';
import { baseOperaions, digits, extendedOperations } from './data';
import { TaskProvider } from './taskProvider';


function App() {
  return (
    <TaskProvider>
      <div className='panel'>
        <Display />
        <div className='calc-buttons'>
          <div className='exetned-operaions'>
            <ButtonsSection
              type="exended-operations"
              buttons={extendedOperations}
            />
          </div>
          <hr />
          <div className='basic-buttons'>
            <ButtonsSection
              type='digit'
              buttons={digits} />
            <ButtonsSection
              type='basic-operations'
              buttons={baseOperaions} 
              />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App
