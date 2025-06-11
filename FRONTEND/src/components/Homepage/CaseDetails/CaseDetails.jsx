import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CaseDetails.css';

const CaseDetails = () => {
  const { caseType } = useParams();
  const navigate = useNavigate();

  // Datos completos de todos los casos
  const casesData = {
    sucesiones: {
      title: "Sucesiones",
      description: "Brindamos acompañamiento legal en la distribución de herencias, asegurando que el proceso se realice de forma justa y conforme a la ley, protegiendo los derechos de todos los herederos.",
      longDescription: "Nuestro equipo especializado en sucesiones ofrece un acompañamiento integral en todo el proceso de distribución de herencias. Desde la apertura del proceso sucesorio hasta la adjudicación final de bienes, garantizamos que cada paso cumpla con los requisitos legales. Trabajamos en la identificación de herederos, valoración de bienes, pago de impuestos y deudas, y la correcta distribución patrimonial según la voluntad del causante o lo establecido por la ley.",
      image: "../src/assets/img/suceciones.png",
      services: [
        "Apertura de procesos sucesorios",
        "Declaratoria de herederos",
        "Liquidación de impuestos sucesorales",
        "División y adjudicación de bienes",
        "Procesos de sucesiones intestadas",
        "Ejecución de testamentos"
      ],
      benefits: [
        "Evita conflictos familiares",
        "Garantiza el cumplimiento legal",
        "Optimiza tiempos y costos",
        "Protege los derechos de todos los herederos"
      ]
    },
    divorcios: {
      title: "Divorcios y Liquidaciones",
      description: "Te asistimos en todo el proceso de divorcio, desde la separación hasta la liquidación de bienes, garantizando un enfoque respetuoso y eficiente para ambas partes.",
      longDescription: "Nuestro servicio de divorcios y liquidaciones está diseñado para ofrecer soluciones adaptadas a cada situación familiar. Manejamos tanto divorcios de mutuo acuerdo como contenciosos, asegurando que el proceso sea lo menos conflictivo posible. En la liquidación de bienes, realizamos un inventario detallado, valoración de activos y pasivos, y proponemos esquemas de distribución equitativos, considerando siempre el bienestar de los hijos menores cuando existen.",
      image: "../src/assets/img/Divorcio.png",
      services: [
        "Divorcios de mutuo acuerdo",
        "Divorcios contenciosos",
        "Liquidación de sociedad conyugal",
        "Acuerdos de pensión alimenticia",
        "Regulación de visitas y custodia",
        "Divorcios exprés"
      ],
      benefits: [
        "Resolución rápida y efectiva",
        "Protección de derechos patrimoniales",
        "Enfoque en el bienestar familiar",
        "Confidencialidad absoluta"
      ]
    },
    preliquidaciones: {
      title: "Preliquidaciones Notariales",
      description: "Ofrecemos asesoría y gestión en la preliquidación de bienes, evitando conflictos legales futuros y asegurando que los procesos de sucesión y liquidación sean claros.",
      longDescription: "Nuestro servicio de preliquidaciones notariales permite anticipar y organizar la distribución de bienes antes de que se presente una situación de sucesión o divorcio, evitando así conflictos futuros entre los interesados. Realizamos un análisis detallado del patrimonio, identificamos los bienes y derechos, y establecemos acuerdos claros que facilitarán los procesos legales posteriores.",
      image: "../src/assets/img/preliquidaciones.png",
      services: [
        "Inventario y valoración de bienes",
        "Acuerdos prenotariales",
        "Documentación legal preventiva",
        "Asesoría en distribución patrimonial",
        "Protocolos familiares"
      ],
      benefits: [
        "Previene conflictos futuros",
        "Agiliza procesos sucesorios",
        "Protege el patrimonio familiar",
        "Reduce costos legales a largo plazo"
      ]
    },
    salidas_pais: {
      title: "Salidas del País",
      description: "Asesoramos en la obtención de permisos legales para la salida de menores o adultos, cumpliendo con todos los requisitos exigidos por las autoridades.",
      longDescription: "Nuestro servicio de salidas del país garantiza que todos los trámites para la autorización de viajes al exterior se realicen conforme a la ley. Gestionamos permisos para menores que viajan sin sus padres, autorizaciones especiales y asesoramos sobre los requisitos específicos de cada país de destino, evitando inconvenientes en migraciones y asegurando el cumplimiento de todos los protocolos legales.",
      image: "../src/assets/img/salida.png",
      services: [
        "Permisos para menores que viajan solos",
        "Autorizaciones notariales",
        "Asesoría en requisitos migratorios",
        "Legalización de documentos",
        "Trámites consulares"
      ],
      benefits: [
        "Evita retrasos en aeropuertos",
        "Cumplimiento de normativas internacionales",
        "Protección legal de menores",
        "Tramitación rápida y segura"
      ]
    },
    matrimonios: {
      title: "Matrimonios",
      description: "Gestionamos la formalización legal de matrimonios, tanto en el territorio nacional como en el extranjero, asegurando la validez de tu unión en cualquier jurisdicción.",
      longDescription: "Ofrecemos asesoría integral para la celebración de matrimonios civiles, incluyendo la preparación de todos los documentos requeridos, asesoría sobre regímenes patrimoniales y trámites posteriores. También asistimos en el reconocimiento de matrimonios celebrados en el exterior, garantizando su validez legal en el país y asesorando sobre los efectos jurídicos de la unión.",
      image: "../src/assets/img/matrimonios.png",
      services: [
        "Celebración de matrimonios civiles",
        "Capitulaciones matrimoniales",
        "Reconocimiento de matrimonios extranjeros",
        "Asesoría en regímenes patrimoniales",
        "Trámites posteriores al matrimonio"
      ],
      benefits: [
        "Validez legal garantizada",
        "Protección patrimonial",
        "Asesoría personalizada",
        "Tramitación eficiente"
      ]
    },
    contratos: {
      title: "Contratos",
      description: "Redactamos y revisamos contratos ajustados a tus necesidades específicas, garantizando la protección de tus derechos e intereses en cualquier tipo de transacción.",
      longDescription: "Nuestro equipo especializado en derecho contractual ofrece servicios de redacción, revisión y asesoría en todo tipo de acuerdos legales. Desde contratos de arrendamiento hasta complejos instrumentos corporativos, nos aseguramos de que cada cláusula proteja tus intereses y cumpla con la normativa vigente, minimizando riesgos y previniendo futuros conflictos.",
      image: "../src/assets/img/contrato.png",
      services: [
        "Contratos de compraventa",
        "Arrendamientos",
        "Contratos laborales",
        "Acuerdos de confidencialidad",
        "Contratos de prestación de servicios",
        "Documentos corporativos"
      ],
      benefits: [
        "Protección de intereses",
        "Redacción clara y precisa",
        "Prevención de conflictos",
        "Cumplimiento normativo"
      ]
    },
    derechos_peticion: {
      title: "Derechos de Petición",
      description: "Facilitamos la redacción y presentación de derechos de petición, asegurando que tus solicitudes ante entidades públicas sean claras y efectivas.",
      longDescription: "Nuestro servicio de derechos de petición garantiza que tus solicitudes a entidades públicas y privadas cumplan con todos los requisitos legales para obtener respuestas oportunas y satisfactorias. Asesoramos en la formulación adecuada, seguimiento del trámite y acciones posteriores en caso de respuestas insatisfactorias o silencio administrativo.",
      image: "../src/assets/img/peticion.png",
      services: [
        "Redacción de derechos de petición",
        "Presentación ante entidades",
        "Seguimiento de trámites",
        "Acciones por silencio administrativo",
        "Recursos ante respuestas insatisfactorias"
      ],
      benefits: [
        "Respuestas más efectivas",
        "Cumplimiento de plazos legales",
        "Protección de derechos",
        "Asesoría especializada"
      ]
    },
    tutelas: {
      title: "Tutelas",
      description: "Defendemos tus derechos fundamentales a través de acciones de tutela, asegurando que recibas la protección judicial que te corresponde según la Constitución.",
      longDescription: "Nuestro equipo de litigio constitucional te asesora en la interposición de acciones de tutela cuando tus derechos fundamentales han sido vulnerados. Evaluamos tu caso, preparamos la demanda con los argumentos jurídicos más sólidos y te acompañamos en todo el proceso judicial, buscando siempre la protección efectiva de tus derechos.",
      image: "../src/assets/img/tutelas.png",
      services: [
        "Evaluación de casos",
        "Preparación de demandas de tutela",
        "Representación judicial",
        "Impugnación de fallos",
        "Ejecución de sentencias"
      ],
      benefits: [
        "Protección rápida de derechos",
        "Asesoría constitucional especializada",
        "Representación legal experta",
        "Seguimiento integral del proceso"
      ]
    },
    derecho_canonico: {
      title: "Derecho Canónico",
      description: "Te orientamos en procesos legales eclesiásticos, como nulidades matrimoniales y otros asuntos regulados por el derecho de la Iglesia.",
      longDescription: "Nuestro servicio de derecho canónico ofrece asesoría especializada en los procesos propios de la Iglesia Católica, incluyendo nulidades matrimoniales eclesiásticas, dispensas y otros trámites ante las autoridades religiosas. Combinamos el conocimiento del derecho eclesiástico con la experiencia procesal para guiarte en estos procedimientos especiales.",
      image: "../src/assets/img/derechoca.png",
      services: [
        "Nulidades matrimoniales eclesiásticas",
        "Procesos de dispensa",
        "Asesoría en derecho sacramental",
        "Representación ante tribunales eclesiásticos",
        "Conciliaciones canónicas"
      ],
      benefits: [
        "Conocimiento especializado",
        "Cumplimiento de normas canónicas",
        "Procesos ágiles",
        "Asesoría integral"
      ]
    },
    nulidades_matrimonio: {
      title: "Nulidades de Matrimonio",
      description: "Si buscas anular un matrimonio, te ofrecemos asistencia legal completa, asegurando que el proceso sea rápido y cumpla con los requisitos legales.",
      longDescription: "Nuestro servicio de nulidad matrimonial te acompaña en el proceso legal para declarar la inexistencia o nulidad de un matrimonio, ya sea por vicios de consentimiento o incumplimiento de requisitos legales. Evaluamos tu caso, preparamos la demanda y te representamos en todo el proceso judicial, buscando siempre la solución más adecuada a tu situación particular.",
      image: "../src/assets/img/nulidades.png",
      services: [
        "Evaluación de causales de nulidad",
        "Preparación de demanda",
        "Representación judicial",
        "Pruebas y sustentación",
        "Ejecución de sentencias"
      ],
      benefits: [
        "Proceso ágil y eficiente",
        "Asesoría personalizada",
        "Representación legal experta",
        "Solución integral"
      ]
    },
    licencias_desenglobes: {
      title: "Licencias Desenglobes",
      description: "Asesoramos en la división de propiedades, garantizando que cada nueva fracción esté legalmente constituida y cumpla con los requisitos de registro.",
      longDescription: "Nuestro servicio de licencias de desenglobe te guía en el proceso de división de predios, asegurando el cumplimiento de todos los requisitos urbanísticos y registrales. Gestionamos ante las autoridades competentes la obtención de las licencias necesarias y realizamos todos los trámites para que cada nueva fracción quede debidamente registrada y legalizada.",
      image: "../src/assets/img/licencias.png",
      services: [
        "Estudio de factibilidad",
        "Elaboración de planos",
        "Trámites ante curadurías",
        "Registro de divisiones",
        "Solución de problemas registrales"
      ],
      benefits: [
        "Legalidad garantizada",
        "Optimización de propiedades",
        "Asesoría técnica y jurídica",
        "Gestión integral del proceso"
      ]
    },
    englobes: {
      title: "Englobes",
      description: "Te ayudamos a fusionar propiedades en un solo lote de manera legal, agilizando el proceso y evitando futuros inconvenientes registrales.",
      longDescription: "Nuestro servicio de englobes facilita la unificación de predios, gestionando todos los trámites necesarios ante las autoridades competentes y asegurando que el nuevo lote resultante cumpla con todas las normativas urbanísticas. Asesoramos en la preparación de documentos, obtención de licencias y registro de la propiedad unificada.",
      image: "../src/assets/img/englobes.png",
      services: [
        "Estudio previo de unificación",
        "Elaboración de planos",
        "Trámites ante curadurías",
        "Registro de englobes",
        "Solución de problemas de linderos"
      ],
      benefits: [
        "Mayor valor de la propiedad",
        "Procesos más sencillos de administración",
        "Cumplimiento normativo",
        "Asesoría integral"
      ]
    },
    rhp: {
      title: "RPH",
      description: "Expertos en la constitución y administración del Régimen de Propiedad Horizontal, brindamos asesoría integral para garantizar una gestión eficiente.",
      longDescription: "Nuestro servicio especializado en Régimen de Propiedad Horizontal (RPH) cubre todos los aspectos legales de los conjuntos residenciales y comerciales. Desde la constitución inicial del régimen hasta la asesoría en asambleas, cobro de administración y solución de conflictos entre copropietarios, ofrecemos un acompañamiento completo para garantizar el buen funcionamiento de tu propiedad horizontal.",
      image: "../src/assets/img/rhp.png",
      services: [
        "Constitución de propiedad horizontal",
        "Reglamentos internos",
        "Asesoría en asambleas",
        "Cobro jurídico de administración",
        "Solución de conflictos entre copropietarios"
      ],
      benefits: [
        "Legalidad en la administración",
        "Protección de derechos de copropietarios",
        "Resolución eficiente de conflictos",
        "Asesoría especializada permanente"
      ]
    }
    // Agregar los demás casos aquí con la misma estructura
  };

    const handleBackClick = () => {
    navigate('/'); // Esto redirigirá a la ruta raíz (Homepage)
  };

  const currentCase = casesData[caseType] || casesData.sucesiones;
  const caseTypes = Object.keys(casesData);


  const handleNextCase = () => {
    const currentIndex = caseTypes.indexOf(caseType);
    const nextIndex = (currentIndex + 1) % caseTypes.length;
    navigate(`/casos/${caseTypes[nextIndex]}`);
  };

  const handlePrevCase = () => {
    const currentIndex = caseTypes.indexOf(caseType);
    const prevIndex = (currentIndex - 1 + caseTypes.length) % caseTypes.length;
    navigate(`/casos/${caseTypes[prevIndex]}`);
  };

  return (
    <div className="case-details-container">
      {/* Navegación entre casos */}
      <div className="case-navigation">
        <button onClick={handlePrevCase} className="nav-button prev-button">
          <i className="fas fa-chevron-left"></i> Anterior
        </button>
        <div className="case-breadcrumbs">
          {caseTypes.map((type, index) => (
            <React.Fragment key={type}>
              <Link 
                to={`/casos/${type}`} 
                className={`breadcrumb-item ${type === caseType ? 'active' : ''}`}
              >
                {casesData[type].title}
              </Link>
              {index < caseTypes.length - 1 && <span className="breadcrumb-separator">/</span>}
            </React.Fragment>
          ))}
        </div>
        <button onClick={handleNextCase} className="nav-button next-button">
          Siguiente <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Contenido principal del caso */}
      <div className="case-header">
        <div className="case-header-content">
          <button onClick={handleBackClick} className="back-button">
            <i className="fas fa-arrow-left"></i> Volver al inicio
          </button>
          <h1>{currentCase.title}</h1>
          <p className="case-intro">{currentCase.description}</p>
        </div>
        <div className="case-header-image">
          <img src={currentCase.image} alt={currentCase.title} />
        </div>
      </div>

      <div className="case-content">
        <section className="case-section">
          <h2>Descripción Detallada</h2>
          <p>{currentCase.longDescription}</p>
        </section>

        <div className="case-columns">
          <section className="case-section services-section">
            <h2>Servicios que Ofrecemos</h2>
            <ul>
              {currentCase.services.map((service, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i> {service}
                </li>
              ))}
            </ul>
          </section>

          <section className="case-section benefits-section">
            <h2>Beneficios para el Cliente</h2>
            <ul>
              {currentCase.benefits.map((benefit, index) => (
                <li key={index}>
                  <i className="fas fa-star"></i> {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="case-section related-cases">
          <h2>Otros Servicios Relacionados</h2>
          <div className="related-cases-grid">
            {caseTypes.filter(type => type !== caseType).slice(0, 3).map(type => (
              <Link to={`/casos/${type}`} key={type} className="related-case-card">
                <h3>{casesData[type].title}</h3>
                <p>{casesData[type].description.substring(0, 100)}...</p>
                <span className="learn-more">Ver detalles <i className="fas fa-arrow-right"></i></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="case-section cta-section">
          <div className="cta-content">
            <h2>¿Necesitas asesoría con tu caso?</h2>
            <p>Nuestros expertos están listos para ayudarte con un servicio personalizado y confidencial.</p>
            <button className="contact-button">
              Contactar a un especialista <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseDetails;