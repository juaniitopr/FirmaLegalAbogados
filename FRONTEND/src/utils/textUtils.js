function normalizeText(input) {
    // Verifica si input es una cadena de texto
    if (typeof input !== "string") {
      return input;  // Si no es una cadena, simplemente devuelve el valor original
    }
  
    // Define los caracteres que se reemplazarán y sus reemplazos
    const from = "séíóúáAEIOU";
    const to = "seiouaAEIOU";
  
    // Crea un objeto para mapear los caracteres a reemplazar
    const mapping = {};
    for (let i = 0; i < from.length; i++) {
      mapping[from.charAt(i)] = to.charAt(i);
    }
  
    // Elimina los espacios en blanco y convierte a minúsculas
    const result = input
      .replace(/\s+/g, "")  // Usa replace en lugar de remplace
      .split("")
      .map((char) => mapping[char] || char)  // Reemplaza los caracteres según el mapa
      .join("")  // Vuelve a juntar los caracteres
      .toLowerCase();  // Convierte a minúsculas
  
    return result;
  }
  
  export default normalizeText;
  