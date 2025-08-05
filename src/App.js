import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    prefijoInternacional: '',
    numeroTelefonico: '',
    tipoNegocio: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const dropdownRef = useRef(null);

  // Países con sus códigos y banderas emoji
  const paises = [
    { codigo: '+93', pais: 'Afganistán', bandera: '🇦🇫' },
    { codigo: '+355', pais: 'Albania', bandera: '🇦🇱' },
    { codigo: '+49', pais: 'Alemania', bandera: '🇩🇪' },
    { codigo: '+376', pais: 'Andorra', bandera: '🇦🇩' },
    { codigo: '+244', pais: 'Angola', bandera: '🇦🇴' },
    { codigo: '+1', pais: 'Anguilla', bandera: '🇦🇮' },
    { codigo: '+1', pais: 'Antigua y Barbuda', bandera: '🇦🇬' },
    { codigo: '+599', pais: 'Antillas Holandesas', bandera: '🇧🇶' },
    { codigo: '+672', pais: 'Antártida', bandera: '🇦🇶' },
    { codigo: '+966', pais: 'Arabia Saudita', bandera: '🇸🇦' },
    { codigo: '+213', pais: 'Argelia', bandera: '🇩🇿' },
    { codigo: '+54', pais: 'Argentina', bandera: '🇦🇷' },
    { codigo: '+374', pais: 'Armenia', bandera: '🇦🇲' },
    { codigo: '+297', pais: 'Aruba', bandera: '🇦🇼' },
    { codigo: '+61', pais: 'Australia', bandera: '🇦🇺' },
    { codigo: '+43', pais: 'Austria', bandera: '🇦🇹' },
    { codigo: '+994', pais: 'Azerbaiyán', bandera: '🇦🇿' },
    { codigo: '+1', pais: 'Bahamas', bandera: '🇧🇸' },
    { codigo: '+880', pais: 'Bangladesh', bandera: '🇧🇩' },
    { codigo: '+1', pais: 'Barbados', bandera: '🇧🇧' },
    { codigo: '+973', pais: 'Baréin', bandera: '🇧🇭' },
    { codigo: '+501', pais: 'Belice', bandera: '🇧🇿' },
    { codigo: '+229', pais: 'Benín', bandera: '🇧🇯' },
    { codigo: '+375', pais: 'Bielorrusia', bandera: '🇧🇾' },
    { codigo: '+95', pais: 'Birmania', bandera: '🇲🇲' },
    { codigo: '+591', pais: 'Bolivia', bandera: '🇧🇴' },
    { codigo: '+387', pais: 'Bosnia-Herzegovina', bandera: '🇧🇦' },
    { codigo: '+267', pais: 'Botsuana', bandera: '🇧🇼' },
    { codigo: '+55', pais: 'Brasil', bandera: '🇧🇷' },
    { codigo: '+673', pais: 'Brunéi', bandera: '🇧🇳' },
    { codigo: '+359', pais: 'Bulgaria', bandera: '🇧🇬' },
    { codigo: '+226', pais: 'Burkina Faso', bandera: '🇧🇫' },
    { codigo: '+257', pais: 'Burundi', bandera: '🇧🇮' },
    { codigo: '+975', pais: 'Bután', bandera: '🇧🇹' },
    { codigo: '+32', pais: 'Bélgica', bandera: '🇧🇪' },
    { codigo: '+238', pais: 'Cabo Verde', bandera: '🇨🇻' },
    { codigo: '+855', pais: 'Camboya', bandera: '🇰🇭' },
    { codigo: '+237', pais: 'Camerún', bandera: '🇨🇲' },
    { codigo: '+1', pais: 'Canadá', bandera: '🇨🇦' },
    { codigo: '+974', pais: 'Catar', bandera: '🇶🇦' },
    { codigo: '+235', pais: 'Chad', bandera: '🇹🇩' },
    { codigo: '+56', pais: 'Chile', bandera: '🇨🇱' },
    { codigo: '+86', pais: 'China', bandera: '🇨🇳' },
    { codigo: '+357', pais: 'Chipre', bandera: '🇨🇾' },
    { codigo: '+57', pais: 'Colombia', bandera: '🇨🇴' },
    { codigo: '+269', pais: 'Comoras', bandera: '🇰🇲' },
    { codigo: '+850', pais: 'Corea del Norte', bandera: '🇰🇵' },
    { codigo: '+82', pais: 'Corea del Sur', bandera: '🇰🇷' },
    { codigo: '+506', pais: 'Costa Rica', bandera: '🇨🇷' },
    { codigo: '+385', pais: 'Croacia', bandera: '🇭🇷' },
    { codigo: '+53', pais: 'Cuba', bandera: '🇨🇺' },
    { codigo: '+599', pais: 'Curazao', bandera: '🇨🇼' },
    { codigo: '+45', pais: 'Dinamarca', bandera: '🇩🇰' },
    { codigo: '+1', pais: 'Dominica', bandera: '🇩🇲' },
    { codigo: '+593', pais: 'Ecuador', bandera: '🇪🇨' },
    { codigo: '+20', pais: 'Egipto', bandera: '🇪🇬' },
    { codigo: '+503', pais: 'El Salvador', bandera: '🇸🇻' },
    { codigo: '+971', pais: 'Emiratos Árabes Unidos', bandera: '🇦🇪' },
    { codigo: '+291', pais: 'Eritrea', bandera: '🇪🇷' },
    { codigo: '+421', pais: 'Eslovaquia', bandera: '🇸🇰' },
    { codigo: '+386', pais: 'Eslovenia', bandera: '🇸🇮' },
    { codigo: '+34', pais: 'España', bandera: '🇪🇸' },
    { codigo: '+1', pais: 'Estados Unidos', bandera: '🇺🇸' },
    { codigo: '+372', pais: 'Estonia', bandera: '🇪🇪' },
    { codigo: '+251', pais: 'Etiopía', bandera: '🇪🇹' },
    { codigo: '+63', pais: 'Filipinas', bandera: '🇵🇭' },
    { codigo: '+358', pais: 'Finlandia', bandera: '🇫🇮' },
    { codigo: '+679', pais: 'Fiyi', bandera: '🇫🇯' },
    { codigo: '+33', pais: 'Francia', bandera: '🇫🇷' },
    { codigo: '+241', pais: 'Gabón', bandera: '🇬🇦' },
    { codigo: '+220', pais: 'Gambia', bandera: '🇬🇲' },
    { codigo: '+995', pais: 'Georgia', bandera: '🇬🇪' },
    { codigo: '+233', pais: 'Gana', bandera: '🇬🇭' },
    { codigo: '+350', pais: 'Gibraltar', bandera: '🇬🇮' },
    { codigo: '+1', pais: 'Granada', bandera: '🇬🇩' },
    { codigo: '+30', pais: 'Grecia', bandera: '🇬🇷' },
    { codigo: '+1', pais: 'Guam', bandera: '🇬🇺' },
    { codigo: '+502', pais: 'Guatemala', bandera: '🇬🇹' },
    { codigo: '+44', pais: 'Guernesey', bandera: '🇬🇬' },
    { codigo: '+224', pais: 'Guinea', bandera: '🇬🇳' },
    { codigo: '+240', pais: 'Guinea Ecuatorial', bandera: '🇬🇶' },
    { codigo: '+245', pais: 'Guinea-Bisáu', bandera: '🇬🇼' },
    { codigo: '+592', pais: 'Guyana', bandera: '🇬🇾' },
    { codigo: '+509', pais: 'Haití', bandera: '🇭🇹' },
    { codigo: '+504', pais: 'Honduras', bandera: '🇭🇳' },
    { codigo: '+852', pais: 'Hong Kong', bandera: '🇭🇰' },
    { codigo: '+36', pais: 'Hungría', bandera: '🇭🇺' },
    { codigo: '+91', pais: 'India', bandera: '🇮🇳' },
    { codigo: '+62', pais: 'Indonesia', bandera: '🇮🇩' },
    { codigo: '+964', pais: 'Irak', bandera: '🇮🇶' },
    { codigo: '+353', pais: 'Irlanda', bandera: '🇮🇪' },
    { codigo: '+98', pais: 'Irán', bandera: '🇮🇷' },
    { codigo: '+44', pais: 'Isla de Man', bandera: '🇮🇲' },
    { codigo: '+61', pais: 'Isla de Navidad', bandera: '🇨🇽' },
    { codigo: '+354', pais: 'Islandia', bandera: '🇮🇸' },
    { codigo: '+1', pais: 'Islas Bermudas', bandera: '🇧🇲' },
    { codigo: '+1', pais: 'Islas Caimán', bandera: '🇰🇾' },
    { codigo: '+61', pais: 'Islas Cocos', bandera: '🇨🇨' },
    { codigo: '+682', pais: 'Islas Cook', bandera: '🇨🇰' },
    { codigo: '+298', pais: 'Islas Faroe', bandera: '🇫🇴' },
    { codigo: '+500', pais: 'Islas Malvinas', bandera: '🇫🇰' },
    { codigo: '+1', pais: 'Islas Marianas del Norte', bandera: '🇲🇵' },
    { codigo: '+692', pais: 'Islas Marshall', bandera: '🇲🇭' },
    { codigo: '+677', pais: 'Islas Salomón', bandera: '🇸🇧' },
    { codigo: '+1', pais: 'Islas Turcas y Caicos', bandera: '🇹🇨' },
    { codigo: '+1', pais: 'Islas Vírgenes Británicas', bandera: '🇻🇬' },
    { codigo: '+1', pais: 'Islas Vírgenes de EE.UU', bandera: '🇻🇮' },
    { codigo: '+972', pais: 'Israel', bandera: '🇮🇱' },
    { codigo: '+39', pais: 'Italia', bandera: '🇮🇹' },
    { codigo: '+225', pais: 'Ivory Coast', bandera: '🇨🇮' },
    { codigo: '+1', pais: 'Jamaica', bandera: '🇯🇲' },
    { codigo: '+81', pais: 'Japón', bandera: '🇯🇵' },
    { codigo: '+44', pais: 'Jersey', bandera: '🇯🇪' },
    { codigo: '+962', pais: 'Jordania', bandera: '🇯🇴' },
    { codigo: '+7', pais: 'Kazajistán', bandera: '🇰🇿' },
    { codigo: '+254', pais: 'Kenia', bandera: '🇰🇪' },
    { codigo: '+996', pais: 'Kirguistán', bandera: '🇰🇬' },
    { codigo: '+686', pais: 'Kiribati', bandera: '🇰🇮' },
    { codigo: '+383', pais: 'Kosovo', bandera: '🇽🇰' },
    { codigo: '+965', pais: 'Kuwait', bandera: '🇰🇼' },
    { codigo: '+856', pais: 'Laos', bandera: '🇱🇦' },
    { codigo: '+266', pais: 'Lesoto', bandera: '🇱🇸' },
    { codigo: '+371', pais: 'Letonia', bandera: '🇱🇻' },
    { codigo: '+231', pais: 'Liberia', bandera: '🇱🇷' },
    { codigo: '+218', pais: 'Libia', bandera: '🇱🇾' },
    { codigo: '+423', pais: 'Liechtenstein', bandera: '🇱🇮' },
    { codigo: '+370', pais: 'Lituania', bandera: '🇱🇹' },
    { codigo: '+352', pais: 'Luxemburgo', bandera: '🇱🇺' },
    { codigo: '+961', pais: 'Líbano', bandera: '🇱🇧' },
    { codigo: '+853', pais: 'Macao', bandera: '🇲🇴' },
    { codigo: '+261', pais: 'Madagascar', bandera: '🇲🇬' },
    { codigo: '+60', pais: 'Malasia', bandera: '🇲🇾' },
    { codigo: '+265', pais: 'Malaui', bandera: '🇲🇼' },
    { codigo: '+960', pais: 'Maldivas', bandera: '🇲🇻' },
    { codigo: '+356', pais: 'Malta', bandera: '🇲🇹' },
    { codigo: '+223', pais: 'Malí', bandera: '🇲🇱' },
    { codigo: '+212', pais: 'Marruecos', bandera: '🇲🇦' },
    { codigo: '+230', pais: 'Mauricio', bandera: '🇲🇺' },
    { codigo: '+222', pais: 'Mauritania', bandera: '🇲🇷' },
    { codigo: '+262', pais: 'Mayotte', bandera: '🇾🇹' },
    { codigo: '+691', pais: 'Micronesia', bandera: '🇫🇲' },
    { codigo: '+373', pais: 'Moldavia', bandera: '🇲🇩' },
    { codigo: '+976', pais: 'Mongolia', bandera: '🇲🇳' },
    { codigo: '+382', pais: 'Montenegro', bandera: '🇲🇪' },
    { codigo: '+1', pais: 'Montserrat', bandera: '🇲🇸' },
    { codigo: '+258', pais: 'Mozambique', bandera: '🇲🇿' },
    { codigo: '+52', pais: 'México', bandera: '🇲🇽' },
    { codigo: '+377', pais: 'Mónaco', bandera: '🇲🇨' },
    { codigo: '+264', pais: 'Namibia', bandera: '🇳🇦' },
    { codigo: '+674', pais: 'Nauru', bandera: '🇳🇷' },
    { codigo: '+977', pais: 'Nepal', bandera: '🇳🇵' },
    { codigo: '+505', pais: 'Nicaragua', bandera: '🇳🇮' },
    { codigo: '+234', pais: 'Nigeria', bandera: '🇳🇬' },
    { codigo: '+683', pais: 'Niue', bandera: '🇳🇺' },
    { codigo: '+47', pais: 'Noruega', bandera: '🇳🇴' },
    { codigo: '+687', pais: 'Nueva Caledonia', bandera: '🇳🇨' },
    { codigo: '+64', pais: 'Nueva Zelanda', bandera: '🇳🇿' },
    { codigo: '+227', pais: 'Níger', bandera: '🇳🇪' },
    { codigo: '+968', pais: 'Omán', bandera: '🇴🇲' },
    { codigo: '+92', pais: 'Pakistán', bandera: '🇵🇰' },
    { codigo: '+680', pais: 'Palaos', bandera: '🇵🇼' },
    { codigo: '+970', pais: 'Palestina', bandera: '🇵🇸' },
    { codigo: '+507', pais: 'Panamá', bandera: '🇵🇦' },
    { codigo: '+675', pais: 'Papúa Nueva Guinea', bandera: '🇵🇬' },
    { codigo: '+595', pais: 'Paraguay', bandera: '🇵🇾' },
    { codigo: '+31', pais: 'Países Bajos', bandera: '🇳🇱' },
    { codigo: '+51', pais: 'Perú', bandera: '🇵🇪' },
    { codigo: '+870', pais: 'Pitcairn', bandera: '🇵🇳' },
    { codigo: '+689', pais: 'Polinesia Francés', bandera: '🇵🇫' },
    { codigo: '+48', pais: 'Polonia', bandera: '🇵🇱' },
    { codigo: '+351', pais: 'Portugal', bandera: '🇵🇹' },
    { codigo: '+1', pais: 'Puerto Rico', bandera: '🇵🇷' },
    { codigo: '+44', pais: 'Reino Unido', bandera: '🇬🇧' },
    { codigo: '+236', pais: 'República Centroafricana', bandera: '🇨🇫' },
    { codigo: '+420', pais: 'República Checa', bandera: '🇨🇿' },
    { codigo: '+389', pais: 'República de Macedonia', bandera: '🇲🇰' },
    { codigo: '+242', pais: 'República del Congo', bandera: '🇨🇬' },
    { codigo: '+243', pais: 'República Democrática del Congo', bandera: '🇨🇩' },
    { codigo: '+1', pais: 'República Dominicana', bandera: '🇩🇴' },
    { codigo: '+262', pais: 'Reunión', bandera: '🇷🇪' },
    { codigo: '+250', pais: 'Ruanda', bandera: '🇷🇼' },
    { codigo: '+40', pais: 'Rumania', bandera: '🇷🇴' },
    { codigo: '+7', pais: 'Rusia', bandera: '🇷🇺' },
    { codigo: '+212', pais: 'Sahara Occidental', bandera: '🇪🇭' },
    { codigo: '+685', pais: 'Samoa', bandera: '🇼🇸' },
    { codigo: '+1', pais: 'Samoa Americana', bandera: '🇦🇸' },
    { codigo: '+590', pais: 'San Bartolomé', bandera: '🇧🇱' },
    { codigo: '+1', pais: 'San Cristóbal y Nieves', bandera: '🇰🇳' },
    { codigo: '+378', pais: 'San Marino', bandera: '🇸🇲' },
    { codigo: '+590', pais: 'San Martín', bandera: '🇲🇫' },
    { codigo: '+508', pais: 'San Pedro y Miquelón', bandera: '🇵🇲' },
    { codigo: '+1', pais: 'San Vicente y las Granadinas', bandera: '🇻🇨' },
    { codigo: '+290', pais: 'Santa Helena', bandera: '🇸🇭' },
    { codigo: '+1', pais: 'Santa Lucía', bandera: '🇱🇨' },
    { codigo: '+239', pais: 'Sao Tomé y Príncipe', bandera: '🇸🇹' },
    { codigo: '+221', pais: 'Senegal', bandera: '🇸🇳' },
    { codigo: '+381', pais: 'Serbia', bandera: '🇷🇸' },
    { codigo: '+248', pais: 'Seychelles', bandera: '🇸🇨' },
    { codigo: '+232', pais: 'Sierra Leona', bandera: '🇸🇱' },
    { codigo: '+65', pais: 'Singapur', bandera: '🇸🇬' },
    { codigo: '+1', pais: 'Sin Maarten', bandera: '🇸🇽' },
    { codigo: '+963', pais: 'Siria', bandera: '🇸🇾' },
    { codigo: '+252', pais: 'Somalia', bandera: '🇸🇴' },
    { codigo: '+94', pais: 'Sri Lanka', bandera: '🇱🇰' },
    { codigo: '+268', pais: 'Suazilandia', bandera: '🇸🇿' },
    { codigo: '+27', pais: 'Sudáfrica', bandera: '🇿🇦' },
    { codigo: '+249', pais: 'Sudán', bandera: '🇸🇩' },
    { codigo: '+211', pais: 'Sudán del Sur', bandera: '🇸🇸' },
    { codigo: '+46', pais: 'Suecia', bandera: '🇸🇪' },
    { codigo: '+41', pais: 'Suiza', bandera: '🇨🇭' },
    { codigo: '+597', pais: 'Surinam', bandera: '🇸🇷' },
    { codigo: '+47', pais: 'Svalbard y Jan Mayen', bandera: '🇸🇯' },
    { codigo: '+66', pais: 'Tailandia', bandera: '🇹🇭' },
    { codigo: '+886', pais: 'Taiwán', bandera: '🇹🇼' },
    { codigo: '+255', pais: 'Tanzania', bandera: '🇹🇿' },
    { codigo: '+992', pais: 'Tayikistán', bandera: '🇹🇯' },
    { codigo: '+246', pais: 'Territorio Británico del Océano Índico', bandera: '🇮🇴' },
    { codigo: '+1', pais: 'Tierra Verde', bandera: '🇬🇱' },
    { codigo: '+670', pais: 'Timor Oriental', bandera: '🇹🇱' },
    { codigo: '+228', pais: 'Togo', bandera: '🇹🇬' },
    { codigo: '+690', pais: 'Tokelau', bandera: '🇹🇰' },
    { codigo: '+676', pais: 'Tonga', bandera: '🇹🇴' },
    { codigo: '+1', pais: 'Trinidad y Tobago', bandera: '🇹🇹' },
    { codigo: '+993', pais: 'Turkmenistán', bandera: '🇹🇲' },
    { codigo: '+90', pais: 'Turquía', bandera: '🇹🇷' },
    { codigo: '+688', pais: 'Tuvalu', bandera: '🇹🇻' },
    { codigo: '+216', pais: 'Túnez', bandera: '🇹🇳' },
    { codigo: '+380', pais: 'Ucrania', bandera: '🇺🇦' },
    { codigo: '+256', pais: 'Uganda', bandera: '🇺🇬' },
    { codigo: '+598', pais: 'Uruguay', bandera: '🇺🇾' },
    { codigo: '+998', pais: 'Uzbekistán', bandera: '🇺🇿' },
    { codigo: '+678', pais: 'Vanuatu', bandera: '🇻🇺' },
    { codigo: '+379', pais: 'Vaticano', bandera: '🇻🇦' },
    { codigo: '+58', pais: 'Venezuela', bandera: '🇻🇪' },
    { codigo: '+84', pais: 'Vietnam', bandera: '🇻🇳' },
    { codigo: '+681', pais: 'Wallis y Futuna', bandera: '🇼🇫' },
    { codigo: '+967', pais: 'Yemen', bandera: '🇾🇪' },
    { codigo: '+253', pais: 'Yibuti', bandera: '🇩🇯' },
    { codigo: '+260', pais: 'Zambia', bandera: '🇿🇲' },
    { codigo: '+263', pais: 'Zimbabwe', bandera: '🇿🇼' }
  ];

  const tiposNegocio = [
    'Consultoría',
    'Retail',
    'Manufactura',
    'Servicios Financieros',
    'Educación',
    'Salud',
    'Tecnología',
    'Turismo',
    'Hostelería',
    'Agricultura',
    'Construcción',
    'Bienes Raíces',
    'Energía',
    'Transporte',
    'Logística',
    'Otros'
  ];

  // País seleccionado por defecto (puedes cambiarlo)
  const [selectedCountry, setSelectedCountry] = useState(paises.find(p => p.pais === 'Costa Rica') || paises[0]);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación especial para número telefónico
    if (name === 'numeroTelefonico') {
      // Solo permitir números
      const soloNumeros = value.replace(/[^0-9]/g, '');
      
      // Limitar a máximo 15 dígitos (estándar internacional)
      const numeroLimitado = soloNumeros.slice(0, 15);
      
      // Validar longitud y mostrar errores
      if (numeroLimitado.length > 0 && numeroLimitado.length < 7) {
        setPhoneError('Mínimo 7 dígitos');
      } else if (name === 'correoElectronico') {
      // Para el correo, solo actualizar el valor
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
        setPhoneError('');
      }
      
      setFormData({
        ...formData,
        [name]: numeroLimitado
      });
    } else if (name === 'nombreCompleto') {
      // Para el nombre, permitir solo letras, espacios y algunos caracteres latinos
      const nombreValido = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
      setFormData({
        ...formData,
        [name]: nombreValido
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormData({
      ...formData,
      prefijoInternacional: `(${country.codigo}) ${country.pais}`
    });
    setShowCountryDropdown(false);
    setCountrySearch('');
  };

  const filteredCountries = paises.filter(country => 
    country.pais.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.codigo.includes(countrySearch)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevenir envíos múltiples muy rápidos
    const ahora = Date.now();
    if (ahora - lastSubmitTime < 3000) {
      alert('Por favor espere unos segundos antes de enviar nuevamente');
      return;
    }
    
    // Validación del nombre
    if (formData.nombreCompleto.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      return;
    }
    
    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.correoElectronico.trim())) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }
    
    // Validación adicional del teléfono
    if (formData.numeroTelefonico.length < 7) {
      setPhoneError('El número debe tener al menos 7 dígitos');
      return;
    }
    
    if (formData.numeroTelefonico.length > 15) {
      setPhoneError('El número no puede tener más de 15 dígitos');
      return;
    }
    
    // Validación del tipo de negocio
    if (!formData.tipoNegocio) {
      alert('Por favor seleccione un tipo de negocio');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setPhoneError('');
    setLastSubmitTime(Date.now());
    
    // Obtener el prefijo final
    const prefijoFinal = formData.prefijoInternacional || `(${selectedCountry.codigo}) ${selectedCountry.pais}`;
    
    // Limpiar el email
    const emailLimpio = formData.correoElectronico.trim();
    
    try {
      const response = await fetch('https://n8n-render-hpih.onrender.com/webhook/registro-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Nombre Completo': formData.nombreCompleto.trim(),
          'Correo Electrónico': emailLimpio,
          'Prefijo Internacional': prefijoFinal,
          'Número Telefónico': formData.numeroTelefonico,
          'Tipo de Negocio': formData.tipoNegocio
        })
      });
      if (response.ok) {
        setSubmitStatus('success');
        // Limpiar formulario
        setFormData({
          nombreCompleto: '',
          correoElectronico: '',
          prefijoInternacional: '',
          numeroTelefonico: '',
          tipoNegocio: ''
        });
        // Resetear país a Costa Rica
        setSelectedCountry(paises.find(p => p.pais === 'Costa Rica') || paises[0]);
        // Limpiar error
        setPhoneError('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <div className="form-header">
          <h1>Automatiza tu Empresa</h1>
          <p>Descubre el potencial de la IA para tu negocio</p>
        </div>

        {submitStatus === 'success' ? (
          <div className="success-container">
            <div className="success-icon">✅</div>
            <h2>¡Registro Exitoso!</h2>
            <p>Hemos recibido tu información correctamente.</p>
            <p>Nos pondremos en contacto contigo pronto.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre Completo *</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              required
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ej: Gabriel Barrantes Rivera"
              minLength={3}
              maxLength={100}
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+"
              title="Solo se permiten letras y espacios"
            />
          </div>

          <div className="form-group">
            <label htmlFor="correoElectronico">Correo Electrónico *</label>
            <input
              type="email"
              name="correoElectronico"
              id="correoElectronico"
              placeholder="Ej: miempresa@gmail.com"
              value={formData.correoElectronico}
              onChange={handleChange}
              onBlur={(e) => {
                // Limpiar el correo cuando pierde el focus
                const correoLimpio = e.target.value.toLowerCase().trim();
                setFormData({
                  ...formData,
                  correoElectronico: correoLimpio
                });
              }}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Ingrese un correo electrónico válido"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroTelefonico">Número Telefónico *</label>
            <div className="phone-input-container" ref={dropdownRef}>
              <button
                type="button"
                className="country-selector"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                <span className="flag">{selectedCountry.bandera}</span>
                <span className="code">{selectedCountry.codigo}</span>
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>
              
              <input
                type="tel"
                id="numeroTelefonico"
                name="numeroTelefonico"
                placeholder="12345678"
                value={formData.numeroTelefonico}
                onChange={handleChange}
                required
                pattern="[0-9]{5,15}"
                minLength={5}
                maxLength={15}
                title="El número debe tener entre 5 y 15 dígitos"
                className={`phone-number-input ${phoneError ? 'error' : ''}`}
                onInvalid={(e) => {
                  if (e.target.value === '') {
                    e.target.setCustomValidity('Por favor ingrese un número de teléfono');
                  } else if (e.target.value.length < 5) {
                    e.target.setCustomValidity('El número debe tener al menos 5 dígitos');
                  } else if (e.target.value.length > 15) {
                    e.target.setCustomValidity('El número no puede tener más de 15 dígitos');
                  } else {
                    e.target.setCustomValidity('Solo se permiten números');
                  }
                }}
                onInput={(e) => e.target.setCustomValidity('')}
              />
              
              {showCountryDropdown && (
                <div className="country-dropdown">
                  <div className="country-search">
                    <input
                      type="text"
                      placeholder="Buscar país o código..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="country-list">
                    {filteredCountries.map((country, index) => (
                      <button
                        key={`${country.codigo}-${index}`}
                        type="button"
                        className="country-option"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="flag">{country.bandera}</span>
                        <span className="country-name">{country.pais}</span>
                        <span className="country-code">{country.codigo}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {phoneError && (
              <span className="phone-error">
                {phoneError}
              </span>
            )}
            {!phoneError && formData.numeroTelefonico.length > 0 && (
              <span style={{ 
                color: '#64748b', 
                fontSize: '12px', 
                marginTop: '4px', 
                display: 'block' 
              }}>
                {formData.numeroTelefonico.length}/15 dígitos
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tipoNegocio">Tipo de Negocio *</label>
            <select
              id="tipoNegocio"
              name="tipoNegocio"
              required
              value={formData.tipoNegocio}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              {tiposNegocio.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Registrarse'}
          </button>

          {submitStatus === 'error' && (
            <div className="message error">
              ✗ Error al enviar. Por favor intente de nuevo.
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  );
}

export default App;