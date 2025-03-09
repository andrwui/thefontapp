#!/bin/bash
APP_NAME="thefontapp"
APP_DISPLAY_NAME="thefontapp"
APP_DESCRIPTION="The opensource, modern, font manager."
APP_ICON_NAME="thefontapp"
APP_ICON_SRC="./icon/icon.png"
APP_CATEGORIES="Fonts;Design"
BIN_DIR="/usr/local/bin"
DESKTOP_FILE_DIR="/usr/share/applications"
ICON_DIR="/usr/share/icons/hicolor/512x512/apps"

if [ ! -w "$BIN_DIR" ] || [ ! -w "$DESKTOP_FILE_DIR" ] || [ ! -w "$ICON_DIR" ]; then
    echo "This script needs write permissions for $BIN_DIR, $DESKTOP_FILE_DIR, and $ICON_DIR"
    echo "Please run with sudo: sudo $0"
    exit 1
fi

echo "Building $APP_NAME with wails..."
wails build -clean

if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

BUILD_OUTPUT="./build/bin/$APP_NAME"

if [ ! -f "$BUILD_OUTPUT" ]; then
    echo "Built file not found at $BUILD_OUTPUT"
    exit 1
fi

chmod +x "$BUILD_OUTPUT"

echo "Installing binary to $BIN_DIR/$APP_NAME"
cp -f "$BUILD_OUTPUT" "$BIN_DIR/$APP_NAME"

echo "Installing icon to $ICON_DIR/$APP_ICON_NAME.png"
if [ -f "$APP_ICON_SRC" ]; then
    mkdir -p "$ICON_DIR"
    cp -f "$APP_ICON_SRC" "$ICON_DIR/$APP_ICON_NAME.png"
else
    echo "Warning: Icon file not found at $APP_ICON_SRC"
fi

echo "Creating .desktop file in $DESKTOP_FILE_DIR/$APP_NAME.desktop"
cat > "$DESKTOP_FILE_DIR/$APP_NAME.desktop" << EOF
[Desktop Entry]
Type=Application
Name=$APP_DISPLAY_NAME
Comment=$APP_DESCRIPTION
Exec=$BIN_DIR/$APP_NAME
Icon=$APP_ICON_NAME
Terminal=false
Categories=$APP_CATEGORIES
EOF

if command -v gtk-update-icon-cache &> /dev/null; then
    echo "Updating icon cache..."
    gtk-update-icon-cache -f -t /usr/share/icons/hicolor
fi

echo "Installation complete!"
echo "Application installed to: $BIN_DIR/$APP_NAME"
echo "Icon installed to: $ICON_DIR/$APP_ICON_NAME.png"
echo "Desktop file created at: $DESKTOP_FILE_DIR/$APP_NAME.desktop"
