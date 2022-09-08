import * as echarts from 'echarts/core'

import {
    BarChart,
    LineChart,
    PieChart,
    MapChart,
} from 'echarts/charts'

import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    PolarComponent,
    AriaComponent,
    ParallelComponent,
    LegendComponent,
    RadarComponent,
    ToolboxComponent,
    DataZoomComponent,
    VisualMapComponent,
    TimelineComponent,
    CalendarComponent,
    GraphicComponent,
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    PolarComponent,
    AriaComponent,
    ParallelComponent,
    BarChart,
    LineChart,
    PieChart,
    MapChart,
    SVGRenderer,
    RadarComponent,
    ToolboxComponent,
    DataZoomComponent,
    VisualMapComponent,
    TimelineComponent,
    CalendarComponent,
    GraphicComponent,
])

export default echarts
