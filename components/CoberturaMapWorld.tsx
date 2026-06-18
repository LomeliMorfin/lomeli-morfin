'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ISO 3166-1 numérico
const HIGHLIGHTED: Record<string, string> = {
  '484': '#1b4254',   // México
  '032': '#2b5a72',   // Argentina
  '170': '#2b5a72',   // Colombia
  '724': '#2b5a72',   // España
  '222': '#2b5a72',   // El Salvador
  '152': '#2b5a72',   // Chile
}

const COUNTRY_MARKERS: { id: string; label: string; coords: [number, number] }[] = [
  { id: 'mexico',      label: 'México',      coords: [-102.0, 23.5]  },
  { id: 'argentina',   label: 'Argentina',   coords: [-64.0,  -34.0] },
  { id: 'colombia',    label: 'Colombia',    coords: [-74.1,   4.7]  },
  { id: 'espana',      label: 'España',      coords: [-3.7,   40.4]  },
  { id: 'elsalvador',  label: 'El Salvador', coords: [-89.2,  13.7]  },
  { id: 'chile',       label: 'Chile',       coords: [-70.7, -33.4]  },
]

interface Props {
  hoveredId: string | null
  onHover: (id: string | null) => void
}

export default function CoberturaMapWorld({ hoveredId, onHover }: Props) {
  return (
    <ComposableMap
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 148 }}
      width={600}
      height={340}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: { id: string; rsmKey: string }[] }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={HIGHLIGHTED[geo.id] ?? '#1e3045'}
              stroke="#111e2b"
              strokeWidth={0.4}
              style={{
                default: { outline: 'none' },
                hover:   { outline: 'none' },
                pressed: { outline: 'none' },
              }}
            />
          ))
        }
      </Geographies>

      {COUNTRY_MARKERS.map(({ id, label, coords }) => (
        <Marker
          key={id}
          coordinates={coords}
          onMouseEnter={() => onHover(id)}
          onMouseLeave={() => onHover(null)}
        >
          {hoveredId === id && (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                x={-(label.length * 3.4)}
                y={-18}
                width={label.length * 6.8}
                height={12}
                rx={1.5}
                fill="#0f2535"
                opacity={0.93}
              />
              <text
                y={-10}
                textAnchor="middle"
                fontSize={5.5}
                fontWeight="500"
                fill="white"
                fontFamily="Montserrat, sans-serif"
                letterSpacing="0.04em"
              >
                {label}
              </text>
            </g>
          )}
          <circle r={4} fill="none" stroke="#c8a020" strokeWidth={0.7} className="marker-pulse" style={{ cursor: 'pointer' }} />
          <circle r={2} fill="#c8a020" style={{ cursor: 'pointer' }} />
        </Marker>
      ))}
    </ComposableMap>
  )
}
