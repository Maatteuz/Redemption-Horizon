import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"
import { STATUS } from '../../../constants/status'

export default function GraficoRadar({ dados }) {
  return (
    <section className="rounded-xl p-4 bg-(--surface)">
      <h3 className="text-lg font-semibold text-center mb-3">
        Visão Gráfica
      </h3>

      <div className="aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={dados}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid stroke="currentColor" strokeOpacity={0.2} />
            <PolarAngleAxis
              dataKey="atributo"
              tick={({ payload, x, y }) => {
                const stat = STATUS.find(s => s.label === payload.value)
                const Icon = stat?.icon

                if (!Icon) return null

                return (
                  <g transform={`translate(${x},${y})`}>
                    <foreignObject x={-18} y={-18} width={36} height={36}>
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Icon size={18} />
                        <span className="text-[10px] font-semibold">
                          {payload.value}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                )
              }}
            />
            <Radar
              name="Status"
              dataKey="valor"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}