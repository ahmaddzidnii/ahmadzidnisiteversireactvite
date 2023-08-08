import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'

// PAGES
import Homepage from './Pages/Homepage'
import GalleryProject from './Pages/GalleryProject'
import NavbarComponent from "./Components/NavbarComponent"
import Alquran from './Pages/Alquran'
import PreviewAlquran from './Pages/PreviewAlquran'
import Tafsir from './Pages/Tafsir'
import JadwalSholat from './Pages/JadwalSholat'
import PreviewJadwalSholat from './Pages/PreviewJadwalSholat'
import Notfound from './Pages/404Notfound'





function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path='*' element={<Notfound />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/gallery-project' element={<GalleryProject />} />
          <Route path='/Alquran/ayat' element={<Alquran />} />
          <Route path='/Alquran/tafsir/:id' element={<Tafsir />} />
          <Route path='/Alquran/ayat/:id' element={<PreviewAlquran />} />
          <Route path='/Jadwalsholat/listkota' element={<JadwalSholat />} />
          <Route path='/Jadwalsholat/listkota/:idkota' element={<PreviewJadwalSholat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
