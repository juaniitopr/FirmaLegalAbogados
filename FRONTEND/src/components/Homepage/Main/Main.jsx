import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import './main.css';

// Importación de imágenes
import sucesionesImg from '../../../assets/img/suceciones.png';
import divorcioImg from '../../../assets/img/Divorcio.png';
import preliquidacionesImg from '../../../assets/img/preliquidaciones.png';
import salidaImg from '../../../assets/img/salida.png';
import matrimoniosImg from '../../../assets/img/matrimonios.png';
import contratoImg from '../../../assets/img/contrato.png';
import peticionImg from '../../../assets/img/peticion.png';
import tutelasImg from '../../../assets/img/tutelas.png';
import derechoCanonicoImg from '../../../assets/img/derechoca.png';
import nulidadesImg from '../../../assets/img/nulidades.png';
import licenciasImg from '../../../assets/img/licencias.png';
import englobesImg from '../../../assets/img/englobes.png';
import noticia1Img from '../../../assets/img/noticia1.webp';
import abogado1Img from '../../../assets/img/Abogado1.png';
import abogado2Img from '../../../assets/img/Abogado2.png';

const Main = () => {
  return (
    <main>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation]}
        navigation
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={sucesionesImg} alt="Sucesiones" />
              </div>
              <div className="proceso-txt">
                <h3>Sucesiones</h3>
                <p>
                  Brindamos acompañamiento legal en la distribución de herencias, asegurando que el proceso se realice de forma justa y conforme a la ley, protegiendo los derechos de todos los herederos.
                </p>
                <a href="/casos/sucesiones" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={divorcioImg} alt="Divorcios y Liquidaciones" />
              </div>
              <div className="proceso-txt">
                <h3>Divorcios y Liquidaciones</h3>
                <p>
                  Te asistimos en todo el proceso de divorcio, desde la separación hasta la liquidación de bienes, garantizando un enfoque respetuoso y eficiente para ambas partes.
                </p>
                <a href="/casos/divorcios" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={preliquidacionesImg} alt="Preliquidaciones Notariales" />
              </div>
              <div className="proceso-txt">
                <h3>Preliquidaciones Notariales</h3>
                <p>
                  Ofrecemos asesoría y gestión en la preliquidación de bienes, evitando conflictos legales futuros y asegurando que los procesos de sucesión y liquidación sean claros.
                </p>
                <a href="/casos/preliquidaciones" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={salidaImg} alt="Salidas del País" />
              </div>
              <div className="proceso-txt">
                <h3>Salidas del País</h3>
                <p>
                  Asesoramos en la obtención de permisos legales para la salida de menores o adultos, cumpliendo con todos los requisitos exigidos por las autoridades.
                </p>
                <a href="/casos/salidas_pais" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={matrimoniosImg} alt="Matrimonios" />
              </div>
              <div className="proceso-txt">
                <h3>Matrimonios</h3>
                <p>
                  Gestionamos la formalización legal de matrimonios, tanto en el territorio nacional como en el extranjero, asegurando la validez de tu unión en cualquier jurisdicción.
                </p>
                <a href="/casos/matrimonios" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={contratoImg} alt="Contratos" />
              </div>
              <div className="proceso-txt">
                <h3>Contratos</h3>
                <p>
                  Redactamos y revisamos contratos ajustados a tus necesidades específicas, garantizando la protección de tus derechos e intereses en cualquier tipo de transacción.
                </p>
                <a href="/casos/contratos" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={peticionImg} alt="Derechos de Petición" />
              </div>
              <div className="proceso-txt">
                <h3>Derechos de Petición</h3>
                <p>
                  Facilitamos la redacción y presentación de derechos de petición, asegurando que tus solicitudes ante entidades públicas sean claras y efectivas.
                </p>
                <a href="/casos/derechos_peticion" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={tutelasImg} alt="Tutelas" />
              </div>
              <div className="proceso-txt">
                <h3>Tutelas</h3>
                <p>
                  Defendemos tus derechos fundamentales a través de acciones de tutela, asegurando que recibas la protección judicial que te corresponde según la Constitución.
                </p>
                <a href="/casos/tutelas" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={derechoCanonicoImg} alt="Derecho Canónico" />
              </div>
              <div className="proceso-txt">
                <h3>Derecho Canónico</h3>
                <p>
                  Te orientamos en procesos legales eclesiásticos, como nulidades matrimoniales y otros asuntos regulados por el derecho de la Iglesia.
                </p>
                <a href="/casos/derecho_canonico" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={nulidadesImg} alt="Nulidades de Matrimonio" />
              </div>
              <div className="proceso-txt">
                <h3>Nulidades de Matrimonio</h3>
                <p>
                  Si buscas anular un matrimonio, te ofrecemos asistencia legal completa, asegurando que el proceso sea rápido y cumpla con los requisitos legales.
                </p>
                <a href="/casos/nulidades_matrimonio" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={licenciasImg} alt="Licencias Desenglobes" />
              </div>
              <div className="proceso-txt">
                <h3>Licencias Desenglobes</h3>
                <p>
                  Asesoramos en la división de propiedades, garantizando que cada nueva fracción esté legalmente constituida y cumpla con los requisitos de registro.
                </p>
                <a href="/casos/licencias_desenglobes" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <div className="proceso-content">
              <div className="proceso-img">
                <img src={englobesImg} alt="Englobes" />
              </div>
              <div className="proceso-txt">
                <h3>Englobes</h3>
                <p>
                  Te asistimos en la integración legal de múltiples propiedades en una sola unidad registral, cumpliendo con los procedimientos técnicos y normativos vigentes.
                </p>
                <a href="/casos/englobes" className="btn-1">
                  <span>Saber Más</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <section id="noticias" className="noticias-elegantes">
        <div className="seccion-header">
          <h2 className="titulo-seccion">Actualidad Jurídica</h2>
          <p className="subtitulo-seccion">Información relevante y actualizada para nuestros clientes</p>
        </div>

        <div className="noticias-grid">
          <div className="noticia-principal">
            <div className="noticia-imagen-container">
              <img src={noticia1Img} alt="Noticia principal" />
              <div className="noticia-etiqueta">Novedad</div>
            </div>
            <div className="noticia-contenido">
              <div className="noticia-meta">
                <span className="noticia-fecha">09 Junio 2025</span>
                <span className="noticia-categoria">Derecho Civil</span>
              </div>
              <h3 className="noticia-titulo">Reformas al código civil afectarán procesos sucesorios</h3>
              <p className="noticia-resumen">
                Los cambios legislativos recientes modifican los plazos para la declaración de herederos...
              </p>
              <a href="#" className="noticia-boton">
                Leer análisis completo <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="noticias-secundarias">
            {[{
              date: '05 Junio 2025',
              category: 'Derecho Familiar',
              title: 'Nuevos protocolos para divorcios express'
            }, {
              date: '01 Junio 2025',
              category: 'Jurisprudencia',
              title: 'Corte establece precedente en casos de tutela'
            }].map(({ date, category, title }, i) => (
              <div className="noticia-secundaria" key={i}>
                <div className="noticia-imagen-container">
                  <img src={noticia1Img} alt="Noticia secundaria" />
                </div>
                <div className="noticia-contenido">
                  <div className="noticia-meta">
                    <span className="noticia-fecha">{date}</span>
                    <span className="noticia-categoria">{category}</span>
                  </div>
                  <h3 className="noticia-titulo">{title}</h3>
                  <a href="#" className="noticia-boton">
                    Ver detalles <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de abogados */}
      <div className="nuestro-equipo">
        <h1><br />NUESTRO EQUIPO</h1>
      </div>
      <div className="abogados">
        {[{
          img: abogado1Img,
          name: 'OSCAR JARAMILLO',
          desc: 'Abogado especializado en derecho civil y empresarial, con más de 15 años de trayectoria...'
        }, {
          img: abogado2Img,
          name: 'JENNIFER BRICEÑO',
          desc: 'Con una sólida formación en derecho de familia y penal...'
        }].map(({ img, name, desc }) => (
          <div className="abogado-box" key={name}>
            <div className="nombre-abogado">
              <img src={img} alt="Foto de perfil" />
              <h3>{name}</h3>
            </div>
            <p>{desc}</p>
          </div>
        ))}
        <br />
      </div>
      <br />
    </main>
  );
};

export default Main;
