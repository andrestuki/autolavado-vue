// utilities/userManager.js
// Utilidades para gestionar usuarios en localStorage

export const userManager = {
  // Obtener todos los usuarios
  getAllUsers() {
    try {
      const usuariosJSON = localStorage.getItem("usuarios");
      return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },

  // Obtener usuario por nombre de usuario
  getUserByUsername(username) {
    const usuarios = this.getAllUsers();
    return usuarios.find(u => u.usuario === username);
  },

  // Obtener usuario por email
  getUserByEmail(email) {
    const usuarios = this.getAllUsers();
    return usuarios.find(u => u.email === email);
  },

  // Obtener usuario por ID
  getUserById(idUsuario) {
    const usuarios = this.getAllUsers();
    return usuarios.find(u => u.idUsuario === idUsuario);
  },

  // Verificar si un usuario existe
  userExists(username) {
    return !!this.getUserByUsername(username);
  },

  // Verificar si un email existe
  emailExists(email) {
    return !!this.getUserByEmail(email);
  },

  // Crear nuevo usuario
  createUser(userData) {
    try {
      const usuarios = this.getAllUsers();
      
      // Validar que no exista el usuario
      if (this.userExists(userData.usuario)) {
        return { success: false, message: "El usuario ya existe" };
      }

      // Validar que no exista el email
      if (this.emailExists(userData.email)) {
        return { success: false, message: "El email ya está registrado" };
      }

      // Generar ID único
      const idUsuario = usuarios.length > 0 
        ? Math.max(...usuarios.map(u => u.idUsuario)) + 1 
        : 1;

      // Crear usuario
      const nuevoUsuario = {
        idUsuario,
        idPerfil: userData.idPerfil || 1,
        usuario: userData.usuario,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName || "",
        fechaRegistro: new Date().toISOString(),
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      return { success: true, usuario: nuevoUsuario };
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return { success: false, message: "Error al crear usuario" };
    }
  },

  // Actualizar usuario
  updateUser(idUsuario, userData) {
    try {
      const usuarios = this.getAllUsers();
      const index = usuarios.findIndex(u => u.idUsuario === idUsuario);

      if (index === -1) {
        return { success: false, message: "Usuario no encontrado" };
      }

      usuarios[index] = { ...usuarios[index], ...userData };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      return { success: true, usuario: usuarios[index] };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return { success: false, message: "Error al actualizar usuario" };
    }
  },

  // Eliminar usuario
  deleteUser(idUsuario) {
    try {
      const usuarios = this.getAllUsers();
      const filtered = usuarios.filter(u => u.idUsuario !== idUsuario);

      if (filtered.length === usuarios.length) {
        return { success: false, message: "Usuario no encontrado" };
      }

      localStorage.setItem("usuarios", JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return { success: false, message: "Error al eliminar usuario" };
    }
  },

  // Validar credenciales
  validateCredentials(username, password) {
    const usuario = this.getUserByUsername(username);
    if (!usuario) return false;
    return usuario.password === password;
  },

  // Limpiar todos los usuarios (usar con cuidado)
  clearAllUsers() {
    localStorage.removeItem("usuarios");
    return { success: true, message: "Todos los usuarios fueron eliminados" };
  },

  // Datos de ejemplo para testing
  loadSampleUsers() {
    const sampleUsers = [
      {
        idUsuario: 1,
        idPerfil: 1,
        usuario: "admin",
        email: "admin@example.com",
        password: "admin123",
        fullName: "Administrador",
        fechaRegistro: new Date().toISOString(),
      },
      {
        idUsuario: 2,
        idPerfil: 1,
        usuario: "user1",
        email: "user1@example.com",
        password: "user123",
        fullName: "Usuario Uno",
        fechaRegistro: new Date().toISOString(),
      },
      {
        idUsuario: 3,
        idPerfil: 1,
        usuario: "test",
        email: "test@example.com",
        password: "test123",
        fullName: "Usuario Test",
        fechaRegistro: new Date().toISOString(),
      },
    ];

    localStorage.setItem("usuarios", JSON.stringify(sampleUsers));
    return { success: true, message: "Usuarios de ejemplo cargados" };
  },

  // Exportar usuarios a JSON
  exportToJSON() {
    const usuarios = this.getAllUsers();
    const dataStr = JSON.stringify(usuarios, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `usuarios-backup-${new Date().getTime()}.json`;
    link.click();
  },

  // Importar usuarios desde JSON
  importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const usuarios = JSON.parse(e.target.result);
          if (!Array.isArray(usuarios)) {
            reject("El archivo debe contener un array de usuarios");
          }
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          resolve({ success: true, count: usuarios.length });
        } catch (error) {
          reject("Error al parsear JSON: " + error.message);
        }
      };
      reader.onerror = () => reject("Error al leer el archivo");
      reader.readAsText(file);
    });
  },
};

export default userManager;
