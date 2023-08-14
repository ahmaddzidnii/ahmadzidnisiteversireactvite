import { Accordion } from "react-bootstrap";

const HomepageAccordions = () => {
  return (
    <div>
                    <Accordion className="mb-5">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Siapa developer yang membangun situs ahmadzidni.site?</Accordion.Header>
                <Accordion.Body>
                  situs ini dibangun oleh ahmadzidni untuk belajar web development khususnya react js
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Dari mana sumber data situs ini?</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Kapan berdirinya situs ahmadzidni.site?</Accordion.Header>
                <Accordion.Body>
                ahmadzidni.site didirikan pada tahun 2023 sebagai platform untuk berbagi pengetahuan dan informasi yang bermanfaat. Sejak itu, situs ini terus berkembang dan menjadi tempat yang menarik bagi para pembaca.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Bagaimana perjalanan pengembangan situs ahmadzidni.site?</Accordion.Header>
                <Accordion.Body>
                Situs ini awalnya dimulai sebagai proyek kecil dengan tujuan untuk membagikan pengetahuan kepada orang-orang. Seiring waktu, tim pengembang kami terus bekerja keras untuk meningkatkan pengalaman pengguna, menambahkan konten baru, dan memperluas cakupan topik yang disajikan.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Apa tujuan dari situs ahmadzidni.site?</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header> Apakah ahmadzidni.site memiliki komunitas atau forum diskusi?</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Bagaimana saya dapat berkontribusi pada ahmadzidni.site?</Accordion.Header>
                <Accordion.Body>
                Kami sangat menghargai kontribusi dari para pembaca dan ahli di bidangnya. Anda dapat berkontribusi dengan mengirimkan artikel, ide, atau saran topik yang menarik untuk dibahas. 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
    </div>
  )
}

export default HomepageAccordions