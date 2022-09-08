<template>
    <div class="sort-fields">
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns"
                        :key="`${col.prop}-colum`"
                        :style="{
                        width: col.width ? col.width : `${100/(columns?.length||1)}%`,
                        textAlign: col.align || 'center'}"
                        @click="handleClick(col)"
                        :class="{descending: col.sortType === 1, ascending:  col.sortType === 2}">
                        <div class="cell">
                            {{col.title}}
                            <span class="caret-wrapper">
                                <i class="sort-caret ascending"></i>
                                <i class="sort-caret descending"></i>
                            </span>
                        </div>
                    </th>
                    </tr>
            </thead>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'sort-fields',
    props: {
        columns: Array as PropType<ISortableColumn[]>,
    },
    emits: ['sort'],
    setup(props, ctx) {
        function handleClick(col: ISortableColumn) {
            const column = col
            props.columns?.forEach((n) => {
                if (n !== col) {
                    const temp = n
                    temp.sortType = 0
                }
            })
            column.sortType = (column.sortType + 1) % 3
            ctx.emit('sort', column)
        }
        return {
            handleClick,
        }
    },
})
</script>

<style lang="less" scoped>
.sort-fields {
    table {
        width: 100%;
    }
    th {
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;

        .cell {
            display: inline-block;
            box-sizing: border-box;
            position: relative;
            vertical-align: middle;
            width: 100%;

            .caret-wrapper {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                height: 36px;
                // width: 24px;
                vertical-align: middle;
                cursor: pointer;
                overflow: initial;
                position: relative;

                .ascending {
                    border-bottom-color: #c0c4cc;
                    top: 7px;
                }
                .descending {
                    border-top-color: #c0c4cc;
                    bottom: 7px;
                }
            }

            .sort-caret {
                width: 0;
                height: 0;
                border: 5px solid transparent;
                position: absolute;
                left: 1px;
            }
        }

        &.ascending {
            .cell {
                color: #409eff;
            }
             .ascending {
                border-bottom-color: #409eff !important;
            }
        }

        &.descending {
            .cell {
                color: #409eff;
            }
            .descending {
                border-top-color: #409eff !important;
            }
        }
    }
    // th.ascending {
    //     .ascending {
    //         border-bottom-color: #409eff !important;
    //     }
    // }
}
</style>
