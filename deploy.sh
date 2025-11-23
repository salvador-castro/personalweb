#!/usr/bin/env bash
set -e

REPO_NAME="salvadorcastro.github.io"
TEMP_DIR="../${REPO_NAME}-deploy-tmp"

# 1. Verificar que estamos en develop
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "develop" ]; then
  echo "⚠️ Por seguridad, corré este script desde la rama 'develop'. Rama actual: $CURRENT_BRANCH"
  exit 1
fi

echo "✅ Rama actual: develop"

# 2. Build con static export (output: 'export' en next.config.mjs)
echo "🏗  Construyendo el proyecto (next build)..."

# limpiar por las dudas builds anteriores
rm -rf .next
rm -rf out

npm run build

# Después de next build, con output: 'export', se genera la carpeta out/
if [ ! -d "out" ]; then
  echo "❌ No se encontró la carpeta 'out'. Revisá que en next.config.mjs tengas: output: 'export'."
  exit 1
fi

echo "📁 Encontrada carpeta 'out/'. Preparando carpeta temporal de deploy: $TEMP_DIR"

# 3. Copiar el export a un directorio temporal fuera de Git
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"
cp -R out/* "$TEMP_DIR"

# 4. Cambiar a main y reemplazar contenido
echo "🔀 Cambiando a rama 'main'..."
git checkout main

echo "🧹 Limpiando contenido anterior de 'main'..."
rm -rf ./*

echo "📥 Copiando archivos exportados a 'main'..."
cp -R "$TEMP_DIR"/* .

# 5. Commit + push
echo "📝 Haciendo commit del deploy..."
git add .
COMMIT_MSG="Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" || echo "ℹ️ Nada nuevo para commitear."

echo "🚀 Haciendo push a 'main'..."
git push origin main

# 6. Volver a develop y limpiar temp
echo "↩️ Volviendo a 'develop'..."
git checkout develop

echo "🧽 Borrando carpeta temporal..."
rm -rf "$TEMP_DIR"

echo "✅ Deploy completo. La rama 'main' está actualizada con el export estático."
