//App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import About from "./routes/About";
import GetInvolved from "./routes/GetInvolved";
import OnlineClasses from "./routes/OnlineClasses";
import SelfPacedClasses from "./routes/SelfPacedClasses";
import News from "./routes/News";
import Astronomy from "./routes/Astronomy";
import BasicsOfCoding from "./routes/BasicsOfCoding";
import Biochemistry from "./routes/Biochemistry";
import Chemistry from "./routes/Chemistry";
import Circuits from "./routes/Circuits";
import EnvironmentalScience from "./routes/EnvironmentalScience";
import Psychology from "./routes/Psychology";
import Statistics from "./routes/Statistics";
import Zoology from "./routes/Zoology";
import March from "./routes/March";
import Astrovid1s from "./routes/Astrovid1s";
import Astrovid1p from "./routes/Astrovid1p";
import Astrovid2p from "./routes/Astrovid2p";
import Astrovid2s from "./routes/Astrovid2s";
import Astrovid3p from "./routes/Astrovid3p";
import Astrovid3s from "./routes/Astrovid3s";
import Astrovid4p from "./routes/Astrovid4p";
import Astrovid4s from "./routes/Astrovid4s";
import Astroquiz from "./routes/Astroquiz";
import AstroWorksheet1 from "./routes/AstroWorksheet1";
import AstroWorksheet2 from "./routes/AstroWorksheet2";
import Bc1p from "./routes/bc1p";
import Bc1s from "./routes/bc1s";
import Bc2p from "./routes/bc2p";
import Bc2s from "./routes/bc2s";
import Bc3p from "./routes/bc3p";
import Bc3s from "./routes/bc3s";
import Bc4p from "./routes/bc4p";
import Bc4s from "./routes/bc4s";
import BCquiz from "./routes/BCquiz";
import Bio1 from "./routes/bio1";
import Bio2 from "./routes/bio2";
import Bioquiz from "./routes/Bioquiz";
import Chem1 from "./routes/chem1";
import Chem2 from "./routes/chem2";
import Chem3 from "./routes/chem3";
import Chem4 from "./routes/chem4";
import Chemquiz from "./routes/Chemquiz";
import BiochemWorkSheet from "./routes/BiochemWorkSheet";
import Circuit1s from "./routes/circuit1s";
import Circuit2s from "./routes/circuit2s";
import Circuit3s from "./routes/circuit3s";
import Circuit1p from "./routes/circuit1p";
import Circuit2p from "./routes/circuit2p";
import Circuit3p from "./routes/circuit3p";
import Circuitquiz from "./routes/Circuitquiz";
import Circuitworksheet from "./routes/CircuitWorkSheet";
import Es1s from "./routes/es1s";
import Es2s from "./routes/es2s";
import Es3s from "./routes/es3s";
import Es4s from "./routes/es4s";
import ESquiz from "./routes/ESquiz";
import Esworksheet1 from "./routes/esWorkSheet1";
import Psych1p from "./routes/psych1p";
import Psych1s from "./routes/psych1s";
import Psych2p from "./routes/psych2p";
import Psych2s from "./routes/psych2s";
import Psych3p from "./routes/psych3p";
import Psych3s from "./routes/psych3s";
import Psych4p from "./routes/psych4p";
import Psych4s from "./routes/psych4s";
import Psycquiz from "./routes/Psycquiz";
import Psychworksheet1 from "./routes/PsychWorkSheet1";
import Psychworksheet2 from "./routes/PsychWorkSheet2";
import Stat1p from "./routes/stat1p";
import Stat1s from "./routes/stat1s";
import Stat2p from "./routes/stat2p";
import Stat2s from "./routes/stat2s";
import Stat3p from "./routes/stat3p";
import Stat3s from "./routes/stat3s";
import Stat4p from "./routes/stat4p";
import Stat4s from "./routes/stat4s";
import Stat5p from "./routes/stat5p";
import Stat5s from "./routes/stat5s";
import Statquiz from "./routes/Statquiz";
import StatWorkSheet1 from "./routes/statWorkSheet1";
import StatWorkSheet2 from "./routes/statWorkSheet2";
import StatWorkSheet3 from "./routes/statWorkSheet3";
import Zoo1p from "./routes/zoo1p";
import Zoo1s from "./routes/zoo1s";
import Zoo2p from "./routes/zoo2p";
import Zoo2s from "./routes/zoo2s";
import Zoo3p from "./routes/zoo3p";
import Zoo3s from "./routes/zoo3s";
import Zoo4p from "./routes/zoo4p";
import Zoo4s from "./routes/zoo4s";
import Zoo5p from "./routes/zoo5p";
import Zoo5s from "./routes/zoo5s";
import Zooquiz from "./routes/Zooquiz";
import Zooworksheet1 from "./routes/zooWorkSheet1";
import Zooworksheet2 from "./routes/zooWorkSheet2";
import Zooworksheet3 from "./routes/zooWorkSheet3";
import September from "./routes/sept";
import LoginForm from "./routes/LoginForm";
import SignUpForm from "./routes/SignUpForm";
import Dashboard from "./routes/dashboard";
import CourseBoxes from "./routes/CourseBoxes";
import Volunteer from "./routes/volunteer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/get-involved" element={<GetInvolved />} />
      {/* <Route path='/get-involved/volunteers' element={<Volunteers />} /> */}
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/online-classes" element={<OnlineClasses />} />
      <Route path="/self-paced-classes" element={<SelfPacedClasses />} />
      <Route path="/course-boxes" element={<CourseBoxes />} />
      <Route path="/news" element={<News />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="sign-up" element={<SignUpForm />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="self-paced-classes/astronomy" element={<Astronomy />} /> */}
      <Route path="/astronomy" element={<Astronomy />} />
      <Route path="/basics-of-coding" element={<BasicsOfCoding />}/>
      <Route
        path="/biochemistry"
        element={<Biochemistry />}
      />
      <Route path="/chemistry" element={<Chemistry />} />
      <Route path="/circuits" element={<Circuits />} />
      <Route
        path="/environmental-science"
        element={<EnvironmentalScience />}
      />
      <Route path="/psychology" element={<Psychology />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/zoology" element={<Zoology />} />
      <Route path="news/march" element={<March />} />
      <Route path="news/september" element={<September />} />
      <Route
        path="/astrovid1s"
        element={<Astrovid1s />}
      />
      <Route
        path="/astrovid1p"
        element={<Astrovid1p />}
      />
      <Route
        path="/astrovid2p"
        element={<Astrovid2p />}
      />
      <Route
        path="/astrovid2s"
        element={<Astrovid2s />}
      />
      <Route
        path="/astrovid3p"
        element={<Astrovid3p />}
      />
      <Route
        path="/astrovid3s"
        element={<Astrovid3s />}
      />
      <Route
        path="/astrovid4p"
        element={<Astrovid4p />}
      />
      <Route
        path="/astrovid4s"
        element={<Astrovid4s />}
      />
      <Route
        path="/astroWorksheet1"
        element={<AstroWorksheet1 />}
      />
      <Route
        path="/astroWorksheet2"
        element={<AstroWorksheet2 />}
      />
      <Route
        path="/astroquiz"
        element={<Astroquiz />}
      />
      <Route
        path="/bc1p"
        element={<Bc1p />}
      />
      <Route
        path="/bc1s"
        element={<Bc1s />}
      />
      <Route
        path="/bc2p"
        element={<Bc2p />}
      />
      <Route
        path="/bc2s"
        element={<Bc2s />}
      />
      <Route
        path="/bc3p"
        element={<Bc3p />}
      />
      <Route
        path="/bc3s"
        element={<Bc3s />}
      />
      <Route
        path="/bc4p"
        element={<Bc4p />}
      />
      <Route
        path="/bc4s"
        element={<Bc4s />}
      />
      <Route
        path="/bc4p"
        element={<Bc4p />}
      />
      <Route
        path="/bc4s"
        element={<Bc4s />}
      />
      <Route
        path="/bcquiz"
        element={<BCquiz />}
      />
      <Route path="/bio1" element={<Bio1 />} />
      <Route path="/bio2" element={<Bio2 />} />
      <Route
        path="/bioquiz"
        element={<Bioquiz />}
      />
      <Route
        path="/biochemworksheet"
        element={<BiochemWorkSheet />}
      />
      <Route path="/chem1" element={<Chem1 />} />
      <Route path="/chem2" element={<Chem2 />} />
      <Route path="/chem3" element={<Chem3 />} />
      <Route path="/chem4" element={<Chem4 />} />
      <Route
        path="/chemquiz"
        element={<Chemquiz />}
      />
      <Route
        path="/circuit1s"
        element={<Circuit1s />}
      />
      <Route
        path="/circuit2s"
        element={<Circuit2s />}
      />
      <Route
        path="/circuit3s"
        element={<Circuit3s />}
      />
      <Route
        path="/circuit1p"
        element={<Circuit1p />}
      />
      <Route
        path="/circuit2p"
        element={<Circuit2p />}
      />
      <Route
        path="/circuit3p"
        element={<Circuit3p />}
      />
      <Route
        path="/circuitquiz"
        element={<Circuitquiz />}
      />
      <Route
        path="/circuitworksheet"
        element={<Circuitworksheet />}
      />
      <Route
        path="/es1s"
        element={<Es1s />}
      />
      <Route
        path="/es2s"
        element={<Es2s />}
      />
      <Route
        path="/es3s"
        element={<Es3s />}
      />
      <Route
        path="/es4s"
        element={<Es4s />}
      />
      <Route
        path="/esquiz"
        element={<ESquiz />}
      />
      <Route
        path="/esworksheet1"
        element={<Esworksheet1 />}
      />
      <Route
        path="self-paced-classes/psychology/psych1p"
        element={<Psych1p />}
      />
      <Route
        path="self-paced-classes/psychology/psych1s"
        element={<Psych1s />}
      />
      <Route
        path="self-paced-classes/psychology/psych2p"
        element={<Psych2p />}
      />
      <Route
        path="self-paced-classes/psychology/psych2s"
        element={<Psych2s />}
      />
      <Route
        path="self-paced-classes/psychology/psych3p"
        element={<Psych3p />}
      />
      <Route
        path="self-paced-classes/psychology/psych3s"
        element={<Psych3s />}
      />
      <Route
        path="self-paced-classes/psychology/psych4p"
        element={<Psych4p />}
      />
      <Route
        path="self-paced-classes/psychology/psych4s"
        element={<Psych4s />}
      />
      <Route
        path="self-paced-classes/psychology/psychquiz"
        element={<Psycquiz />}
      />
      <Route
        path="self-paced-classes/psychology/psychworksheet1"
        element={<Psychworksheet1 />}
      />
      <Route
        path="self-paced-classes/psychology/psychworksheet2"
        element={<Psychworksheet2 />}
      />
      <Route path="self-paced-classes/statistics/stat1p" element={<Stat1p />} />
      <Route path="self-paced-classes/statistics/stat1s" element={<Stat1s />} />
      <Route path="self-paced-classes/statistics/stat2p" element={<Stat2p />} />
      <Route path="self-paced-classes/statistics/stat2s" element={<Stat2s />} />
      <Route path="self-paced-classes/statistics/stat3p" element={<Stat3p />} />
      <Route path="self-paced-classes/statistics/stat3s" element={<Stat3s />} />
      <Route path="self-paced-classes/statistics/stat4p" element={<Stat4p />} />
      <Route path="self-paced-classes/statistics/stat4s" element={<Stat4s />} />
      <Route path="self-paced-classes/statistics/stat5p" element={<Stat5p />} />
      <Route path="self-paced-classes/statistics/stat5s" element={<Stat5s />} />
      <Route
        path="self-paced-classes/statistics/statquiz"
        element={<Statquiz />}
      />
      <Route
        path="self-paced-classes/statistics/statworksheet1"
        element={<StatWorkSheet1 />}
      />
      <Route
        path="self-paced-classes/statistics/statworksheet2"
        element={<StatWorkSheet2 />}
      />
      <Route
        path="self-paced-classes/statistics/statworksheet3"
        element={<StatWorkSheet3 />}
      />
      <Route path="self-paced-classes/zoology/zoo1p" element={<Zoo1p />} />
      <Route path="self-paced-classes/zoology/zoo1s" element={<Zoo1s />} />
      <Route path="self-paced-classes/zoology/zoo2p" element={<Zoo2p />} />
      <Route path="self-paced-classes/zoology/zoo2s" element={<Zoo2s />} />
      <Route path="self-paced-classes/zoology/zoo3p" element={<Zoo3p />} />
      <Route path="self-paced-classes/zoology/zoo3s" element={<Zoo3s />} />
      <Route path="self-paced-classes/zoology/zoo4p" element={<Zoo4p />} />
      <Route path="self-paced-classes/zoology/zoo4s" element={<Zoo4s />} />
      <Route path="self-paced-classes/zoology/zoo5p" element={<Zoo5p />} />
      <Route path="self-paced-classes/zoology/zoo5s" element={<Zoo5s />} />
      <Route path="self-paced-classes/zoology/zooquiz" element={<Zooquiz />} />
      <Route
        path="self-paced-classes/zoology/zooworksheet1"
        element={<Zooworksheet1 />}
      />
      <Route
        path="self-paced-classes/zoology/zooworksheet2"
        element={<Zooworksheet2 />}
      />
      <Route
        path="self-paced-classes/zoology/zooworksheet3"
        element={<Zooworksheet3 />}
      />
    </Routes>
  );
}

export default App;
