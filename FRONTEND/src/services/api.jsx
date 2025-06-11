// 1. Función para obtener usuarios desde la API
export const fetchUsers = async () => {
    const apiUrl = 'http://localhost:9000/api/usuarios';
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
