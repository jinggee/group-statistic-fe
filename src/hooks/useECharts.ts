/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'

import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import {
    unref, nextTick, computed, ref,
} from 'vue'
import { useEventListener } from '@/hooks/event/useEventListener'

import echarts from '@/utils/echarts'

export function useECharts(elRef: Ref<HTMLDivElement>) {
    let chartInstance: echarts.ECharts | null = null
    const cacheOptions = ref<EChartsOption>({})
    let removeResizeFn = () => {}

    const resizeFn = useDebounceFn(resize, 200)

    const getOptions = computed((): EChartsOption => cacheOptions.value as EChartsOption)

    function initCharts() {
        const el = unref(elRef)
        if (!el || !unref(el)) {
            return
        }

        chartInstance = echarts.init(el)
        const { removeEvent } = useEventListener({
            el: window,
            name: 'resize',
            listener: resizeFn,
        })
        removeResizeFn = removeEvent
    }

    function setOptions(options: EChartsOption, clear = true) {
        cacheOptions.value = options
        if (unref(elRef)?.offsetHeight === 0) {
            useTimeoutFn(() => {
                setOptions(unref(getOptions))
            }, 30)
            return
        }
        nextTick(() => {
            useTimeoutFn(() => {
                if (!chartInstance) {
                    initCharts()

                    if (!chartInstance) return
                }
                clear && chartInstance?.clear()

                chartInstance?.setOption(unref(getOptions))
            }, 30)
        })
    }

    function resize() {
        chartInstance?.resize()
    }

    function clear() {
        chartInstance?.clear()
    }

    function getWidth() {
        return chartInstance?.getWidth() || 0
    }

    tryOnUnmounted(() => {
        if (!chartInstance) return
        removeResizeFn()
        chartInstance.dispose()
        chartInstance = null
    })

    return {
        setOptions,
        resize,
        clear,
        getWidth,
        echarts,
    }
}

export { echarts }

export default {
    useECharts,
}
