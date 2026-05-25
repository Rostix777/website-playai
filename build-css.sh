#!/bin/bash
# Concatenate all CSS @import files into a single bundle
# Run: bash build-css.sh

OUT="app/styles.bundle.css"
echo "/* Auto-generated CSS bundle — do not edit manually */" > "$OUT"
echo "/* Built: $(date -u +%Y-%m-%dT%H:%M:%SZ) */" >> "$OUT"
echo "" >> "$OUT"

# Read app/styles.css and resolve each @import
while IFS= read -r line; do
  if [[ "$line" =~ @import\ \'(.+)\' ]]; then
    FILE="app/${BASH_REMATCH[1]}"
    if [ -f "$FILE" ]; then
      echo "/* === $(basename "$FILE") === */" >> "$OUT"
      cat "$FILE" >> "$OUT"
      echo "" >> "$OUT"
    else
      echo "WARNING: $FILE not found" >&2
    fi
  fi
done < "app/styles.css"

echo "Done: $(wc -l < "$OUT") lines → $OUT"
