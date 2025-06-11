import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import './main.css';

const Main = () => {
  return (
    <main>
      <Swiper
  effect={"coverflow"}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={"auto"}
  loop={true}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: false
  }}
  modules={[EffectCoverflow, Navigation]}
  navigation={true}
  className="mySwiper"
>
  <SwiperSlide>
    <div className="slide-container">
      <div className="proceso-content">
        <div className="proceso-img">
          <img src="../src/assets/img/suceciones.png" alt="Sucesiones" />
        </div>
        <div className="proceso-txt">
          <h3>Sucesiones</h3>
          <p>
            Brindamos acompañamiento legal en la distribución de herencias, asegurando que el proceso se
            realice de forma justa y conforme a la ley, protegiendo los derechos de todos los herederos.
          </p>
          <a href={`/casos/sucesiones`} className="btn-1">
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
          <img src="../src/assets/img/Divorcio.png" alt="Divorcios y Liquidaciones" />
        </div>
        <div className="proceso-txt">
          <h3>Divorcios y Liquidaciones</h3>
          <p>
            Te asistimos en todo el proceso de divorcio, desde la separación hasta la liquidación de
            bienes, garantizando un enfoque respetuoso y eficiente para ambas partes.
          </p>
          <a href={`/casos/divorcios`} className="btn-1">
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
          <img src="../src/assets/img/preliquidaciones.png" alt="Preliquidaciones Notariales" />
        </div>
        <div className="proceso-txt">
          <h3>Preliquidaciones Notariales</h3>
          <p>
            Ofrecemos asesoría y gestión en la preliquidación de bienes, evitando conflictos legales
            futuros y asegurando que los procesos de sucesión y liquidación sean claros.
          </p>
          <a href={`/casos/preliquidaciones`} className="btn-1">
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
          <img src="../src/assets/img/salida.png" alt="Salidas del País" />
        </div>
        <div className="proceso-txt">
          <h3>Salidas del País</h3>
          <p>
            Asesoramos en la obtención de permisos legales para la salida de menores o adultos,
            cumpliendo con todos los requisitos exigidos por las autoridades.
          </p>
          <a href={`/casos/salidas_pais`} className="btn-1">
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
          <img src="../src/assets/img/matrimonios.png" alt="Matrimonios" />
        </div>
        <div className="proceso-txt">
          <h3>Matrimonios</h3>
          <p>
            Gestionamos la formalización legal de matrimonios, tanto en el territorio nacional como en
            el extranjero, asegurando la validez de tu unión en cualquier jurisdicción.
          </p>
          <a href={`/casos/matrimonios`} className="btn-1">
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
          <img src="../src/assets/img/contrato.png" alt="Contratos" />
        </div>
        <div className="proceso-txt">
          <h3>Contratos</h3>
          <p>
            Redactamos y revisamos contratos ajustados a tus necesidades específicas, garantizando la
            protección de tus derechos e intereses en cualquier tipo de transacción.
          </p>
          <a href={`/casos/contratos`} className="btn-1">
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
          <img src="../src/assets/img/peticion.png" alt="Derechos de Petición" />
        </div>
        <div className="proceso-txt">
          <h3>Derechos de Petición</h3>
          <p>
            Facilitamos la redacción y presentación de derechos de petición, asegurando que tus
            solicitudes ante entidades públicas sean claras y efectivas.
          </p>
          <a href={`/casos/derechos_peticion`} className="btn-1">
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
          <img src="../src/assets/img/tutelas.png" alt="Tutelas" />
        </div>
        <div className="proceso-txt">
          <h3>Tutelas</h3>
          <p>
            Defendemos tus derechos fundamentales a través de acciones de tutela, asegurando que recibas
            la protección judicial que te corresponde según la Constitución.
          </p>
          <a href={`/casos/tutelas`} className="btn-1">
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
          <img src="../src/assets/img/derechoca.png" alt="Derecho Canónico" />
        </div>
        <div className="proceso-txt">
          <h3>Derecho Canónico</h3>
          <p>
            Te orientamos en procesos legales eclesiásticos, como nulidades matrimoniales y otros
            asuntos regulados por el derecho de la Iglesia.
          </p>
          <a href={`/casos/derecho_canonico`} className="btn-1">
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
          <img src="../src/assets/img/nulidades.png" alt="Nulidades de Matrimonio" />
        </div>
        <div className="proceso-txt">
          <h3>Nulidades de Matrimonio</h3>
          <p>
            Si buscas anular un matrimonio, te ofrecemos asistencia legal completa, asegurando que el
            proceso sea rápido y cumpla con los requisitos legales.
          </p>
          <a href={`/casos/nulidades_matrimonio`} className="btn-1">
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
          <img src="../src/assets/img/licencias.png" alt="Licencias Desenglobes" />
        </div>
        <div className="proceso-txt">
          <h3>Licencias Desenglobes</h3>
          <p>
            Asesoramos en la división de propiedades, garantizando que cada nueva fracción esté
            legalmente constituida y cumpla con los requisitos de registro.
          </p>
          <a href={`/casos/licencias_desenglobes`} className="btn-1">
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
          <img src="../src/assets/img/englobes.png" alt="Englobes" />
        </div>
        <div className="proceso-txt">
          <h3>Englobes</h3>
          <p>
            Te ayudamos a fusionar propiedades en un solo lote de manera legal, agilizando el proceso y
            evitando futuros inconvenientes registrales.
          </p>
          <a href={`/casos/englobes`} className="btn-1">
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
          <img src="../src/assets/img/rhp.png" alt="RPH" />
        </div>
        <div className="proceso-txt">
          <h3>RPH</h3>
          <p>
            Expertos en la constitución y administración del Régimen de Propiedad Horizontal, brindamos
            asesoría integral para garantizar una gestión eficiente.
          </p>
          <a href={`/casos/rhp`} className="btn-1">
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
        <img src="../src/assets/img/noticia1.webp" alt="Noticia principal" />
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
      <div className="noticia-secundaria">
        <div className="noticia-imagen-container">
          <img src="../src/assets/img/noticia1.webp" alt="Noticia secundaria" />
        </div>
        <div className="noticia-contenido">
          <div className="noticia-meta">
            <span className="noticia-fecha">05 Junio 2025</span>
            <span className="noticia-categoria">Derecho Familiar</span>
          </div>
          <h3 className="noticia-titulo">Nuevos protocolos para divorcios express</h3>
          <a href="#" className="noticia-boton">
            Ver detalles <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div className="noticia-secundaria">
        <div className="noticia-imagen-container">
          <img src="../src/assets/img/noticia1.webp" alt="Noticia secundaria" />
        </div>
        <div className="noticia-contenido">
          <div className="noticia-meta">
            <span className="noticia-fecha">01 Junio 2025</span>
            <span className="noticia-categoria">Jurisprudencia</span>
          </div>
          <h3 className="noticia-titulo">Corte establece precedente en casos de tutela</h3>
          <a href="#" className="noticia-boton">
            Ver detalles <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="nuestro-equipo">
        <h1><br />NUESTRO EQUIPO</h1>
      </div>
      <div className="abogados">
        <div className="abogado-box">
          <div className="nombre-abogado">
            <img src="../src/assets/img/Abogado1.png" alt="Foto de perfil" />
            <h3>OSCAR JARAMILLO</h3>
          </div>
          <p>
            Abogado especializado en derecho civil y empresarial, con más de 15 años de trayectoria ofreciendo asesoría jurídica integral a personas y empresas. Reconocido por su ética profesional, capacidad estratégica y compromiso con la justicia, el Dr. Jaramillo se ha destacado por brindar soluciones legales eficaces, adaptadas a las necesidades de cada cliente. Su experiencia y liderazgo lo convierten en un pilar fundamental dentro del equipo jurídico.
          </p>
        </div>
        <div className="abogado-box">
          <div className="nombre-abogado">
            <img src="../src/assets/img/Abogado2.png" alt="Foto de perfil" />
            <h3>JENNIFER BRICEÑO</h3>
          </div>
          <p>
            Con una sólida formación en derecho de familia y derecho penal, la Dra. Briceño se ha consolidado como una abogada comprometida con la defensa de los derechos humanos y la equidad. Su cercanía con los clientes, combinada con una profunda capacidad analítica y argumentativa, le permite abordar cada caso con sensibilidad y precisión. Su profesionalismo y vocación de servicio la distinguen en cada proceso legal que lidera.
          </p>
        </div>
        <br />
      </div>
      <br />
    </main>
  );
};

export default Main;




