#!/bin/bash

# Obtener la ruta absoluta del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navegar a la raíz de backend
BACKEND_ROOT="$SCRIPT_DIR/.."
cd "$BACKEND_ROOT" || {
    echo "Error: Cannot access to backend folder."
    exit 1
}

# Ejecutar lint
yarn run lint

if [ $? -eq 0 ]; then
    echo "Lint completed successfully. No errors were found."
    exit 0
else
    echo "Lint has detected errors. Check the previous messages."
    exit 1
fi

