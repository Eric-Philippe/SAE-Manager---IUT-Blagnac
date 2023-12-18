#!/bin/bash

pagesDir="./src/pages"

errorFound=0  # Variable pour suivre l'état d'erreur

# Utilise find pour rechercher tous les fichiers du dossier pages/ et ses sous-dossiers
files=$(find "$pagesDir" -type f)

for pageFile in $files; do
  echo "Checking $pageFile"

  # Vérifie la présence de "// Ignore test" dans le fichier
  if grep -q '// Ignore test' "$pageFile"; then
    echo "ℹ️ Skipping tests for $pageFile (contains '// Ignore test')"
    continue
  fi

  # Vérifie la présence de "BlankPage" au moins trois fois dans le fichier
  if [ "$(grep -o 'BlankPage' "$pageFile" | wc -l)" -ge 3 ]; then
    echo "✅ BlankPage structure found at least three times in $pageFile"
  else
    echo "❌ Error: BlankPage structure not found at least three times in $pageFile"
    errorFound=1  # Marque l'erreur
  fi

  # Ajoute d'autres vérifications au besoin en fonction de la structure réelle de BlankPage
done

# Si une erreur a été trouvée, renvoie un code d'erreur
if [ "$errorFound" -eq 1 ]; then
  exit 1
fi
