'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { MeshPhongMaterial } from 'three'

const ACTIVE_ISO = new Set(['MEX', 'ARG', 'COL', 'ESP', 'SLV', 'CHL'])

const ARCS = [
  { startLat: 23.6, startLng: -102.5, endLat: -38.4, endLng: -63.6 },
  { startLat: 23.6, startLng: -102.5, endLat:   4.6, endLng: -74.1 },
  { startLat: 23.6, startLng: -102.5, endLat:  40.4, endLng:  -3.7 },
  { startLat: 23.6, startLng: -102.5, endLat:  13.7, endLng: -89.2 },
  { startLat: 23.6, startLng: -102.5, endLat: -33.4, endLng: -70.7 },
]

const MARKERS = [
  { lat: 23.6,  lng: -102.5, label: 'México',      size: 0.55 },
  { lat: -38.4, lng:  -63.6, label: 'Argentina',   size: 0.4 },
  { lat:   4.6, lng:  -74.1, label: 'Colombia',    size: 0.4 },
  { lat:  40.4, lng:   -3.7, label: 'España',      size: 0.4 },
  { lat:  13.7, lng:  -89.2, label: 'El Salvador', size: 0.4 },
  { lat: -33.4, lng:  -70.7, label: 'Chile',       size: 0.4 },
]

const GLOBE_MATERIAL = new MeshPhongMaterial({ color: '#0a1a24' })

export default function CoberturaGlobe() {
  const globeRef   = useRef<GlobeMethods | undefined>(undefined)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const [size, setSize]           = useState(650)
  const [countries, setCountries] = useState<object[]>([])

  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(r => r.json())
      .then(d => setCountries(d.features))
  }, [])

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return
      // Container is square (circular), so width equals height
      setSize(wrapRef.current.offsetWidth)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const onReady = useCallback(() => {
    const g = globeRef.current
    if (!g) return
    // Slightly more zoomed in than preview for more detail
    g.pointOfView({ lat: 8, lng: -55, altitude: 1.75 }, 0)
    const controls = g.controls()
    controls.autoRotate      = true
    controls.autoRotateSpeed = 0.28
    controls.enableZoom      = false
    controls.enablePan       = false
  }, [])

  return (
    <div ref={wrapRef} className="cob-globe-inner">
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#2b5a72"
        atmosphereAltitude={0.2}
        globeImageUrl=""
        globeMaterial={GLOBE_MATERIAL}
        onGlobeReady={onReady}
        polygonsData={countries}
        polygonCapColor={(d: object) => {
          const iso = (d as { properties: { ISO_A3: string } }).properties.ISO_A3
          return ACTIVE_ISO.has(iso) ? 'rgba(200,160,32,0.9)' : 'rgba(27,66,84,0.85)'
        }}
        polygonSideColor={() => 'rgba(10,26,36,0.6)'}
        polygonStrokeColor={() => 'rgba(43,90,114,0.3)'}
        polygonAltitude={(d: object) => {
          const iso = (d as { properties: { ISO_A3: string } }).properties.ISO_A3
          return ACTIVE_ISO.has(iso) ? 0.02 : 0.004
        }}
        polygonLabel={(d: object) => {
          const p = (d as { properties: { ADMIN: string; ISO_A3: string } }).properties
          if (!ACTIVE_ISO.has(p.ISO_A3)) return ''
          const info: Record<string, string> = {
            MEX: 'República Mexicana', ARG: 'Buenos Aires', COL: 'Bogotá',
            ESP: 'Madrid', SLV: 'San Salvador', CHL: 'Santiago',
          }
          return `<div style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:500;background:rgba(15,37,53,0.92);color:#fff;padding:6px 10px;border-radius:3px;border-left:2px solid #c8a020"><b>${p.ADMIN}</b><br/><span style="color:rgba(255,255,255,0.65);font-size:11px">${info[p.ISO_A3] ?? ''}</span></div>`
        }}
        pointsData={MARKERS}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => '#ffffff'}
        pointAltitude={0.02}
        pointRadius="size"
        arcsData={ARCS}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={() => '#c8a020'}
        arcDashLength={0.4}
        arcDashGap={0.15}
        arcDashAnimateTime={2800}
        arcStroke={0.5}
        arcAltitude={0.28}
      />
    </div>
  )
}
