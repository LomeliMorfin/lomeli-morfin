'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = '/mx-states.json'

// state_code de los 30 estados con presencia (INEGI) — todos excepto
// Campeche (4) y Tlaxcala (29)
const ACTIVE_CODES = new Set([
  1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32,
])

const MARKERS: { id: string; label: string; coords: [number, number] }[] = [
  { id: 'baja',         label: 'Baja California',  coords: [-116.8, 31.9] },
  { id: 'monterrey',    label: 'Monterrey',         coords: [-100.3, 25.7] },
  { id: 'jalisco',      label: 'Guadalajara',       coords: [-103.3, 20.7] },
  { id: 'nayarit',      label: 'Nayarit',           coords: [-104.9, 21.5] },
  { id: 'colima',       label: 'Colima',            coords: [-103.7, 19.2] },
  { id: 'michoacan',    label: 'Michoacán',         coords: [-101.2, 19.7] },
  { id: 'edomex',       label: 'Estado de México',  coords: [-99.7,  19.3] },
  { id: 'cdmx',         label: 'CDMX',              coords: [-99.1,  19.4] },
  { id: 'morelos',      label: 'Morelos',           coords: [-99.2,  18.9] },
  { id: 'puebla',       label: 'Puebla',            coords: [-98.2,  19.0] },
  { id: 'veracruz',     label: 'Veracruz',          coords: [-96.1,  19.2] },
  { id: 'villahermosa', label: 'Villahermosa',      coords: [-92.9,  18.0] },
  { id: 'chiapas',      label: 'Chiapas',           coords: [-93.1,  16.8] },
  { id: 'merida',       label: 'Mérida',            coords: [-89.6,  21.0] },
]

interface Props {
  hoveredId: string | null
  onHover: (id: string | null) => void
}

export default function CoberturaMapMx({ hoveredId, onHover }: Props) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [-102, 24], scale: 1020 }}
      width={620}
      height={440}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: { rsmKey: string; properties: Record<string, unknown> }[] }) =>
          geographies.map(geo => {
            const isActive = ACTIVE_CODES.has(geo.properties?.state_code as number)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isActive ? '#1b4254' : '#cfd4d8'}
                stroke="#ffffff"
                strokeWidth={0.6}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none', fill: isActive ? '#2b5a72' : '#bfc4c8' },
                  pressed: { outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>

      {MARKERS.map(({ id, label, coords }) => (
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
                y={-20}
                width={label.length * 6.8}
                height={13}
                rx={1.5}
                fill="#0f2535"
                opacity={0.93}
              />
              <text
                y={-11}
                textAnchor="middle"
                fontSize={6}
                fontWeight="500"
                fill="white"
                fontFamily="Montserrat, sans-serif"
                letterSpacing="0.04em"
              >
                {label}
              </text>
            </g>
          )}
          <circle r={5} fill="none" stroke="#c8a020" strokeWidth={0.8} className="marker-pulse" style={{ cursor: 'pointer' }} />
          <circle r={2.5} fill="#c8a020" style={{ cursor: 'pointer' }} />
        </Marker>
      ))}
    </ComposableMap>
  )
}
