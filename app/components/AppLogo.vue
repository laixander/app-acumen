<script setup lang="ts">
interface Props {
    name: string
    color: string
    size?: 'lg' | 'base' //base is the default size
}
const props = withDefaults(defineProps<Props>(), {
    size: 'base'
})
</script>
<template>
    <div :class="[
        size === 'lg' ? 'size-20 flex items-center justify-center rounded-3xl ring-8 shadow-xl' : 'size-9 flex items-center justify-center rounded-xl shadow-lg',
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black before:mix-blend-overlay',
        `ring-${color}-500/50`,
        `shadow-${color}-500/50`,
        `bg-${color}-500`
    ]">
        <UIcon 
            :name="name" 
            :class="[
                'flex shrink-0 text-white', 
                size === 'lg' ? 'size-10' : 'size-5'
            ]" 
        />
    </div>
</template>