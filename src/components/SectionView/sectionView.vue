<template>
    <div class="stat-section">
        <div class="stat-section-header">
            <div class="head-tag-line"></div>
            <div class="title">{{ title }}</div>
            <div class="head-tool">
                <slot name="head-tool"></slot>
            </div>
        </div>
        <div class="stat-section-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'section-view',
        props: {
            title: String,
        },
    })
</script>

<style lang="less" scoped>
    .stat-section {
        background-color: #fff;

        .stat-section-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: 500;

            .title {
                flex-grow: 1;
                text-align: left;
            }

            .head-tag-line {
                height: 13px;
                background-color: @theme-color;
                width: 3px;
                margin-right: 10px;
            }

            .head-tool {
                color: @text-color-second;
                font-size: 14px;
            }
        }
    }
</style>
