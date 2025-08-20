# Project snapshot — Wed Aug 20 16:07:23 CDT 2025

## Git status
```
```

## File tree (excluding node_modules & .git)
```
.
index.html
tailwind.config.js
dist
dist/index.html
dist/vite.svg
dist/assets
dist/assets/index-CHJ0_jvD.js
dist/assets/index-DTxiLvok.css
project_snapshot.md
postcss.config.cjs
node_modules
vite.config.js
README.md
public
public/favicon.ico
public/vite.svg
.gitignore
package-lock.json
package.json
scripts
scripts/export_project_info.sh
.github
.github/workflows
.github/workflows/deploy.yml
eslint.config.js
.git
src
src/App.css
src/index.css
src/components
src/components/Mentorship.jsx
src/components/Footer.jsx
src/components/About.jsx
src/components/Donate.jsx
src/components/Join.jsx
src/components/Navbar.jsx
src/components/Hero.jsx
src/components/Contact.jsx
src/components/Events.jsx
src/main.jsx
src/App.jsx
src/assets
src/assets/react.svg
```

## package.json
```
{
  "name": "revive-uic",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@clerk/clerk-react": "^5.43.0",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.12",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@tailwindcss/postcss": "^4.1.12",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.12",
    "tailwindcss-theme": "^1.0.2",
    "vite": "^7.1.2"
  }
}
```

## package-lock.json
```
{
  "name": "revive-uic",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "revive-uic",
      "version": "0.0.0",
      "dependencies": {
        "@clerk/clerk-react": "^5.43.0",
        "date-fns": "^4.1.0",
        "framer-motion": "^12.23.12",
        "react": "^19.1.1",
        "react-dom": "^19.1.1",
        "react-router-dom": "^7.8.1"
      },
      "devDependencies": {
        "@eslint/js": "^9.33.0",
        "@tailwindcss/postcss": "^4.1.12",
        "@types/react": "^19.1.10",
        "@types/react-dom": "^19.1.7",
        "@vitejs/plugin-react": "^5.0.0",
        "autoprefixer": "^10.4.21",
        "eslint": "^9.33.0",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react-refresh": "^0.4.20",
        "globals": "^16.3.0",
        "postcss": "^8.5.6",
        "tailwindcss": "^4.1.12",
        "tailwindcss-theme": "^1.0.2",
        "vite": "^7.1.2"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.0.tgz",
      "integrity": "sha512-60X7qkglvrap8mn1lh2ebxXdZYtUcpd7gsmy9kLaBJ4i/WdY8PqTSdxyA8qraikqKQK5C1KRBKXqznrVapyNaw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.3.tgz",
      "integrity": "sha512-yDBHV9kQNcr2/sUr9jghVyz9C3Y5G2zUM2H2lo+9mKv4sFgbA8s8Z9t8D1jiTkGoO/NoIfKMyKWr4s6CN23ZwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "^2.2.0",
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.3",
        "@babel/parser": "^7.28.3",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.3",
        "@babel/types": "^7.28.2",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.3.tgz",
      "integrity": "sha512-3lSpxGgvnmZznmBkCRnVREPUFJv2wrv9iAoFDvADJc0ypmdOxdUtcLeBgBJ6zE0PMeTKnxeQzyk0xTBq4Ep7zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.3",
        "@babel/types": "^7.28.2",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.27.1.tgz",
      "integrity": "sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.3.tgz",
      "integrity": "sha512-PTNtvUQihsAsDHMOP5pfobP8C6CM4JWXmP8DrEIt46c3r2bf87Ua1zoqevsMo9g+tWDwgWrFP5EIxuBx5RudAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.3.tgz",
      "integrity": "sha512-7+Ey1mAgYqFAx2h0RuoxcQT5+MlG3GTV0TQrgr7/ZliKsm/MNDxVVutlWaziMq7wJNAz8MTqz55XLpWvva6StA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
      "integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/parser": "^7.27.2",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.3.tgz",
      "integrity": "sha512-7w4kZYHneL3A6NP2nxzHvT3HCZ7puDZZjFMqDpBPECub79sTtSO5CGXDkKrTQq8ksAwfD/XI2MRFX23njdDaIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.28.3",
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.2",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.28.2",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.2.tgz",
      "integrity": "sha512-ruv7Ae4J5dUYULmeXw1gmb7rYRz57OWCPM57pHojnLq/3Z1CK2lNSLTCVjxVk1F/TZHwOZZrOWi0ur95BbLxNQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@clerk/clerk-react": {
      "version": "5.43.0",
      "resolved": "https://registry.npmjs.org/@clerk/clerk-react/-/clerk-react-5.43.0.tgz",
      "integrity": "sha512-2U/PiNaz51mcGfZN9NcP8KfsFdD2DrZ7kt/98ijqjIi0Jl39FP+75q3gR9nX82Qg+JwveB3Tnkb3CvqobJNi1A==",
      "license": "MIT",
      "dependencies": {
        "@clerk/shared": "^3.21.2",
        "@clerk/types": "^4.80.0",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-0",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0"
      }
    },
    "node_modules/@clerk/shared": {
      "version": "3.21.2",
      "resolved": "https://registry.npmjs.org/@clerk/shared/-/shared-3.21.2.tgz",
      "integrity": "sha512-aA6t4Y6/kH1ZVMPIN0NeRulIGYDwB3otfql4Y+5MbnEgegdOlv43WO5iAheytR0fHBXnOt5+VN5QjPQHu2kU4A==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "@clerk/types": "^4.80.0",
        "dequal": "2.0.3",
        "glob-to-regexp": "0.4.1",
        "js-cookie": "3.0.5",
        "std-env": "^3.9.0",
        "swr": "2.3.4"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-0",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@clerk/types": {
      "version": "4.80.0",
      "resolved": "https://registry.npmjs.org/@clerk/types/-/types-4.80.0.tgz",
      "integrity": "sha512-WuvCNfxWY9hW+p/YR+cCx+Alg8ZHfmYir89pF67YG/wMv89ZKnJBWAgG4DM7oHpyNICcR1vxt1pXq6hRgtM4Nw==",
      "license": "MIT",
      "dependencies": {
        "csstype": "3.1.3"
      },
      "engines": {
```

## vite.config.js
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/revive-uic/', // <-- repo name
})
```

## README.md
```
# Revive at UIC Website

Dev: Vite + React + Tailwind v4

## Run
npm install
npm run dev

## Build
npm run build
```

## Dependencies (top-level from package.json)
```json
```

## Environment
```
```

