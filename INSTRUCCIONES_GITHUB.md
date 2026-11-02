# 🚀 GUÍA PARA SUBIR "MT5 QUANT HUD PORTAL" A GITHUB

Sigue estos sencillos pasos para crear el nuevo repositorio en tu cuenta de GitHub y publicar el portal del HUD:

---

### Paso 1: Crear el Nuevo Repositorio en GitHub
1. Abre tu navegador y ve a: **[github.com/new](https://github.com/new)**.
2. En **Repository name**, ponle: `mt5-quant-hud-portal` (o el nombre que prefieras).
3. Selecciona **Public** o **Private**.
4. **Importante:** Deja **desmarcadas** las casillas de *"Add a README"*, *.gitignore* y *license* (porque ya están creados).
5. Haz clic en el botón verde **Create repository**.
6. Copia la URL del repositorio (ej. `https://github.com/TU_USUARIO/mt5-quant-hud-portal.git`).

---

### Paso 2: Ejecutar los Comandos en tu Terminal

Abre tu consola de PowerShell y ejecuta:

```powershell
# 1. Entrar a la carpeta del proyecto
cd "c:\Users\Hector Frias\.gemini\antigravity\scratch\Bots\Portal_MT5_HUD"

# 2. Inicializar el repositorio Git local
git init

# 3. Preparar todos los archivos
git add .

# 4. Crear el commit oficial
git commit -m "feat: Lanzamiento inicial MT5 Quant HUD Portal Multi-Cuenta"

# 5. Nombrar la rama a main
git branch -M main

# 6. Vincular con tu repositorio en GitHub (Reemplaza TU_URL por la copiada en el Paso 1)
git remote add origin https://github.com/TU_USUARIO/mt5-quant-hud-portal.git

# 7. Subir a GitHub
git push -u origin main
```

---

### Paso 3: Publicar el HUD Gratis con GitHub Pages
Si deseas tener el HUD disponible en cualquier navegador web desde tu celular o laptop:
1. En GitHub, ve a **Settings > Pages**.
2. En **Branch**, selecciona `main` y en la carpeta elige `/ (root)` o la carpeta `client`.
3. Haz clic en **Save**.
4. ¡Y tendrás tu enlace en vivo protegido con usuario y contraseña!
