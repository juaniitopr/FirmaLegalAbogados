import { jest } from '@jest/globals'; // Importa Jest para usar sus funciones mock.
import RoleController from '../../../src/controllers/RoleController.js'; // Importa el controlador que vamos a probar.
import Rol from '../../../src/models/RoleModel.js'; // Importa el modelo de Role que se va a mockear.

jest.mock('../../../src/models/RoleModel.js'); // Mockea todo el modelo Role para no usar la base real.
Rol.findOneAndDelete = jest.fn(); // Mock manual de la función findOneAndDelete que usará el controlador.

describe('deleteRole', () => { // Describe el grupo de tests para la función deleteRole.
  let req, res; // Variables para simular la petición (req) y la respuesta (res).

  beforeEach(() => { // Antes de cada test, inicializamos req y res.
    req = { params: { id: '1' } }; // Simula una petición con params.id = '1'.
    res = { // Simula el objeto respuesta con métodos status y json mockeados.
      status: jest.fn().mockReturnThis(), // status devuelve el mismo objeto para permitir encadenar .json().
      json: jest.fn() // json es solo una función mock que registra llamadas.
    };
    jest.clearAllMocks(); // Limpia los mocks antes de cada test para evitar interferencias.
  });

  it('debería eliminar un rol y devolver un mensaje de éxito', async () => {
    // Preparamos el mock para que findOneAndDelete devuelva un objeto simulando rol eliminado.
    Rol.findOneAndDelete.mockResolvedValue({ id_rol: 1, nombre: 'Admin' });

    await RoleController.deleteRole(req, res); // Ejecutamos la función a probar.

    // Verificamos que findOneAndDelete se haya llamado con el filtro correcto (objeto con id_rol numérico).
    expect(Rol.findOneAndDelete).toHaveBeenCalledWith({ id_rol: 1 });

    // Verificamos que el controlador haya respondido con status 200 (OK).
    expect(res.status).toHaveBeenCalledWith(200);

    // Verificamos que haya enviado el mensaje de éxito esperado.
    expect(res.json).toHaveBeenCalledWith({ message: 'Rol eliminado' });
  });

  it('debería devolver 404 si el rol no existe', async () => {
    // Simulamos que el rol no se encontró y findOneAndDelete devuelve null.
    Rol.findOneAndDelete.mockResolvedValue(null);

    await RoleController.deleteRole(req, res);

    // El controlador debería responder con status 404 (no encontrado).
    expect(res.status).toHaveBeenCalledWith(404);

    // Y un mensaje indicando que no se encontró el rol.
    expect(res.json).toHaveBeenCalledWith({ message: 'Rol no encontrado' });
  });

  it('debería devolver 400 si el ID no es válido', async () => {
    req.params.id = 'abc'; // Cambiamos el id a un valor no numérico para probar la validación.

    await RoleController.deleteRole(req, res);

    // Debe responder con status 400 (mala petición).
    expect(res.status).toHaveBeenCalledWith(400);

    // Y con un mensaje indicando que el id no es válido.
    expect(res.json).toHaveBeenCalledWith({ message: 'El ID del rol debe ser un número válido' });
  });

  it('debería manejar errores del servidor', async () => {
    // Simulamos que findOneAndDelete lanza un error, para probar manejo de errores.
    Rol.findOneAndDelete.mockRejectedValue(new Error('DB error'));

    await RoleController.deleteRole(req, res);

    // Debe responder con status 500 (error interno).
    expect(res.status).toHaveBeenCalledWith(500);

    // Y con un mensaje de error que incluye el mensaje del error lanzado.
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar el rol', error: 'DB error' });
  });
});
