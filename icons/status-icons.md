# Custom Status Icons

Here are the custom SVG icons for status indicators, formatted for Mintlify:

## Beta Icon (256x96px)

```svg
<svg width="256" height="96" viewBox="0 0 256 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="12" width="240" height="72" rx="36" fill="#3B82F6" stroke="#1E40AF" stroke-width="4"/>
  <text x="128" y="60" text-anchor="middle" font-size="48" font-weight="600" fill="white" font-family="Inter, sans-serif">BETA</text>
</svg>
```

## Alpha Icon (288x96px)

```svg
<svg width="288" height="96" viewBox="0 0 288 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="12" width="272" height="72" rx="36" fill="#F59E0B" stroke="#D97706" stroke-width="4"/>
  <text x="144" y="60" text-anchor="middle" font-size="48" font-weight="600" fill="white" font-family="Inter, sans-serif">ALPHA</text>
</svg>
```

## New Icon (224x96px)

```svg
<svg width="224" height="96" viewBox="0 0 224 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="12" width="208" height="72" rx="36" fill="#10B981" stroke="#059669" stroke-width="4"/>
  <text x="112" y="60" text-anchor="middle" font-size="48" font-weight="600" fill="white" font-family="Inter, sans-serif">NEW</text>
</svg>
```

## Usage in docs.json

```json
{
  "group": "Section Name",
  "icon": "/icons/beta.svg",
  "pages": [...]
}
```

**Available icons:**

- `/icons/beta.svg` - Blue BETA badge
- `/icons/alpha.svg` - Orange ALPHA badge
- `/icons/new.svg` - Green NEW badge

## Color Schemes

- **Beta**: Blue (#3B82F6 fill, #1E40AF border)
- **Alpha**: Orange (#F59E0B fill, #D97706 border)
- **New**: Green (#10B981 fill, #059669 border)

All icons use proper SVG format with Inter font family for consistency.
