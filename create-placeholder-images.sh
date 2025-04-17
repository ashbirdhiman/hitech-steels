#!/bin/bash

echo "Creating placeholder images for development..."
mkdir -p src/assets/images

# Function to create a placeholder SVG
create_placeholder_svg() {
  local filename=$1
  local color=$2
  local text=$3
  local width=${4:-400}
  local height=${5:-300}
  
  echo "Creating placeholder for $filename..."
  cat > "src/assets/images/$filename.jpg" << EOF
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="$width" height="$height" xmlns="http://www.w3.org/2000/svg">
  <rect width="$width" height="$height" fill="$color"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">$text</text>
</svg>
EOF
}

# Create placeholder images
create_placeholder_svg "logo" "#1a3c6e" "LOGO" 200 200
create_placeholder_svg "banner" "#1a3c6e" "BANNER" 1920 1080
create_placeholder_svg "flat-bar" "#4a6c9e" "FLAT BAR"
create_placeholder_svg "square-bar" "#4a6c9e" "SQUARE BAR"
create_placeholder_svg "round-bar" "#4a6c9e" "ROUND BAR"
create_placeholder_svg "location" "#e25822" "LOCATION" 100 100
create_placeholder_svg "email" "#e25822" "EMAIL" 100 100
create_placeholder_svg "call" "#e25822" "CALL" 100 100
create_placeholder_svg "timings" "#e25822" "TIMINGS" 100 100
create_placeholder_svg "facebook" "#3b5998" "FB" 100 100
create_placeholder_svg "instagram" "#c13584" "IG" 100 100
create_placeholder_svg "banner4" "#1a3c6e" "GALLERY" 1200 600

echo "Placeholder images created successfully!"
