import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Contact from './routes/Contact';
import Home from './routes/Home';
import About from './routes/About';
import GetInvolved from './routes/GetInvolved';
import OnlineClasses from './routes/OnlineClasses';
import SelfPacedClasses from './routes/SelfPacedClasses';
import News from './routes/News'
import Astronomy from './routes/Astronomy'
import BasicsOfCoding from './routes/BasicsOfCoding'
import Biochemistry from './routes/Biochemistry'
import Chemistry from './routes/Chemistry'
import Circuits from './routes/Circuits'
import EnvironmentalScience from './routes/EnvironmentalScience'
import Psychology from './routes/Psychology'
import Statistics from './routes/Statistics'
import Zoology from './routes/Zoology'
import March from './routes/March'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/get-involved' element={<GetInvolved />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/online-classes' element={<OnlineClasses />} />
        <Route path='/self-paced-classes' element={<SelfPacedClasses />} />
        <Route path='/news' element={<News />} />
        <Route path='self-paced-classes/astronomy' element={<Astronomy />} />
        <Route path='self-paced-classes/basics-of-coding' element={<BasicsOfCoding />} />
        <Route path='self-paced-classes/biochemistry' element={<Biochemistry />} />
        <Route path='self-paced-classes/chemistry' element={<Chemistry />} />
        <Route path='self-paced-classes/circuits' element={<Circuits />} />
        <Route path='self-paced-classes/environmental-science' element={<EnvironmentalScience />} />
        <Route path='self-paced-classes/psychology' element={<Psychology />} />
        <Route path='self-paced-classes/statistics' element={<Statistics />} />
        <Route path='self-paced-classes/zoology' element={<Zoology />} />
        <Route path='news/march' element={<March />} />
      </Routes>
    </>
  );
}

export default App;
