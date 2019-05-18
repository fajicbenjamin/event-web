<template>
    <v-menu offset-y>
        <template #activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>language</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-tile
                    v-for="(item, index) in languages"
                    :key="index"
                    @click="changeLanguage(item.value)"
            >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        data: () => ({
            languages: [
                { title: 'English', value: 'en' },
                { title: 'Bosanski', value: 'bs' }
            ]
        }),
        methods: {
            changeLanguage(language) {
                this.$i18n.locale = language
            }
        }
    }
</script>

<style scoped>

</style>
