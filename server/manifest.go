// This file is automatically generated. Do not modify it manually.

package main

import (
	"strings"

	"github.com/mattermost/mattermost-server/v5/model"
)

var manifest *model.Manifest

const manifestStr = `
{
  "id": "com.mattermost.badges",
  "name": "Badges for Mattermost",
  "description": "This plugin add badges support to Mattermost.",
  "homepage_url": "https://github.com/larkox/mattermost-plugin-badges",
  "support_url": "https://github.com/larkox/mattermost-plugin-badges/issues",
  "release_notes_url": "https://github.com/larkox/mattermost-plugin-badges/releases/tag/v0.1.2",
  "icon_path": "assets/starter-template-icon.svg",
  "version": "0.2.0",
  "min_server_version": "5.12.0",
  "server": {
    "executables": {
      "linux-amd64": "server/dist/plugin-linux-amd64",
      "darwin-amd64": "server/dist/plugin-darwin-amd64",
      "windows-amd64": "server/dist/plugin-windows-amd64.exe"
    },
    "executable": ""
  },
  "webapp": {
    "bundle_path": "webapp/dist/main.js"
  },
  "settings_schema": {
    "header": "",
    "footer": "",
    "settings": [
      {
        "key": "BadgesAdmin",
        "display_name": "Badges admin:",
        "type": "text",
        "help_text": "This user will be considered as an admin for the badges plugin. They can create types, and modify and grant any badge.",
        "placeholder": "",
        "default": null
      }
    ]
  }
}
`

func init() {
	manifest = model.ManifestFromJson(strings.NewReader(manifestStr))
}
